/**** Custom JS Classes *****/
asg.HTMLComponent = class {
	constructor(objArgs) {
        this._args - objArgs;
		this.init(objArgs);
		this.build();
		this._self = this;
		if (this.post_init) {
			this.post_init();
		}
	}

	init(objArgs) {
		for (var argName in objArgs) {
			var strKey = argName;
			var strIntKey = '_' + strKey;
			this[strIntKey] = objArgs[argName];
		}
		this._template = this.template();
		if (this.styles) {
			this._styles = this.styles();
		}
	}

	compile() {
		var arrArgs = this.templateArgs();
		return asg.util.strReplace(this._template, arrArgs);
	}

	template() {
		return '';
	}

	templateArgs() {
		return [];
	}

	build() {
		this.setStyles();
		this._target.innerHTML = '';
		this._view = asg.util.createFromFragment(this.compile());
		this._target.appendChild(this._view);
	}

	setStyles() {
		if (this._styles) {
			let _styleId = this._id + '_styles';
			var styleBlock = document.getElementById(_styleId);
			if (styleBlock == null) {
				styleBlock = asg.util.createFromFragment(asg.util.strReplace('<style id="%1%">%2%</style>', [_styleId, this._styles]));
				document.head.appendChild(styleBlock);
			}
		}
	}

	ui() {
		return this._view;
	}

	post_init() {
		var _this = this;
		var initFN = function () {
			_this.on_init();
			if (_this._on_init) {
				_this._on_init();
			}
		}
		initFN.apply(_this);
	}

	on_init() {

	}

}

asg.h2 = class extends asg.HTMLComponent {
	template() {
		return '<h2>%1%</h2>';
	}


	templateArgs() {
		return [
            this._label
        ];
	}
}

asg.baseClass = class extends asg.HTMLComponent {
	/** Options
		{
			id: 'string',
			target: HTMLElement,
			
		}
		**/
	on_init() {
		var _view = this.ui();
	}

	template() {
		return [
            '<div class="asg-component" id="%1%">',
			'<h2>Base Component Class</h2>',
            '</div>'].join('');
	}

	styles() {
		return [
            '.asg-component {display:block;width:400px;height:300px;background:#DDD;border:5px dashed green;}',
			'.asg-component h2 {color: green; font-size:2em;}'].join('');
	}

	templateArgs() {
		return [this._id];
	}
}

asg.DatePicker = class extends asg.HTMLComponent {
	/** Options
	{
		id: 'string',
		target: HTMLElement,
		value: Date || null,
		onvaluechange: function,
		disabled: true || false
	}
	**/

	set disabled(boolDisabled) {
		if (boolDisabled != false) {
			this._disabled = true;
		} else {
			this._disabled = false;
		}


		if (this._disabled) {
			this._view.setAttribute('class', 'asg-date-picker disabled');
			this._view.firstElementChild.removeAttribute('title');
		} else {
			this._view.setAttribute('class', 'asg-date-picker');
			this._view.firstElementChild.setAttribute('title', 'Click to open calendar');
		}
	}

	get disabled() {
		if (this._disabled != null) {
			return this._disabled;
		} else {
			return false;
		}
	}

	drawCalendar() {
		var _view = this.ui();
		let _cal = _view.lastElementChild;
		let _c = _cal.lastElementChild;
		_c.innerHTML = '';
		this._calendarContainer = _c;
	}

	drawCalendarControls() {
		var _view = this.ui();
		let _cal = _view.lastElementChild;
		let _c = _cal.firstElementChild;
		_c.innerHTML = '';
		_c.appendChild(asg.util.createFromFragment(this._frags.controls));

		var _yearBackButton = _c.firstElementChild.firstElementChild;
		_yearBackButton.addEventListener('click', this.moveYearBack.bind(this));

		var _monthBackButton = _yearBackButton.nextElementSibling;
		_monthBackButton.addEventListener('click', this.moveMonthBack.bind(this));

		this._textDisplay = _monthBackButton.nextElementSibling;

		var _monthForwardButton = this._textDisplay.nextElementSibling;
		_monthForwardButton.addEventListener('click', this.moveMonthForward.bind(this));

		var _yearForwardButton = _monthForwardButton.nextElementSibling;
		_yearForwardButton.addEventListener('click', this.moveYearForward.bind(this));
	}

	fragments() {
		let _dt = asg.util.dt;

		var _dayArr = [];
		for (let i = 0; i < _dt.days.length; i++) {
			_dayArr.push(_dt.days[i].a);
		}

		return {
			controls: [
				'<div class="asg-cal-controls">',
				'<div class="asg-cal-btn asg-year-back">',
				'<i class="fas fa-angle-double-left"></i>',
				'</div>',
				'<div class="asg-cal-btn asg-month-back">',
				'<i class="fas fa-angle-left"></i>',
				'</div>',
				'<div class="asg-cal-month-disp">',
				'Wednesday May 10th 2018',
				'</div>',
				'<div class="asg-cal-btn asg-year-forward">',
				'<i class="fas fa-angle-right"></i>',
				'</div>',
				'<div class="asg-cal-btn asg-month-forward">',
				'<i class="fas fa-angle-double-right"></i>',
				'</div>',
				'</div>'
			].join(''),

			cal_table: [
				'<table class="asg-cal-main">',
				'<thead>',
				'<tr><th>' + _dayArr.join('</th><th>') + '</th></tr>',
				'</thead>',
				'<tbody>',
				'</tbody>',
				'</table>'
			].join(''),
		}
	}

	handleDateCellClick(evt) {
		evt.cancelBubble = true;
		var target = evt.target;
		var strDate = target.getAttribute('data-date-string');
		var newDate = new Date(strDate);
		this.value = newDate;
		this.updateDisplay();
		this.hideCalendar();
		if (this._onvaluechange) {
			this._onvaluechange(this);
		}
	}

	hideCalendar() {
		var _view = this.ui();
		let _cal = _view.lastElementChild;

		document.body.removeEventListener('click', this._hideFunction);
		_cal.setAttribute('style', 'display: none;');
	}

	moveMonthBack(evt) {
		evt.cancelBubble = true;
		this._currentDate.setMonth(this._currentDate.getMonth() - 1);
		this.redraw();
	}

	moveMonthForward(evt) {
		evt.cancelBubble = true;
		this._currentDate.setMonth(this._currentDate.getMonth() + 1);
		this.redraw();
	}

	moveYearBack(evt) {
		evt.cancelBubble = true;
		this._currentDate.setYear(this._currentDate.getFullYear() - 1);
		this.redraw();
	}

	moveYearForward(evt) {
		evt.cancelBubble = true;
		this._currentDate.setYear(this._currentDate.getFullYear() + 1);
		this.redraw();
	}

	on_init() {
		var _view = this.ui();
		var _body = _view.firstElementChild;
		let _dt = asg.util.dt;

		this._showFunction = this.showCalendar.bind(this);
		this._hideFunction = this.hideCalendar.bind(this);

		this._frags = this.fragments();

		_body.addEventListener('click', this._showFunction);

		if (this._value == null) {
			this._currentDate = _dt.now();
		} else {
			this._currentDate = new Date(this._value);
		}

		this.updateDisplay();
		if (this._disabled != null) {
			this.disabled = this._disabled;
		}
	}

	redraw() {
		let _dt = asg.util.dt;
		let _u = asg.util;
		let _c = this._calendarContainer;
		_c.innerHTML = '';
		let _d = new Date(this._currentDate);
		let _startDate = new Date(_d);
		let _isLeap = _dt.isLeapYear(_startDate.getYear());

		_startDate.setDate(1);

		let _offsetPadStart = _startDate.getDay();
		if (_offsetPadStart == 0) {
			_offsetPadStart = 7;
		}

		let _intMonth = _startDate.getMonth();
		let _month = _dt.getMonth(_intMonth);
		let _table = _u.createFromFragment(this._frags.cal_table);
		let _tbod = _table.lastElementChild;

		var _row = document.createElement('tr');

		for (var i = 1; i < _offsetPadStart; i++) {
			var _cell = document.createElement('td');
			_cell.setAttribute('class', 'cal-pad-cell');
			_row.appendChild(_cell);
		}

		while (_startDate.getMonth() == _intMonth) {


			var _cell = document.createElement('td');
			if (_startDate.getDay() == 6 || _startDate.getDay() == 0) {
				_cell.setAttribute('class', 'cal-sat-sun');
			}
			if (this._originalDate.getDate() == _startDate.getDate() &&
				this._originalDate.getMonth() == _startDate.getMonth() &&
				this._originalDate.getFullYear() == _startDate.getFullYear()) {
				_cell.setAttribute('class', 'cal-curr-cell');
			}
			_cell.setAttribute('data-date-string', _startDate.toUTCString());
			_cell.addEventListener('click', this.handleDateCellClick.bind(this));
			_cell.innerHTML = _startDate.getDate();
			_row.appendChild(_cell);

			if (_startDate.getDay() % 7 == 0) {
				_tbod.appendChild(_row);
				var _row = document.createElement('tr');
			}

			_startDate.setDate(_startDate.getDate() + 1);
		}

		var _endPad = 7 - _row.children.length;
		for (var i = 1; i <= _endPad; i++) {
			var _cell = document.createElement('td');
			_cell.setAttribute('class', 'cal-pad-cell');
			_row.appendChild(_cell);
		}
		_tbod.appendChild(_row);

		_c.appendChild(_table);

		this.updateCalendarText(this._currentDate);
	}

	styles() {
		return [
            '.asg-date-picker {display:inline-block; height: 36px; padding: 0.25em; background: #fff;border: 1px solid #006f66;border-radius:5px;}',
            '.asg-date-picker.disabled {background: #f3f3f3; border-color: #999999;}',
			'.asg-date-picker .asg-date-picker-body {display: inline-block;cursor:pointer;}',
			'.asg-date-picker.disabled .asg-date-picker-body {cursor:default;}',
			'.asg-date-picker .asg-date-display {display: inline-block; color: #006f66; text-align: center;}',
			'.asg-date-picker.disabled .asg-date-display {color: #999999; font-style: italic;}',
			'.asg-date-picker .asg-date-button {display: inline-block; margin:0; padding:0; padding-left:5px; padding-right:5px; border: 1px solid #006f66;border-radius:5px;color: #006f66;}',
			'.asg-date-picker.disabled .asg-date-button, .asg-date-picker.disabled .asg-date-button:hover {border-color:#999999;background: #f3f3f3;color: #999999;}',
			'.asg-date-picker .asg-date-button:hover {background: #7fb7b2; color: #fff;}',
			'.asg-date-picker .asg-date-calendar {display: none; position:absolute; z-index: 9000; width: 330px; height: 250px;border: 2px solid #006f66; border-radius: 10px; background: #fff; -webkit-box-shadow: 10px 10px 5px 0px rgba(0,111,102,0.35);-moz-box-shadow: 10px 10px 5px 0px rgba(0,111,102,0.35);box-shadow: 10px 10px 5px 0px rgba(0,111,102,0.35);}',
			'.asg-date-picker .asg-cal-head {height: 30px;border-bottom: 2px outset #bfdbd9; border-top-left-radius: 10px;border-top-right-radius: 10px; background: #bfdbd9; }',
			'.asg-date-picker .asg-cal-controls {display: block; width: 100%;font-weight: bold; color: #00534c; font-size: 0.9em; }',
			'.asg-date-picker .asg-cal-btn {cursor:pointer;height: 24px; margin-top:3px;line-height: 21px; display: inline-block; width: 45px; text-align: center;}',
			'.asg-date-picker .asg-cal-btn:hover {background:#7fb7b2;color:#003733;border-radius: 10px;}',
			'.asg-date-picker .asg-cal-month-disp {font-size: 0.8em; display: inline-block; width: 142px; text-align: center;}',
			'.asg-date-picker .asg-year-back, .asg-date-picker .asg-month-back {margin-left:1px;}',
			'.asg-date-picker .asg-year-forward, .asg-date-picker .asg-month-forward {margin-right:1px;}',
			'.asg-date-picker .asg-cal-main {width: 280px; border: 1px solid #006f66;margin-top: 5px; margin-left: auto; margin-right: auto;}',
			'.asg-date-picker .asg-cal-main tr:nth-child(even) {background: #f9f9f9;}',
			'.asg-date-picker .asg-cal-main th {width: 40px; height: 20px; border-right: 1px solid #006f66;border-bottom: 1px solid #006f66; text-align: center; background: #d0d0d0; font-weight: bold; color: #00534c; font-size: 0.75em;}',
			'.asg-date-picker .asg-cal-main td {cursor:pointer;width: 40px; height: 30px; border-right: 1px solid #40938c; text-align: center; color: #00534c;}',
			'.asg-date-picker .asg-cal-main td.cal-sat-sun {background:#f5f5f5;}',
			'.asg-date-picker .asg-cal-main td:hover, .asg-date-picker .asg-cal-main td.cal-sat-sun:hover {background:#bfdbd9;}',
			'.asg-date-picker .asg-cal-main td:last-child {border-right: 1px solid #006f66;}',
			'.asg-date-picker .asg-cal-main td.cal-pad-cell, .asg-date-picker .asg-cal-main td.cal-pad-cell:hover {cursor:default;background: #e0e0e0;}',
			'.asg-date-picker .asg-cal-main td.cal-curr-cell, .asg-date-picker .asg-cal-main td.cal-curr-cell:hover {background: #006f66; color:#fff;}',

		].join('');
	}

	showCalendar(evt) {
		var _view = this.ui();
		let _cal = _view.lastElementChild;

		evt.cancelBubble = true;
		if (!this.disabled) {
			this._originalDate = new Date(this._currentDate);

			this.drawCalendarControls();
			this.drawCalendar();
			this.redraw();

			document.body.addEventListener('click', this._hideFunction);
			_cal.setAttribute('style', 'display: block;');
		}
	}

	template() {
		return [
            '<div class="asg-date-picker" id="%1%">',
			'  <div class="asg-date-picker-body"  title="Click to open calendar">',
			'    <div class="asg-date-display"></div>',
			'    <div class="asg-date-button">',
			'      <i class="fas fa-calendar-alt"></i>',
			'    </div>',
			'  </div>',
			'  <div class="asg-date-calendar">',
			'    <div class="asg-cal-head"></div>',
			'    <div class="asg-cal-body"></div>',
			'  </div',
            '</div>'].join('');
	}

	templateArgs() {
		return [
            this._id
        ];
	}

	updateCalendarText(objDate) {
		let _t = this._textDisplay;
		let _dt = asg.util.dt;
		var _month = _dt.getMonth(objDate.getMonth());

		var _year = objDate.getFullYear();
		_t.innerHTML = _month.name + ' ' + _year;
	}

	updateDisplay() {
		var _view = this.ui();
		var _body = _view.firstElementChild;
		var _disp = _body.firstElementChild;
		if (this.value == null) {
			if (this.disabled) {
				_disp.innerHTML = '';
			} else {
				_disp.innerHTML = 'Click to select...';
			}
		} else {
			_disp.innerHTML = this.value.toLocaleDateString();
		}
	}

	set value(objDate) {
		this._value = objDate;
	}

	get value() {
		return this._value;
	}
}

asg.ViewComponent = class extends asg.HTMLComponent {

	applyDefaultSort() {
		var _view = this;
		var _cols = _view._columns;
		for (var i = 0; i < _cols.length; i++) {
			_cols[i].sortMode = 'default';
		}
		_view.reSort = false;
	}

	collapseAll() {
		var _view = this.ui();
		var tbody = _view.lastElementChild.firstElementChild.nextElementSibling;
		var rows = tbody.getElementsByTagName('tr');
		for (var i = 0; i < rows.length; i++) {
			var objRow = rows[i];
			var objCell = objRow.firstElementChild;
			var strClass = objCell.getAttribute('class') || '';
			var isGroup = (strClass.indexOf('group_head') >= 0);
			if (isGroup) {
				var isExpanded = true;
				this._toggleRow(objRow, isExpanded);
			}
		}
	}

	doColumnSort(_index) {
		_index = _index || 0;
		var _colIndex = _index;
		var _view = this;

		if (_view._selectable) {
			// Decrement to account for checkbox column
			_colIndex = _colIndex - 1;
		}

		var _data = _view._row_data;
		var _col = _view._columns[_colIndex];
		var _src = _col.source;
		var _target = this._thead.lastChild.children[_index].lastElementChild;
		var _sortMode = _target.getAttribute('class');
		_view.applyDefaultSort();

		switch (_sortMode) {
			case "fas fa-sort":
				{
					_target.setAttribute('class', "fas fa-sort-down");
					_col.sortMode = "down";
					_view.reSort = true;
					_view._row_data = _data.sort(function (a, b) {
						let srcPath = _src;
						let arrSrc = srcPath.split('/');
						let valA = _view.getValueByAccessor(arrSrc, a);
						let valB = _view.getValueByAccessor(arrSrc, b);
						if (valA > valB) {
							return 1;
						}
						if (valA < valB) {
							return -1;
						}
						return 0;
					});
					break;
				}
			case "fas fa-sort-down":
				{
					_target.setAttribute('class', "fas fa-sort-up");
					_col.sortMode = "up";
					_view.reSort = true;
					_view._row_data = _data.sort(function (a, b) {
						let srcPath = _src;
						let arrSrc = srcPath.split('/');
						let valA = _view.getValueByAccessor(arrSrc, a);
						let valB = _view.getValueByAccessor(arrSrc, b);
						if (valA > valB) {
							return -1;
						}
						if (valA < valB) {
							return 1;
						}
						return 0;
					});

					break;
				}
			case "fas fa-sort-up":
				{
					_target.setAttribute('class', "fas fa-sort");
					_col.sortMode = "default";
					_view.applyDefaultSort();
					break;
				}
		}
		this.redraw();
	}

	evaluateButtonStates() {
		var allButtons = this._tfoot.getElementsByTagName("button");
		for (var i = 0; i < allButtons.length; i++) {
			var objButton = this._buttons[i];
			var currButton = allButtons[i];
			if (objButton.requires_selection) {
				if (this.hasSelection()) {
					currButton.disabled = false;
					asg.u.removeClass(currButton, 'is-disabled');
				} else {
					currButton.disabled = true;
					asg.u.addClass(currButton, 'is-disabled');
				}
			}
		}
	}

	expandAll() {
		var _view = this.ui();
		var tbody = _view.lastElementChild.firstElementChild.nextElementSibling;
		var rows = tbody.getElementsByTagName('tr');
		for (var i = 0; i < rows.length; i++) {
			var objRow = rows[i];
			var objCell = objRow.firstElementChild;
			var strClass = objCell.getAttribute('class') || '';
			var isGroup = (strClass.indexOf('group_head') >= 0);
			if (isGroup) {
				var isExpanded = false;
				this._toggleRow(objRow, isExpanded);
			}
		}
	}

	formatBodyData(objColumnData, objBodyData) {
		var viewData = [];
		var hasGroups = false;
		for (var i = 0; i < objColumnData.length; i++) {
			var currCol = objColumnData[i];
			if (currCol.grouped) {
				hasGroups = true;
				var objViewGroup = {
					id: ('col_' + i),
					position: i,
					source: currCol.source,
					clumps: []
				}

				objViewGroup.clumps = this.generateClumps(objViewGroup.source, objBodyData);
				if (currCol.sorted && (this.reSort == null || this.reSort == false)) {
					objViewGroup.clumps = this.sortClumps(objViewGroup.clumps, currCol.sortkey || 'alpha', currCol.sortdir || 'asc');
				}

				viewData.push(objViewGroup);
			}
		}

		if (!hasGroups) {

			for (var i = objColumnData.length - 1; i >= 0; i--) {
				var currCol = objColumnData[i];
				if (currCol.sorted && (this.reSort == null || this.reSort == false)) {
					viewData = this.sortRows(objBodyData, currCol.sortkey, currCol.sortdir, i);
				} else {
					viewData = objBodyData;
				}
			}
		}

		return viewData;

	}

	generateClumps(strAccessor, objData) {
		var clumps = [];
		var arrAccessorParts = strAccessor.split('/');

		var strUsedIds = '';

		for (var i = 0; i < objData.length; i++) {
			var currRow = objData[i];
			var strMatchValue = this.getValueByAccessor(arrAccessorParts, currRow);
			if (strUsedIds.indexOf(strMatchValue) < 0) {

				var dataRows = this.getClumpRows(arrAccessorParts, strMatchValue, objData);

				var clump = {
					match_value: strMatchValue,
					rows: dataRows
				}
				clumps.push(clump);
				strUsedIds += strMatchValue;
			}
		}
		return clumps;
	}

	getClumpRows(arrAccessorParts, strMatchValue, objData) {
		var arrRows = [];
		for (var i = 0; i < objData.length; i++) {
			var currRow = objData[i];
			var strValue = this.getValueByAccessor(arrAccessorParts, currRow);
			if (strValue == strMatchValue) {
				arrRows.push(currRow);
			}
		}
		return arrRows;
	}

	getIdColumn() {
		var _view = this;
		var _cols = _view._columns;
		for (var i = 0; i < _cols.length; i++) {
			if (_cols[i]['is_id']) {
				return _cols[i];
			}
		}
		return null;
	}

	getSelectedRows() {
		var allRows = this._tbody.getElementsByTagName('tr');
		var selectedRows = [];
		for (var i = 0; i < allRows.length; i++) {
			var _row = allRows[i];
			var cbox = _row.firstElementChild.firstElementChild;
			if (cbox != null && cbox.type == 'checkbox') {
				if (cbox.checked) {
					selectedRows.push(_row);
				}
			}
		}
		return selectedRows;
	}

	getURI(strLinkPattern, objRow) {
		var arrLinkComponents = strLinkPattern.split('/');
		for (var i = 0; i < arrLinkComponents.length; i++) {
			var currComponent = arrLinkComponents[i];
			if (currComponent.slice(0, 1) == '<') {
				// Replace the variable;
				var strAccessor = currComponent.slice(1, currComponent.length - 1);
				var strReplacement = objRow[strAccessor];
				if (strReplacement != null) {
					arrLinkComponents[i] = strReplacement;
				}
			}
		}
		var strLink = arrLinkComponents.join('/');
		return strLink;
	}

	getValueByAccessor(arrAccessorParts, objRow) {
		var currObj = objRow;
		for (var i = 0; i < arrAccessorParts.length; i++) {
			var strCurrAccessor = arrAccessorParts[i];
			currObj = currObj[strCurrAccessor];
		}

		return currObj;
	}

	handleSelect() {
		var _self = this;
		var evtHandler = function (evt) {
			evt.stopPropagation();
			//evt.preventDefault();
			var _this = _self;
			var cell = evt.target.parentElement;
			switch (cell.tagName.toLowerCase()) {
				case "th":
					{
						_this.selectAll(evt);
						break;
					}
				case "td":
					{
						_this.selectRow(evt);
						break;
					}
			}

		}
		return evtHandler;
	}

	hasSelection() {
		var selRows = this.getSelectedRows();
		return (selRows.length > 0);
	}

	on_init() {
		var _view = this.ui();
		this._header = _view.firstElementChild;
		this._table = _view.lastElementChild;
		this._table.id = "view_" + this._id;
		this._thead = this._table.firstElementChild;
		this._tbody = this._thead.nextElementSibling;
		this._tfoot = this._tbody.nextElementSibling;
	}

	processBodyData(objTbody, objData) {
		if (objData.clumps != null) {
			for (var i = 0; i < objData.clumps.length; i++) {
				var currClump = objData.clumps[i];
				var clumpHeaderRow = document.createElement('tr');
				if (this._selectable) {
					var newCell = asg.u.createFromFragment('<td class="selector" />');
					clumpHeaderRow.appendChild(newCell);
				}
				clumpHeaderRow.style.display = "inline-block";
				clumpHeaderRow.addEventListener('click', this._handleRowClick.bind(this));
				clumpHeaderRow.onclick = this._handleRowClick;
				var clumpHeaderCell = document.createElement('td');
				clumpHeaderCell.colSpan = this._columns.length - objData.position;
				clumpHeaderCell.setAttribute("class", "group_head expanded group_head_" + objData.position);
				clumpHeaderCell.innerHTML = currClump.match_value + ' (' + currClump.rows.length + ')';
				clumpHeaderRow.appendChild(clumpHeaderCell);
				objTbody.appendChild(clumpHeaderRow);
				this.processBodyRows(objTbody, currClump.rows);
			}
		}
	}

	processBodyRows(objTbody, objData) {
		var idKey = 'id';
		var idCol = this.getIdColumn();
		if (idCol != null) {
			idKey = idCol.source;
		}
		for (var i = 0; i < objData.length; i++) {
			var objRow = document.createElement('tr');
			objRow.setAttribute('class', 'view-body-row not-selected');
			objRow.setAttribute('id', 'view_row_' + objData[i][idKey]);
			objRow.addEventListener('click', this._handleRowClick.bind(this));
			if (this._selectable) {
				var newCell = asg.u.createFromFragment('<td class="selector"><input type="checkbox" /></td>');
				newCell.addEventListener('click', this._handleCellClick.bind(this));
				newCell.firstElementChild.onchange = this.handleSelect.apply(this);
				objRow.appendChild(newCell);
			}

			this.processBodyRowCells(objRow, objData[i]);
			objTbody.appendChild(objRow);
		}
	}

	processBodyRowCells(objTrow, objData) {
		for (var i = 0; i < this._columns.length; i++) {
			var currCol = this._columns[i];
			var objCell = document.createElement('td');
			if (currCol.style != null) {
				objCell.setAttribute('style', currCol.style)
			} else {
				if (currCol.width != null) {
					objCell.setAttribute('style', 'width: ' + currCol.width + ';')
				}
			}

			if (!currCol.grouped) {
				var arrAccessorParts = currCol.source.split('/');
				var strLabel = this.getValueByAccessor(arrAccessorParts, objData);
				if (currCol.linked) {
					var objLink = document.createElement('a');
					var strURI = this.getURI(currCol.linkPattern, objData);
					objLink.href = strURI;
					objLink.innerHTML = strLabel;
					objCell.appendChild(objLink);
				} else {
					objCell.innerHTML = strLabel
				}
			}
			objTrow.appendChild(objCell);
		}
	}

	redraw() {
		let head = this._thead;
		head.innerHTML = '';
		let row = document.createElement("tr");
		if (this._selectable) {
			var newCell = asg.u.createFromFragment('<th class="selector"><input type="checkbox" /></th>');
			newCell.firstElementChild.onchange = this.handleSelect.apply(this);
			row.appendChild(newCell);
		}
		for (var i = 0; i < this._columns.length; i++) {
			var currCol = this._columns[i];
			var strClass = 'asg-view-col-head' + (currCol.sorted ? ' col-sorted' : '') + (currCol.grouped ? ' col-grouped' : '');
			var newCell = asg.u.createFromFragment(
				asg.u.strReplace(
					'<th class="%2%" %3%>%1%</th>', [
                        currCol.label,
                        strClass,
						(currCol.style != null ? 'style="' + currCol.style + '"' :
							(currCol.width != null ? 'style="width:' + currCol.width + ';"' : '')
                        )
                    ]
				)
			);
			if (currCol.sortable) {
				var strClass = 'fas fa-sort'

				if (currCol.sortMode && currCol.sortMode == "down") {
					strClass = 'fas fa-sort-down'
				}

				if (currCol.sortMode && currCol.sortMode == "up") {
					strClass = 'fas fa-sort-up'
				}


				var sortArr = asg.u.createFromFragment('<i class="' + strClass + '"></i>');

				var _doSort = function (evt) {
					var currCell = evt.target.parentElement;
					var index = 0;
					while (currCell.previousElementSibling != null) {
						index = index + 1;
						currCell = currCell.previousElementSibling;
					}
					this.doColumnSort(index);
				};

				sortArr.onclick = _doSort.bind(this);
				newCell.appendChild(sortArr);
			}
			row.appendChild(newCell);
		};
		head.appendChild(row);

		let body = this._tbody;
		body.innerHTML = ''
		var bodyData = this.formatBodyData(this._columns, this._row_data);
		let isClumped = false;
		if (bodyData != null && bodyData.length > 0) {
			let peek = bodyData[0];
			if (peek.clumps != null) {
				isClumped = true;
			}
		}
		if (isClumped) {
			for (var i = 0; i < bodyData.length; i++) {
				this.processBodyData(body, bodyData[i]);
			}
		} else {
			this.processBodyRows(body, bodyData);
		}


		let foot = this._tfoot;
		foot.innerHTML = '';
		if (this._buttons != null && this._buttons.length > 0) {
			var footerRow = document.createElement('tr');
			var footerCell = document.createElement('td');
			footerCell.setAttribute('colspan', this._columns.length);
			footerCell.setAttribute('class', 'view_button_bar');
			for (var i = 0; i < this._buttons.length; i++) {
				var objButton = this._buttons[i];
				var elButton = document.createElement('button');
				elButton.id = 'view_' + this._id + '_button_' + objButton.id;
				elButton.className = 'sg-Btn sg-Btn--' + objButton.class;
				if (objButton.requires_selection) {
					elButton.className = elButton.className + ' is-disabled';
				}
				elButton.innerHTML = objButton.label;
				if (objButton.icon != null) {
					elButton.innerHTML = '<i class="' + objButton.icon + '"></i> ' + objButton.label;
				}
				if (objButton.handler != null) {
					elButton.onclick = objButton.handler.bind(this);
				}

				footerCell.appendChild(elButton);
			}
			footerRow.appendChild(footerCell);
			foot.appendChild(footerRow);
		}
	}

	selectAll(objEvt) {
		var source = objEvt.target;
		var allRows = this._tbody.getElementsByTagName('tr');
		for (var i = 0; i < allRows.length; i++) {
			var _row = allRows[i];
			if (_row.style.display != 'none') {
				var target = _row.firstElementChild.firstElementChild;
				if (target != null && target.type == "checkbox") {
					target.checked = source.checked;
					if (target.checked) {
						asg.u.toggleClass(_row, 'not-selected', 'selected');
					} else {
						asg.u.toggleClass(_row, 'selected', 'not-selected');
					}
				}

			}
		}
		this.evaluateButtonStates();
	}

	selectRow(objEvt) {
		var source = objEvt.target;
		var _row = source.parentElement.parentElement;
		if (source.checked) {
			asg.u.toggleClass(_row, 'not-selected', 'selected');
		} else {
			asg.u.toggleClass(_row, 'selected', 'not-selected');
		}
		this.evaluateButtonStates();
	}

	setData(arrDataObjects) {
		this._row_data = arrDataObjects;
		this.redraw();
	}

	sortClumps(arrClumps, strSortKey, strSortDir) {
		var fnSort = function (a, b) {
			return 0;
		};

		switch (strSortKey) {
			case "numrecords":
				{
					if (strSortDir == 'asc') {
						fnSort = function (a, b) {
							return a.rows.length - b.rows.length;
						};
					} else {
						fnSort = function (a, b) {
							return b.rows.length - a.rows.length;
						}
					}
					break;
				}

			case "alpha":
				{
					if (strSortDir == 'asc') {
						fnSort = function (a, b) {
							if (a.match_value > b.match_value) {
								return 1;
							}
							if (a.match_value < b.match_value) {
								return -1;
							}
							return 0;
						};
					} else {
						fnSort = function (a, b) {
							if (a.match_value > b.match_value) {
								return -1;
							}
							if (a.match_value < b.match_value) {
								return 1;
							}
							return 0;
						};
					}
					break;
				}
		}

		return arrClumps.sort(fnSort);
	}

	sortRows(arrRows, strSortKey, strSortDir, depth) {
		var _cols = this._columns;
		var currCol = _cols[depth];
		var strAccessor = currCol.source;
		var arrAccessorParts = strAccessor.split('/');
		var _self = this;
		var fnSort = function (a, b) {
			return 0;
		};
		switch (strSortKey) {
			case "alpha":
				{
					if (strSortDir == 'asc') {
						fnSort = function (a, b) {
							var _this = _self;
							var _acc = arrAccessorParts;
							if (_this.getValueByAccessor(_acc, a) > _this.getValueByAccessor(_acc, b)) {
								return 1;
							}
							if (_this.getValueByAccessor(_acc, a) < _this.getValueByAccessor(_acc, b)) {
								return -1;
							}
							return 0;
						};
					} else {
						fnSort = function (a, b) {
							var _this = _self;
							var _acc = arrAccessorParts;
							if (_this.getValueByAccessor(_acc, a) > _this.getValueByAccessor(_acc, b)) {
								return -1;
							}
							if (_this.getValueByAccessor(_acc, a) < _this.getValueByAccessor(_acc, b)) {
								return 1;
							}
							return 0;
						};
					}
					break;
				}
		}

		return arrRows.sort(fnSort);
	}

	template() {
		return [
            '<div class="asg-view-component" id="%1%">',
            '   <div class="asg-view-header"><h2>%2%</h2></div>',
            '   <table class="asg-view-table"><thead/><tbody style="%3%"/><tfoot/></table>',
            '</div>'].join('');
	}

	templateArgs() {
		return [
            this._id,
            this._title,
            'width: ' + this._width + '; height: ' + this._height + ';'
        ];
	}

	_toggleRow(objRow, collapse) {
		var objCell = objRow.firstElementChild;
		var strClass = objCell.getAttribute('class');
		var isGroup = (strClass.indexOf('group_head') >= 0);
		var processing = true;
		var nextRow = objRow.nextElementSibling;
		while (nextRow != null && processing) {
			var rowClass = nextRow.firstElementChild.getAttribute('class') || '';
			if (rowClass.indexOf('group_head') >= 0) {
				// Got to the next group
				processing = false;
			} else {
				if (collapse) {
					nextRow.style.display = "none";
				} else {
					nextRow.style.display = "block";
				}
			}
			nextRow = nextRow.nextElementSibling;
		}
		if (collapse) {
			asg.u.toggleClass(objCell, 'expanded', 'collapsed');
		} else {
			asg.u.toggleClass(objCell, 'collapsed', 'expanded');
		}
	}

	_handleCellClick(evt, data) {
		//evt.preventDefault();
		evt.stopPropagation();
		return false;
	}

	_handleRowClick(evt, data) {
		evt.preventDefault();
		var boo = arguments;
		var objRow = evt.currentTarget;
		var objCell = objRow.firstElementChild;
		var strClass = objCell.getAttribute('class');
		var isGroup = (strClass.indexOf('group_head') >= 0);
		if (isGroup) {
			var isExpanded = (strClass.indexOf('expanded') >= 0);
			this._toggleRow(objRow, isExpanded);
		}
		if (objRow.firstElementChild.firstElementChild != null &&
			objRow.firstElementChild.firstElementChild.type == 'checkbox') {
			if (objRow.firstElementChild.firstElementChild.checked) {
				objRow.firstElementChild.firstElementChild.checked = false;
			} else {
				objRow.firstElementChild.firstElementChild.checked = true;
			}
			this.selectRow({
				target: objRow.firstElementChild.firstElementChild
			});
		}
	}
}

asg.UserPicker = class extends asg.HTMLComponent {
	/** Options
	{
	//- Mandatory
	//------------------------
		id: 'string',
		target: HTMLElement,
		userTree: object;
		
	//- Optional
	//------------------------
		value: Object || null,
		onvaluechange: function,
		disabled: true || false
	}
	**/

	set disabled(boolDisabled) {
		if (boolDisabled != false) {
			this._disabled = true;
		} else {
			this._disabled = false;
		}


		if (this._disabled) {
			this._view.setAttribute('class', 'asg-user-picker disabled');
			this._view.firstElementChild.removeAttribute('title');
		} else {
			this._view.setAttribute('class', 'asg-user-picker');
			this._view.firstElementChild.setAttribute('title', 'Click to open calendar');
		}
	}

	get disabled() {
		if (this._disabled != null) {
			return this._disabled;
		} else {
			return false;
		}
	}

	get displayValue() {
		var _myValues = this.value.slice(0);
		if (_myValues.length == 0) {
			return "Click to select...";
		}
		var _displayValue = [];
		for (var i = 0; i < _myValues.length; i++) {
			var _val = _myValues[i];
			_displayValue.push(_val[this._displayField[0]]);
		}
		var _displayText = _displayValue.join(', ');
		if (_displayText.length >= 25 && _displayValue.length >= 2) {
			_displayText = _displayValue[0] + ', ' + _displayValue[1];
			_displayText = _displayText.slice(0, 20) + '... (' + (_displayValue.length - 2) + ' more)';
		}
		return _displayText;
	}

	fragments() {
		let _dt = asg.util.dt;

		var _dayArr = [];
		for (let i = 0; i < _dt.days.length; i++) {
			_dayArr.push(_dt.days[i].a);
		}

		return {
			controls: [
				'<div class="asg-cal-controls">',
				'<div class="asg-cal-btn asg-year-back">',
				'<i class="fas fa-angle-double-left"></i>',
				'</div>',
				'<div class="asg-cal-btn asg-month-back">',
				'<i class="fas fa-angle-left"></i>',
				'</div>',
				'<div class="asg-cal-month-disp">',
				'Wednesday May 10th 2018',
				'</div>',
				'<div class="asg-cal-btn asg-year-forward">',
				'<i class="fas fa-angle-right"></i>',
				'</div>',
				'<div class="asg-cal-btn asg-month-forward">',
				'<i class="fas fa-angle-double-right"></i>',
				'</div>',
				'</div>'
			].join(''),

			cal_table: [
				'<table class="asg-cal-main">',
				'<thead>',
				'<tr><th>' + _dayArr.join('</th><th>') + '</th></tr>',
				'</thead>',
				'<tbody>',
				'</tbody>',
				'</table>'
			].join(''),
		}
	}

	hidePicker() {
		var _view = this.ui();
		let _cal = _view.lastElementChild;

		document.body.removeEventListener('click', this._hideFunction);
		_cal.setAttribute('style', 'display: none;');
	}

	isSelected(strId) {
		var _vals = this.value.slice(0);
		for (var i = 0; i < _vals.length; i++) {
			var _val = _vals[i];
			if (_val[this._idField[0]] == strId) {
				return true;
			}
		}
	}

	on_init() {
		var _view = this.ui();
		var _body = _view.firstElementChild;
		let _dt = asg.util.dt;

		this._showFunction = this.showPicker.bind(this);
		this._hideFunction = this.hidePicker.bind(this);

		this._frags = this.fragments();

		this._selectedUsers = [];

		let _cal = _view.lastElementChild;
		let _header = _cal.firstElementChild;
		let _okBtn = _header.lastElementChild;

		this._uhead = _cal.lastElementChild.firstElementChild.firstElementChild;
		this._ghead = _cal.lastElementChild.lastElementChild.firstElementChild;

		this._uhead.addEventListener('click', this._toggleGroup.bind(this));
		this._ghead.addEventListener('click', this._toggleGroup.bind(this));


		this._udisp = _cal.lastElementChild.firstElementChild.lastElementChild;
		this._gdisp = _cal.lastElementChild.lastElementChild.lastElementChild;


		_okBtn.addEventListener('click', this._updateFunction.bind(this));

		_body.addEventListener('click', this._showFunction);

		if (this._value == null) {
			this._value = [];
		}
		if (this._disabled != null) {
			this.disabled = this._disabled;
		}

		this._updateView();
	}

	showPicker(evt) {
		var _view = this.ui();
		let _cal = _view.lastElementChild;

		evt.cancelBubble = true;
		if (!this.disabled) {

			document.body.addEventListener('click', this._hideFunction);

			_cal.setAttribute('style', 'display: block;');

			var _t = this._userTree;

			this._udisp.innerHTML = '';
			this._gdisp.innerHTML = '';

			var _sortKey = this._displayField[0];
			var _sortFn = function (a, b) {
				if (a[_sortKey] > b[_sortKey]) {
					return 1;
				}
				if (a[_sortKey] > b[_sortKey]) {
					return 1;
				}
				return 0;
			};
			_t.users.sort(_sortFn);
			_t.groups.sort(_sortFn);

			for (var i = 0; i < _t.users.length; i++) {
				var _u = _t.users[i];
				if (_u.systemUser != true) {
					var arrIdFields = this._idField.slice(0);
					var idField = arrIdFields.shift();
					while (arrIdFields.length > 0 && !_u.hasOwnProperty(idField)) {
						idField = arrIdFields.shift();
					}

					var arrLabelFields = this._displayField.slice(0);
					var labelField = arrLabelFields.shift();
					while (arrLabelFields.length > 0 && !_u.hasOwnProperty(labelField)) {
						labelField = arrLabelFields.shift();
					}
					var _selectedText = '' + this.isSelected(_u[idField]);
					var row = asg.u.createFromFragment(
						asg.u.strReplace(
							'<div class="user-row" data-selected="%3%" data-user-id="%1%"><i class="fas asg-selecto"></i>%2%</div>', [
							_u[idField],
							_u[labelField],
							_selectedText
						]
						)
					);
					row.addEventListener('click', this._selectRow.bind(this));
					this._udisp.appendChild(row);
				}
			}

			for (var i = 0; i < _t.groups.length; i++) {
				var _g = _t.groups[i];
				var arrIdFields = this._idField.slice(0);
				var idField = arrIdFields.shift();
				while (arrIdFields.length > 0 && !_g.hasOwnProperty(idField)) {
					idField = arrIdFields.shift();
				}

				var arrLabelFields = this._displayField.slice(0);
				var labelField = arrLabelFields.shift();
				while (arrLabelFields.length > 0 && !_g.hasOwnProperty(labelField)) {
					labelField = arrLabelFields.shift();
				}
				var _selectedText = '' + this.isSelected(_g[idField]);
				var row = asg.u.createFromFragment(
					asg.u.strReplace(
						'<div class="group-row" data-selected="%3%" data-group-id="%1%"><i class="fas asg-selecto"></i>%2%</div>', [
							_g[idField],
							_g[labelField],
							_selectedText
						]
					)
				);
				row.addEventListener('click', this._selectRow.bind(this));
				this._gdisp.appendChild(row);
			}
		}
	}


	styles() {
		return [
            '.asg-user-picker {display:inline-block; height: 36px; padding: 0.25em; background: #fff;border: 1px solid #006f66;border-radius:5px;}',
            '.asg-user-picker.disabled {background: #f3f3f3; border-color: #999999;}',
			'.asg-user-picker .asg-user-picker-body {display: inline-block;cursor:pointer;}',
			'.asg-user-picker.disabled .asg-user-picker-body {cursor:default;}',
			'.asg-user-picker .asg-user-display {display: inline-block; font-size: 0.85em;width: 235px; color: #006f66; text-align: center; white-space:nowrap; overflow:hidden;}',
			'.asg-user-picker.disabled .asg-user-display {color: #999999; font-style: italic;}',
			'.asg-user-picker .asg-user-button {display: inline-block; vertical-align: top; margin:0; padding:0; padding-left:5px; padding-right:5px; border: 1px solid #006f66;border-radius:5px;color: #006f66;}',
			'.asg-user-picker.disabled .asg-user-button, .asg-user-picker.disabled .asg-user-button:hover {border-color:#999999;background: #f3f3f3;color: #999999;}',
			'.asg-user-picker .asg-user-button:hover {background: #7fb7b2; color: #fff;}',
			'.asg-user-picker .asg-user-browser {display: none; position:absolute; z-index: 9000; width: 450px; height: 350px;border: 2px solid #006f66; border-radius: 10px; background: #fff; -webkit-box-shadow: 10px 10px 5px 0px rgba(0,111,102,0.35);-moz-box-shadow: 10px 10px 5px 0px rgba(0,111,102,0.35);box-shadow: 10px 10px 5px 0px rgba(0,111,102,0.35);}',
			'.asg-user-picker .asg-user-browser-head {height: 30px;border-bottom: 2px outset #bfdbd9; border-top-left-radius: 10px;border-top-right-radius: 10px; background: #bfdbd9; text-align: right; padding-right: 5px;}',
			'.asg-user-picker .asg-user-browser-body {height: 315px; overflow-y: auto; font-size: 0.8em; color: #006f66;}',
			'.asg-user-picker .asg-user-browser-body .asg-user-list {margin-bottom: 0.5em; margin-left: 0.25em;}',
			'.asg-user-picker .asg-user-browser-body .asg-group-list { margin-left: 0.25em;}',

			'.asg-user-picker .asg-user-browser-body .asg-user-list .asg-user-list-head,',
			'.asg-user-picker .asg-user-browser-body .asg-group-list .asg-group-list-head {font-weight: bold; margin-left: 0.25em;}',

			'.asg-user-picker .asg-user-browser-body .asg-user-list .asg-user-list-head i.fas.asg-expando:before,',
			'.asg-user-picker .asg-user-browser-body .asg-group-list .asg-group-list-head i.fas.asg-expando:before {',
			'  content: "\\f0d7";',
			'}',

			'.asg-user-picker .asg-user-browser-body .asg-user-list .asg-user-list-head[data-collapsed="true"] i.fas.asg-expando:before,',
			'.asg-user-picker .asg-user-browser-body .asg-group-list .asg-group-list-head[data-collapsed="true"] i.fas.asg-expando:before {',
			'  content: "\\f0da";',
			'}',
			'.asg-user-picker .asg-user-browser-body .asg-group-list .asg-group-list-body { padding-left: 0.25em;}',
			'.asg-user-picker .asg-user-browser-body .asg-user-list .asg-user-list-body { padding-left: 0.25em;padding-right: 0.25em;}',

			'.asg-user-picker .asg-user-browser-body .asg-user-list .asg-user-list-head[data-collapsed="true"] + .asg-user-list-body,',
			'.asg-user-picker .asg-user-browser-body .asg-group-list .asg-group-list-head[data-collapsed="true"] + .asg-group-list-body {',
			'  display:none;',
			'}',

			'.asg-user-picker .asg-user-browser-body .asg-group-list .asg-group-list-body .group-row:nth-child(odd),',
			'.asg-user-picker .asg-user-browser-body .asg-user-list .asg-user-list-body .user-row:nth-child(odd) {',
			'	background: #f0f0f0;',
			'}',

			'.asg-user-picker .asg-user-browser-body .asg-group-list .asg-group-list-body .group-row[data-selected="true"],',
			'.asg-user-picker .asg-user-browser-body .asg-user-list .asg-user-list-body .user-row[data-selected="true"] {',
			'	background: #e8fee8;',
			'}',

			'.asg-user-picker .asg-user-browser-body .asg-user-list .user-row i.fas.asg-selecto,',
			'.asg-user-picker .asg-user-browser-body .asg-group-list .group-row i.fas.asg-selecto {',
			'  margin-left: 3px;',
			'  margin-right: 1.5em;',
			'  width: 12px;',
			'}',


			'.asg-user-picker .asg-user-browser-body .asg-user-list .user-row i.fas.asg-selecto:before,',
			'.asg-user-picker .asg-user-browser-body .asg-group-list .group-row i.fas.asg-selecto:before {',
			'  content: "";',
			'}',
			'.asg-user-picker .asg-user-browser-body .asg-user-list .user-row[data-selected="true"] i.fas.asg-selecto:before,',
			'.asg-user-picker .asg-user-browser-body .asg-group-list .group-row[data-selected="true"] i.fas.asg-selecto:before {',
			'  content: "\\f14a";',
			'}',
			'.asg-user-picker .asg-user-browser-head .asg-button {',
			'  display: inline-block; border-radius: 3px; margin: 2px; cursor: pointer;',
			' color: #fff; padding: 2px 5px; margin-left: 0px; font-size: 0.8em;',
			'-webkit-box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.4); -moz-box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.4); box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.4);',
			'}',
			'.asg-user-picker .asg-user-browser-head .asg-button:active {',
			'margin-left:2px; margin-top:2px;',
			'-webkit-box-shadow: 2px 2px 2px 1px rgba(0,0,0,0); -moz-box-shadow: 2px 2px 2px 1px rgba(0,0,0,0); box-shadow: 2px 2px 2px 1px rgba(0,0,0,0);',
			'}',
			'.asg-user-picker .asg-user-browser-head .asg-close-button {background-color: #B00020;}',
			'.asg-user-picker .asg-user-browser-head .asg-close-button:hover {background-color: #E53935;}',
			'.asg-user-picker .asg-user-browser-head .asg-ok-button {background-color: #018786;}',
			'.asg-user-picker .asg-user-browser-head .asg-ok-button:hover {background-color: #26A69A;}',



		].join('');
	}

	template() {
		return [
            '<div class="asg-user-picker" id="%1%">',
			'  <div class="asg-user-picker-body"  title="Click to select">',
			'    <div class="asg-user-display"></div>',
			'    <div class="asg-user-button">',
			'      <i class="fas fa-user"></i>',
			'    </div>',
			'  </div>',
			'  <div class="asg-user-browser">',
			'    <div class="asg-user-browser-head">',
			'		<div class="asg-button asg-close-button"><i class="fas fa-times-circle"></i></div>',
			'		<div class="asg-button asg-ok-button"><i class="fas fa-check-circle"></i></div>',
			'    </div>',
			'    <div class="asg-user-browser-body">',
			'		<div class="asg-user-list">',
			'		  <div class="asg-user-list-head" data-collapsed="false">',
			'			<i class="fas asg-expando"></i> <i class="fas fa-user"></i> Users',
			'		  </div>',
			'		  <div class="asg-user-list-body">',
			'		  </div>',
			'		</div>',
			'		<div class="asg-group-list">',
			'		  <div class="asg-group-list-head" data-collapsed="false">',
			'			<i class="fas asg-expando"></i> <i class="fas fa-users"></i> Groups',
			'		  </div>',
			'		  <div class="asg-group-list-body">',
			'		  </div>',
			'		</div>',
			'	 </div>',
			'  </div',
            '</div>'].join('');
	}

	templateArgs() {
		return [
            this._id
        ];
	}

	set value(arrUsers) {
		this._value = arrUsers;
	}

	get value() {
		return this._value;
	}

	_updateFunction() {
		var arrUsers = [];
		var userRows = this._udisp.children;
		for (var i = 0; i < userRows.length; i++) {
			var _r = userRows[i];
			if (eval(_r.getAttribute('data-selected'))) {
				var newUser = {};
				newUser[this._idField[0]] = _r.getAttribute('data-user-id');
				newUser[this._displayField[0]] = _r.innerText;
				newUser.type = "user";
				arrUsers.push(newUser);
			}
		}
		var userRows = this._gdisp.children;
		for (var i = 0; i < userRows.length; i++) {
			var _r = userRows[i];
			if (eval(_r.getAttribute('data-selected'))) {
				var newUser = {};
				newUser[this._idField[0]] = _r.getAttribute('data-group-id');
				newUser[this._displayField[0]] = _r.innerText;
				newUser.type = "group";
				arrUsers.push(newUser);
			}
		}
		this.value = arrUsers;
		this._onvaluechange(this);
		this._updateView();
	}

	_updateView() {
		var _view = this.ui();
		var _body = _view.firstElementChild;
		var _display = _body.firstElementChild;
		_display.innerHTML = this.displayValue;
	}

	_selectRow(evt) {
		evt.stopPropagation();
		var _this = this;
		var _target = evt.currentTarget;
		var isSelected = eval(_target.getAttribute("data-selected"));
		if (isSelected) {
			_target.setAttribute("data-selected", "false");
		} else {
			_target.setAttribute("data-selected", "true");
		}
	};

	_toggleGroup(evt) {
		evt.stopPropagation();
		var _this = this;
		var _target = evt.currentTarget;
		var isCollapsed = eval(_target.getAttribute("data-collapsed"));
		if (isCollapsed) {
			_target.setAttribute("data-collapsed", "false");
		} else {
			_target.setAttribute("data-collapsed", "true");
		}
	};

}

asg.DataPicker = class extends asg.HTMLComponent {
	/** Options
	{
	//- Mandatory
	//------------------------
		id: 'string',
		target: HTMLElement,
		data_source: String;
		
	//- Optional
	//------------------------
        allow_multiple: true || false,
        icon_class: String
		value: Object || null,
		onvaluechange: function,
		disabled: true || false
	}
	**/

	set disabled(boolDisabled) {
		if (boolDisabled != false) {
			this._disabled = true;
		} else {
			this._disabled = false;
		}


		if (this._disabled) {
			this._view.setAttribute('class', 'asg-data-picker disabled');
			this._view.firstElementChild.removeAttribute('title');
		} else {
			this._view.setAttribute('class', 'asg-data-picker');
			this._view.firstElementChild.setAttribute('title', 'Click to select...');
		}
	}

	get disabled() {
		if (this._disabled != null) {
			return this._disabled;
		} else {
			return false;
		}
	}

	get displayValue() {
        var _myValues = this.value;
        
        if(_myValues == null){
            return "Click to select...";
        }
                
        if(_myValues.constructor === Array){
            _myValues = _myValues.slice(0);
        }
        
        if(_myValues.constructor === Object){
            _myValues = Object.assign({}, _myValues);
        }
        
        var dataEls = this._data_elements;
		var _displayValue = [];
        
        if(_myValues.constructor === Array){
            for (var i = 0; i < _myValues.length; i++) {
                var _val = _myValues[i];
                
            }
        }
        
        if(_myValues.constructor === Object){
            _displayValue.push(_myValues[dataEls.label]);
        }
        
        var _displayText = _displayValue.join(', ');
		
		return _displayText;
	}
    
    fetchData(evt){
        if(!this.isFetching){
            this.isFetching = true;
            let _query = this._searchfield.value;
            if(_query.length > 0){
                let objOptions = {
                    on_result: this.updateData,
                    target: this._dataView,
                    query: _query,
                    _self: this
                };

                var _endpoint = asg.conf.endpoints[asg.app.fn.mode()][this._data_source];
                _endpoint = _endpoint + this._query_prefix + _query;

                asg.app.fn.ws.fetch(_endpoint, objOptions);
            } else {
                this._dataView.innerHTML = '<p>No results found. Please try a different query.</p>';
            }
        }
    }

	fragments() {
		return {
            data_row: '<div class="asg-data-row" data-id="%1%" data-label="%2%" data-selected="false">%3%</div>'
        };
	}

	hidePicker() {
		var _view = this.ui();
		let _cal = _view.lastElementChild;

		document.body.removeEventListener('click', this._hideFunction);
		_cal.setAttribute('style', 'display: none;');
	}

	isSelected(strId) {
		var _vals = this.value.slice(0);
		for (var i = 0; i < _vals.length; i++) {
			var _val = _vals[i];
			if (_val[this._idField[0]] == strId) {
				return true;
			}
		}
	}

	on_init() {
		var _view = this.ui();
		var _body = _view.firstElementChild;

		this._showFunction = this.showPicker.bind(this);
		this._hideFunction = this.hidePicker.bind(this);

		this._frags = this.fragments();

		this._selectedItems = [];

		let _cal = _view.lastElementChild;
		let _header = _cal.firstElementChild;
		let _okBtn = _header.lastElementChild;
        
		_okBtn.addEventListener('click', this._updateFunction.bind(this));

		_body.addEventListener('click', this._showFunction);
        
        let _searchBox = _header.nextElementSibling;
        let _search = _searchBox.firstElementChild;
        this._searchfield = _search;
        
        var _searchClick = function(evt){
            evt.cancelBubble = true;
            evt.stopPropagation();
            evt.preventDefault();
        }
        
        _search.addEventListener('keyup', this.fetchData.bind(this));
        _searchBox.addEventListener('click', _searchClick);
        
        
        let _data_display = _cal.lastElementChild;
        
        
        let _dataView = _data_display.firstElementChild;
        this._dataView = _dataView;
        
        this.isFetching = false;
        this._fetchResult = [];

		if (this._value == null) {
			this._value = [];
		}
		if (this._disabled != null) {
			this.disabled = this._disabled;
		}

        _search.focus();
        
		this._updateView();
	}

	showPicker(evt) {
		var _view = this.ui();
		let _cal = _view.lastElementChild;

		evt.cancelBubble = true;
		if (!this.disabled) {
            this.isFetching = false;
            this._searchfield.value = '';
			document.body.addEventListener('click', this._hideFunction);

			_cal.setAttribute('style', 'display: block;');

            this._searchfield.focus();
		}
	}

	styles() {
		return [
            '.asg-data-picker {display:inline-block; height: 36px; padding: 0.25em; background: #fff;border: 1px solid #006f66;border-radius:5px;}',
            '.asg-data-picker.disabled {background: #f3f3f3; border-color: #999999;}',
			'.asg-data-picker .asg-data-picker-body {display: inline-block;cursor:pointer;}',
			'.asg-data-picker.disabled .asg-data-picker-body {cursor:default;}',
			'.asg-data-picker .asg-data-display {display: inline-block; font-size: 0.85em;width: 235px; color: #006f66; text-align: center; white-space:nowrap; overflow:hidden;}',
			'.asg-data-picker.disabled .asg-data-display {color: #999999; font-style: italic;}',
			'.asg-data-picker .asg-data-button {display: inline-block; vertical-align: top; margin:0; padding:0; padding-left:5px; padding-right:5px; border: 1px solid #006f66;border-radius:5px;color: #006f66;}',
			'.asg-data-picker.disabled .asg-data-button, .asg-data-picker.disabled .asg-data-button:hover {border-color:#999999;background: #f3f3f3;color: #999999;}',
			'.asg-data-picker .asg-data-button:hover {background: #7fb7b2; color: #fff;}',
			'.asg-data-picker .asg-data-browser {display: none; position:absolute; z-index: 9000; width: 450px; height: 350px;border: 2px solid #006f66; border-radius: 10px; background: #fff; -webkit-box-shadow: 10px 10px 5px 0px rgba(0,111,102,0.35);-moz-box-shadow: 10px 10px 5px 0px rgba(0,111,102,0.35);box-shadow: 10px 10px 5px 0px rgba(0,111,102,0.35);}',
			'.asg-data-picker .asg-data-browser-head {height: 30px;border-bottom: 2px outset #bfdbd9; border-top-left-radius: 10px;border-top-right-radius: 10px; background: #bfdbd9; text-align: right; padding-right: 5px; position: relative;}',
            '.asg-data-picker .asg-data-browser-head .asg-browser-head-text {text-align: left; position: absolute; left: 1em; top: 0.25em; font-size: 0.8em; color: #006f66;font-weight: bold;}',
			'.asg-data-picker .asg-data-browser-body {height: 275px; overflow-y: auto; font-size: 0.8em; color: #006f66;}',
            '.asg-data-picker .asg-data-search {height: 36px; background: #006f66; padding: 3px;}',
            '.asg-data-picker .asg-data-search input[type="text"] {height: 30px; line-height: 30px; font-size: 0.8em; padding: 3px; border-color: #006f66;}',
			
            '.asg-data-picker .asg-data-browser-body .asg-data-list {margin-bottom: 0.5em; margin-left: 0.25em;}',
			
            '.asg-data-picker .asg-data-list p {margin: 2em; color: #666; padding: 2em; border: 1px solid #666; border-radius: 15px; text-align: center;}',

            '.asg-data-picker .asg-data-browser-body .asg-data-row { margin: 0.125em; padding: 0.125em; cursor:pointer;}',
            '.asg-data-picker .asg-data-browser-body .asg-data-row:nth-child(even) { background:#f3f3f3; }',
			
			'.asg-data-picker .asg-data-browser-head .asg-button {',
			'  display: inline-block; border-radius: 3px; margin: 2px; cursor: pointer;',
			' color: #fff; padding: 2px 5px; margin-left: 0px; font-size: 0.8em;',
			'-webkit-box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.4); -moz-box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.4); box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.4);',
			'}',
			'.asg-data-picker .asg-data-browser-head .asg-button:active {',
			'margin-left:2px; margin-top:2px;',
			'-webkit-box-shadow: 2px 2px 2px 1px rgba(0,0,0,0); -moz-box-shadow: 2px 2px 2px 1px rgba(0,0,0,0); box-shadow: 2px 2px 2px 1px rgba(0,0,0,0);',
			'}',
			'.asg-data-picker .asg-data-browser-head .asg-close-button {background-color: #B00020;}',
			'.asg-data-picker .asg-data-browser-head .asg-close-button:hover {background-color: #E53935;}',
			'.asg-data-picker .asg-data-browser-head .asg-ok-button {background-color: #018786;}',
			'.asg-data-picker .asg-data-browser-head .asg-ok-button:hover {background-color: #26A69A;}',



		].join('');
	}

	template() {
		return [
            '<div class="asg-data-picker" id="%1%">',
			'  <div class="asg-data-picker-body"  title="Click to select...">',
			'    <div class="asg-data-display"></div>',
			'    <div class="asg-data-button">',
			'      <i class="%2%"></i>',
			'    </div>',
			'  </div>',
			'  <div class="asg-data-browser">',
			'    <div class="asg-data-browser-head">',
            '       <span class="asg-browser-head-text">Start typing in the text box below</span>',
			'		<div class="asg-button asg-close-button"><i class="fas fa-times-circle"></i></div>',
			'		<div class="asg-button asg-ok-button"><i class="fas fa-check-circle"></i></div>',
			'    </div>',
            '    <div class="asg-data-search"><input type="text" id="asg_data_picker_search" placeholder="Application Name..." /></div>',
			'    <div class="asg-data-browser-body">',
			'		<div class="asg-data-list"><p>No results found. Please try a different query.</p></div>',
			'	 </div>',
			'  </div',
            '</div>'].join('');
	}

	templateArgs() {
		return [
            this._id,
            this._icon_class
        ];
	}
    
    updateData(){
        var _me = this.options._self;
        var _view = this.options.target;
        var _data = this.result.result;
        
        var frags = _me._frags;
        var dataEls = _me._data_elements;
        
        _me._fetchResult = _data;
        
        if(_me._fetchResult.length == 0){
            _view.innerHTML = '<p>No results found. Please try a different query.</p>';
        }
        else {
             _view.innerHTML = '';
        }
        for( var i = 0; (i < _me._fetchResult.length && i < 30); i++){
            var _item = _data[i];
            
            var dispLabel = _item[dataEls.label];
            var qMatch = this.options.query;
            
            var matchTerm = dispLabel.slice(0, qMatch.length);
            var matchRemainder = dispLabel.slice(qMatch.length, dispLabel.length);
            
            matchTerm = '<strong>' + matchTerm + '</strong>';
            dispLabel = matchTerm.concat(matchRemainder);
            
            var display_row = asg.util.createFromFragment(
                asg.util.strReplace(
                    frags.data_row,
                    [
                        _item[dataEls.id],
                        _item[dataEls.label],
                        dispLabel
                    ]
                )
            );
            
            display_row.addEventListener('click', _me._updateFunction.bind(_me));
            
            _view.appendChild(display_row);
        }
        
        _me.isFetching = false;
    }

	set value(arrItems) {
		this._value = arrItems;
	}

	get value() {
        if(this._value.length == 0){
            return null;
        }
        
        if(this._value.length == 1){
            return this._value[0];
        }
        
		return this._value;
	}

	_updateFunction(evt) {
		var arrItems = [];
		
        var clickedRow = evt.target;
        var _rowId = clickedRow.getAttribute('data-id');
        
        var dataEls = this._data_elements;
        
        for(var i = 0; i < this._fetchResult.length; i++){
            var _fr = this._fetchResult[i];
            if (_fr[dataEls.id] == _rowId){
                arrItems.push(Object.assign({},_fr));
            }
        }

		this.value = arrItems;
		this._onvaluechange(this);
		this._updateView();
	}

	_updateView() {
		var _view = this.ui();
		var _body = _view.firstElementChild;
		var _display = _body.firstElementChild;
		_display.innerHTML = this.displayValue;
	}

	_selectRow(evt) {
		evt.stopPropagation();
		var _this = this;
		var _target = evt.currentTarget;
		var isSelected = eval(_target.getAttribute("data-selected"));
		if (isSelected) {
			_target.setAttribute("data-selected", "false");
		} else {
			_target.setAttribute("data-selected", "true");
		}
	};

	_toggleGroup(evt) {
		evt.stopPropagation();
		var _this = this;
		var _target = evt.currentTarget;
		var isCollapsed = eval(_target.getAttribute("data-collapsed"));
		if (isCollapsed) {
			_target.setAttribute("data-collapsed", "false");
		} else {
			_target.setAttribute("data-collapsed", "true");
		}
	};

}

//EOF
