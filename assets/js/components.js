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
		this._target.innerHTML = '';
		this._view = asg.util.createFromFragment(this.compile());
		this._target.appendChild(this._view);
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
