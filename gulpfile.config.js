'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.dist = './dist';
        
        this.sources = './app';
        this.startScript = this.sources + "/app.js";

        this.typeScriptFiles = this.sources + '/**/*.ts';

        this.typings = './typings';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
        
        this.bowerComponents = this.sources + '/public/components';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;