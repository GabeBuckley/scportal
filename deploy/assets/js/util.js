asg.util = {

	addClass: function (objEl, strClass) {
		var strClassList = objEl.getAttribute("class") || '';
		var arrClasses = strClassList.split(' ');
		arrClasses.push(strClass);
		objEl.setAttribute('class', arrClasses.join(' '));
	},

	AppError: function (name, message) {
		this.name = name;
		this.message = message;
		var _this = this;
		this.toString = function () {
			return _this.name + ": " + this.message;
		}
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