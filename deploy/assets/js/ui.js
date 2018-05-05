asg.ui = {
    attachErrorMsg: function (objEl, strMsg) {
        var msg = document.createElement('div');
        msg.className = "field_error_msg";
        msg.innerHTML = strMsg;
        if (objEl != null) {
            var parEl = objEl.parentElement;
            parEl.appendChild(msg);
            asg.ui.setModalHeight(true);
        }

    },

    closeDialog: function () {
        document.getElementById('modal_body_content').innerHTML = "";
        document.getElementById('modal_button_content').innerHTML = "";
        document.getElementById('modal_header_text').innerHTML = "";
        $('#modal_dialog').hide(400, 'swing', function () {
            asg.ui.hideDialogScreen();
        });
    },

    hideDialogScreen: function () {
        $("#dialog_screen").hide();
    },

    setDialogDefaultAction: function () {
        var modal = document.getElementById('modal_dialog');
        var buttonBar = document.getElementById('modal_button_content');
        if (buttonBar.children.length > 0) {
            var button = buttonBar.lastElementChild;
            modal.onkeydown = function (evt) {
                evt = evt || window.event;
                if (evt.keyCode == 13) {
                    // Enter key pressed
                    button.click();
                }
            }
        }
    },

    setModalButtons: function (arrButtons) {
        var buttonBar = document.getElementById('modal_button_content');
        for (var i = 0; i < arrButtons.length; i++) {
            var currButton = arrButtons[i];
            var objButton = document.createElement('button');

            var strClass = 'sg-Btn sg-Btn--' + currButton.class;
            objButton.className = strClass;
            objButton.innerHTML = currButton.label;
            objButton.onclick = eval(currButton.handler);

            buttonBar.appendChild(objButton);
        }
    },

    setModalContent: function (objTemplate, objArgs) {
        var objContainer = document.getElementById('modal_body_content');
        objContainer.innerHTML = objTemplate;
    },

    setModalHeight: function (blVisible) {
        var objContainer = document.getElementById('modal_body_content');
        var buttonBar = document.getElementById('modal_body_footer');
        var objTitle = document.getElementById('modal_body_header');

        var objDialog = document.getElementById('modal_dialog');

        objDialog.style.display = "block";
        //debugger;
        var totalHeight = objContainer.clientHeight +
            buttonBar.clientHeight +
            objTitle.clientHeight;
        if (blVisible != true) {
            objDialog.style.display = "none";
        }
        objDialog.style.height = totalHeight + "px";
    },

    setModalTitle: function (strTitle) {
        var objTitle = document.getElementById('modal_header_text');
        objTitle.innerHTML = strTitle;
    },

    showDialog: function (strDialogId, objArgs) {
        asg.ui.closeDialog();
        var objDialog = asg.util.getDialog(strDialogId);
        if (objDialog != null) {
            asg.ui.setModalTitle(objDialog.title);
            var objDialogContent = eval(objDialog.template)
            var strTemplateHTML = objDialogContent.content;
            asg.ui.setModalContent(strTemplateHTML);

            if (objDialogContent.buttons != null && objDialogContent.buttons.length > 0) {
                asg.ui.setModalButtons(objDialogContent.buttons);
            }
        }

        asg.ui.setDialogDefaultAction();

        var width = 200;
        var height = 200;

        if (objArgs != null) {


            if (objArgs.size != null) {
                switch (objArgs.size) {
                    case "large":
                        {
                            width = 800;
                            height = 600;
                            break;
                        }
                    case "medium":
                        {
                            width = 600;
                            height = 480;
                            break;
                        }
                    case "small":
                        {
                            width = 400;
                            height = 300;
                            break;
                        }
                    default:
                        {
                            if (objArgs.size.width != null) {
                                width = objArgs.size.width;
                            }
                            if (objArgs.size.height != null) {
                                height = objArgs.size.height;
                            }
                            break;
                        }

                }
            }
        }

        var top = Math.round((document.body.clientHeight - height) / 2);
        if (top <= 5) {
            top = 5;
        }

        var left = Math.round((document.body.clientWidth - width) / 2);
        if (left <= 0) {
            left = 0;
        }

        var dialog = document.getElementById('modal_dialog');
        dialog.setAttribute(
            "style",
            "width:" + width + "px;" +
            "heightL auto;" +
            "top:" + top + "px;" +
            "left:" + left + "px;"
        );
        asg.ui.setModalHeight();

        asg.ui.showDialogScreen();

        $('#modal_dialog').show(400, 'swing', function () {
            //
        });
    },

    showDialogScreen: function () {
        $("#dialog_screen").show();
    },

    showMsg: function (strMsgID, strMsgType, strMsgTitle, strMsgText) {
        // strMsgType = ['dark', 'error', 'highlight', 'light', neutral', 'primary', 'secondary' ]
        strClass = 'sg-Box sg-Box--' + strMsgType;
        strID = 'browser_message_' + strMsgID;

        var objMsgDiv = document.createElement('div');
        objMsgDiv.setAttribute('class', strClass);
        objMsgDiv.setAttribute('id', strID);
        objMsgDiv.setAttribute('title', 'Click to close');

        var objMsgWrap = document.createElement('div');
        objMsgWrap.setAttribute('class', 'default rte');

        if (strMsgTitle != null && strMsgTitle.length > 0) {
            var objMsgTitle = document.createElement('h3');
            objMsgTitle.innerHTML = strMsgTitle;
            objMsgWrap.appendChild(objMsgTitle);
        }

        var objMsgBody = document.createElement('p');
        objMsgBody.innerHTML = strMsgText;
        objMsgWrap.appendChild(objMsgBody);


        objMsgDiv.appendChild(objMsgWrap);

        var objMsgContainer = document.getElementById('browser-messages');
        if (objMsgContainer != null) {
            objMsgContainer = objMsgContainer.firstElementChild.firstElementChild.firstElementChild;
            objMsgContainer.appendChild(objMsgDiv);
        }

        $(objMsgContainer).click(function () {
            $(objMsgDiv).hide(400, 'swing', function () {
                objMsgDiv.remove();
            });
        });
    }
};
