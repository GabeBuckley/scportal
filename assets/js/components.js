/**** Custom JS Classes *****/


asg.HTMLComponent = class {
    constructor(objArgs) {
        this.init(objArgs);
        this.build();
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
        return asg.util.strReplace(this._template, [this.templateArgs()]);
    }

    template() {
        return '';
    }

    templateArgs() {
        return [];
    }

    build() {

        this._view = asg.util.createFromFragment(this.compile());
        this._target.appendChild(this._view);
    }


    ui() {
        return this._view;
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
//EOF
