var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var V3dManager = (function () {
        function V3dManager() {
            this.viewData = new app.ViewData();
            this.dataHandler = new app.DataHandler();
        }
        V3dManager.getInstance = function () {
            if (this._qipan == null)
                this._qipan = new V3dManager();
            // lxl3d.Tool.callJS("getURL");
            return this._qipan;
        };
        return V3dManager;
    }());
    app.V3dManager = V3dManager;
    __reflect(V3dManager.prototype, "app.V3dManager");
})(app || (app = {}));
//# sourceMappingURL=V3dManager.js.map