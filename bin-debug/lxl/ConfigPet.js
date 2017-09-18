var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lxl3d;
(function (lxl3d) {
    var ConfigVideo = (function () {
        function ConfigVideo() {
        }
        return ConfigVideo;
    }());
    //动画前置路径
    ConfigVideo.MC_PATH = "resource/assets/mc/";
    ConfigVideo.SKIN_PATH = "resource/app_skins/";
    ConfigVideo.V3D_PATH = "resource/3d/";
    ConfigVideo.GRID_SIZE = 40;
    lxl3d.ConfigVideo = ConfigVideo;
    __reflect(ConfigVideo.prototype, "lxl3d.ConfigVideo");
})(lxl3d || (lxl3d = {}));
//# sourceMappingURL=ConfigPet.js.map