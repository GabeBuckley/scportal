/**** Custom JS Classes *****/
asg.HTMLComponent = class {
	constructor(objArgs) {
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
            '.asg-date-picker {display:inline-block; height: 36px; width: 300px; padding: 0.25em; background: #fff;border: 1px solid #006f66;border-radius:5px;}',
            '.asg-date-picker.disabled {background: #f3f3f3; border-color: #999999;}',
			'.asg-date-picker .asg-date-picker-body {display: inline-block;cursor:pointer;}',
			'.asg-date-picker.disabled .asg-date-picker-body {cursor:default;}',
			'.asg-date-picker .asg-date-display {display: inline-block; width: 255px; color: #006f66; text-align: center;}',
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
				clumpHeaderRow.style.display = "table-row";
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


//EOF
