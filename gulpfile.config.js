'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.dist = './dist';

        this.sources = 'app';
        this.publicRoot = this.sources + '/public';
        this.startScript = this.sources + "/app.js";

        this.backendTypeScriptFiles = [this.sources + '/**/*.ts', '!' + this.publicRoot];
        this.frontendTypeScriptFiles = this.publicRoot + '/**/*.ts';

        this.typings = './typings';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';

        this.bowerComponents = this.sources + '/public/components';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;