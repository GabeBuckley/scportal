asg.util = {

	addClass: function (objEl, strClass) {
		var strClassList = objEl.getAttribute("class") || '';
		var arrClasses = strClassList.split(' ');
		arrClasses.push(strClass);
		objEl.setAttribute('class', arrClasses.join(' '));
	},

	insertOption: function (objSelect, objOptionDetails, intIndex) {
		var _newOpt = document.createElement('option');
		for (_prop in objOptionDetails) {
			_newOpt[_prop] = objOptionDetails[_prop];
		}
		if (intIndex != null && !isNaN(intIndex) && intIndex >= 0) {
			objSelect.options.add(_newOpt, intIndex);
			objSelect.selectedIndex = intIndex;
		} else {
			objSelect.options.add(_newOpt);
		}
	},

	AppError: function (name, message) {
		this.name = name;
		this.message = message;
		var _this = this;
		this.toString = function () {
			return _this.name + ": " + this.message;
		}
	},

	arrayContains(haystack, needle) {
		if (haystack.constructor === Array) {
			for (var i = 0; i < haystack.length; i++) {
				if (_.isEqual(haystack[i], needle)) {
					return true;
				}
			}
		}
		return false;
	},

	clearSelect: function (objSelect) {
		if (objSelect != null && objSelect.options != null && objSelect.options.length > 0) {
			while (objSelect.options[0]) {
				objSelect.options.remove(0);
			}
		}
	},

	createElement(objOptions) {
		var objEl = null;
		if (objOptions != null && typeof objOptions == "object") {

			if (objOptions.tag != null) {
				objEl = document.createElement(objOptions.tag);
			}

			if (objOptions.attrs != null) {
				for (var attr in objOptions.attrs) {
					objEl.setAttribute(attr, objOptions.attrs[attr]);
				}
			}

			if (objOptions.innerHTML != null) {
				objEl.innerHTML = objOptions.innerHTML;
			}

			if (objOptions.children != null) {
				for (var i = 0; i < objOptions.children.length; i++) {
					var currChild = objOptions.children[i];
					var objChild = asg.util.createElement(currChild);
					if (objChild != null) {
						objEl.appendChild(objChild);
					}
				}
			}
		}
		return objEl;
	},

	createFromFragment: function (strHTMLFragment) {
		var strFragTag = strHTMLFragment.slice(
			strHTMLFragment.indexOf('<') + 1,
			strHTMLFragment.indexOf(' ')
		);
		if (strFragTag.indexOf('>') > 0) {
			strFragTag = strFragTag.slice(0,
				strFragTag.indexOf('>')
			);
		}

		var strElTag = 'div';
		switch (strFragTag) {
			case 'td':
			case 'th':
				{
					strElTag = 'tr';
					break;
				}

			case 'tr':
				{
					strElTag = 'tbody';
					break;
				}

			default:
				{
					break;
				}
		}


		var container = document.createElement(strElTag);
		container.innerHTML = strHTMLFragment;
		var objEl = container.firstElementChild;
		return objEl;
	},

	// Utility Date Functions Kept Here
	dt: {
		days: [
			{
				index: 0,
				ordinal: 1,
				name: "Monday",
				abbr: "Mon",
				a: "M"
			},
			{
				index: 1,
				ordinal: 2,
				name: "Tuesday",
				abbr: "Tue",
				a: "T"
			},
			{
				index: 2,
				ordinal: 3,
				name: "Wednesday",
				abbr: "Wed",
				a: "W"
			},
			{
				index: 3,
				ordinal: 4,
				name: "Thursday",
				abbr: "Thu",
				a: "T"
			},
			{
				index: 4,
				ordinal: 5,
				name: "Friday",
				abbr: "Fri",
				a: "F"
			},
			{
				index: 5,
				ordinal: 6,
				name: "Saturday",
				abbr: "Sat",
				a: "S"
			},
			{
				index: 6,
				ordinal: 7,
				name: "Sunday",
				abbr: "Sun",
				a: "S"
			}
		],

		getDay: function (index, useOrdinal) {
			if (index < 0 || index > 7) {
				return null; // GTFO!
			}

			let _dt = asg.util.dt;
			if (useOrdinal != true) {
				useOrdinal = false;
			}
			for (let i = 0; i < _dt.days.length; i++) {
				let _d = _dt.days[i];
				if (useOrdinal && (_d.ordinal == index)) {
					return _d;
				}
				if (!useOrdinal && (_d.index == index)) {
					return _d;
				}
			}
			return null;
		},

		getMonth: function (index, useOrdinal) {
			if (index < 0 || index > 12) {
				return null; // GTFO!
			}

			let _dt = asg.util.dt;
			if (useOrdinal != true) {
				useOrdinal = false;
			}
			for (let i = 0; i < _dt.months.length; i++) {
				let _m = _dt.months[i];
				if (useOrdinal && (_m.ordinal == index)) {
					return _m;
				}
				if (!useOrdinal && (_m.index == index)) {
					return _m;
				}
			}
			return null;
		},

		isLeapYear: function (intYear) {
			if (intYear % 400 == 0) {
				return true;
			}
			if (intYear % 100 == 0) {
				return false;
			}
			if (intYear % 4 == 0) {
				return true;
			}
			return false;
		},

		months: [
			{
				index: 0,
				ordinal: 1,
				days: 31,
				name: "January",
				abbr: "Jan",
				a: "J"
			},
			{
				index: 1,
				ordinal: 2,
				days: 28,
				name: "February",
				abbr: "Feb",
				a: "F"
			},
			{
				index: 2,
				ordinal: 3,
				days: 31,
				name: "March",
				abbr: "Mar",
				a: "M"
			},
			{
				index: 3,
				ordinal: 4,
				days: 30,
				name: "April",
				abbr: "Apr",
				a: "A"
			},
			{
				index: 4,
				ordinal: 5,
				days: 31,
				name: "May",
				abbr: "May",
				a: "M"
			},
			{
				index: 5,
				ordinal: 6,
				days: 30,
				name: "June",
				abbr: "Jun",
				a: "J"
			},
			{
				index: 6,
				ordinal: 7,
				days: 31,
				name: "July",
				abbr: "Jul",
				a: "J"
			},
			{
				index: 7,
				ordinal: 8,
				days: 31,
				name: "August",
				abbr: "Aug",
				a: "A"
			},
			{
				index: 8,
				ordinal: 9,
				days: 30,
				name: "September",
				abbr: "Sep",
				a: "S"
			},
			{
				index: 9,
				ordinal: 10,
				days: 31,
				name: "October",
				abbr: "Oct",
				a: "O"
			},
			{
				index: 10,
				ordinal: 11,
				days: 30,
				name: "November",
				abbr: "Nov",
				a: "N"
			},
			{
				index: 11,
				ordinal: 12,
				days: 31,
				name: "December",
				abbr: "Dec",
				a: "D"
			}
		],

		now: function () {
			return new Date();
		}
	},

	generateGUID: function () {
		var str1 = "GUID-" + (Math.random() * 10000000000);
		str1.replace('.', '');
		return str1;
	},

	getDialog: function (strDialogID) {
		var dialogs = asg.data.lists.site.modals;
		for (var i = 0; i < dialogs.length; i++) {
			var currDialog = dialogs[i];
			if (currDialog.id == strDialogID) {
				return currDialog;
			}
		}
		return null;
	},

	getRouteObject: function () {

		var strH = window.location.hash;
		if (strH.length < 3) {
			strH = "#!/"
			window.location.hash = strH;
		}

		var strU = strH.slice(2, strH.length);


		var currPage = asg.app.fn.getPageByRoute(strU);
		var arrCrumbs = asg.app.fn.getBreadCrumbs(currPage.id);

		var objRoute = {
			hash: strH,
			uri: strU,
			breadcrumbs: arrCrumbs,
			page: currPage
		};

		return objRoute;

	},

	getTemplate: function (strTemplateID) {
		try {
			return eval(strTemplateID);
		} catch (e) {
			alert('error');
		}
	},

	handleError: function (objError) {
		asg.ui.showMsg(objError.name, 'error', objError.name, objError.message);
	},



	parseHashFromURL: function (strURL) {
		var strHash = strURL.slice(strURL.indexOf('#') + 2, strURL.length);
		if (strHash.indexOf('?') >= 0) {
			strHash = strHash.slice(0, strHash.indexOf('?'));
		}
		return strHash;
	},

	removeClass: function (objEl, strClass) {
		var strClassList = objEl.getAttribute("class") || '';
		var arrClasses = strClassList.split(' ');
		for (var i = 0; i < arrClasses.length; i++) {
			if (arrClasses[i] == strClass) {
				arrClasses[i] = '';
			}
		}
		objEl.setAttribute('class', arrClasses.join(' '));
	},

	removeFromArray: function (haystack, needle) {
		var _retArray = [];
		if (haystack.constructor === Array) {
			for (var i = 0; i < haystack.length; i++) {
				if (!_.isEqual(haystack[i], needle)) {
					_retArray.push(haystack[i]);
				}
			}
		}
		return _retArray;
	},

	strReplace: function (strHaystack, arrNeedles) {
		if (arrNeedles != null) {
			for (var i = 1; i <= arrNeedles.length; i++) {
				var strNeedle = '%' + i + '%';
				var reNeedle = new RegExp(strNeedle, 'gi');
				strHaystack = strHaystack.replace(reNeedle, arrNeedles[i - 1]);
			}
		}
		return strHaystack;
	},

	toggleClass: function (objEl, strFrom, strTo) {
		var strClass = objEl.getAttribute("class") || '';
		var arrClasses = strClass.split(' ');
		for (var i = 0; i < arrClasses.length; i++) {
			if (arrClasses[i] == strFrom) {
				arrClasses[i] = strTo;
			}
		}
		objEl.setAttribute('class', arrClasses.join(' '));
	}
};

asg.u = asg.util;


// EOF
