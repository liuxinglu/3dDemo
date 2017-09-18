var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var ViewData = (function () {
        function ViewData() {
            this.type = ""; //show normal
            this.gameIndex = 0;
            this.distance = 0;
        }
        return ViewData;
    }());
    app.ViewData = ViewData;
    __reflect(ViewData.prototype, "app.ViewData");
})(app || (app = {}));
//# sourceMappingURL=ViewData.js.map