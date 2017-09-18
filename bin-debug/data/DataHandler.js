var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var DataHandler = (function () {
        function DataHandler() {
        }
        DataHandler.prototype.sendMessageToServer = function (vd) {
            var tempvd = lxl3d.Tool.copyObject(vd);
            var o = { action: 'publicMessage', data: tempvd };
            lxl3d.Tool.callJS("sendMsg", o);
        };
        DataHandler.prototype.move3D = function (d) {
            var obj = { type: '3dMove', data: d };
            this.sendMessageToServer(obj);
        };
        DataHandler.prototype._get3DParam = function (data) {
            lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(app.CustomEvent.V3D, data));
        };
        DataHandler.prototype.getMessageFromServer = function (data) {
            lxl3d.logs.log("getMessageFromServer " + data);
            switch (data.type) {
                case "3dMove":
                    this._get3DParam(data.data);
                    break;
            }
        };
        DataHandler.prototype.setStudentsFromServer = function (data) {
            lxl3d.logs.log("students:" + data);
            lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.GET_STUDENTS_FROM_SERVER_VIDEO, data));
        };
        DataHandler.prototype.setTeacherFromServer = function (data) {
            lxl3d.logs.log("teacher:" + data);
            lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.GET_TEACHER_FROM_SERVER_VIDEO, data));
        };
        DataHandler.prototype.getWordsFromServer = function () {
        };
        return DataHandler;
    }());
    app.DataHandler = DataHandler;
    __reflect(DataHandler.prototype, "app.DataHandler");
})(app || (app = {}));
//# sourceMappingURL=DataHandler.js.map