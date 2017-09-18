var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lxl3d;
(function (lxl3d) {
    var ApplicationVideo = (function (_super) {
        __extends(ApplicationVideo, _super);
        function ApplicationVideo() {
            var _this = _super.call(this) || this;
            _this.isThemeLoadEnd = false;
            _this.isResourceLoadEnd = false;
            return _this;
        }
        ApplicationVideo.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
            this.root = new lxl3d.ui.CLayer();
            this.shape = new egret.Shape();
            this._logo = new eui.Image();
            var assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            this.addEventListener(egret.Event.RESIZE, this._resizeHandler, this);
            ResV3d.addListener(lxl3d.CEvent.LOAD_CONFIG_COMPLETE_VIDEO, this._conConfigComplete, this);
            this.preURL = lxl3d.Tool.callJS("getURL");
            ResV3d.loadConfig(this.preURL + "resource/default.res.json", this.preURL + "resource/");
        };
        ApplicationVideo.prototype._conConfigComplete = function (event) {
            ResV3d.removeListener(lxl3d.CEvent.LOAD_CONFIG_COMPLETE_VIDEO, this._conConfigComplete, this);
            //加在皮肤主题配置文件，可以手动覆盖这个文件，替换默认皮肤
            var theme = new eui.Theme(this.preURL + "resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            ResV3d.addListener(lxl3d.CEvent.LOAD_GROUP_COMPLETE_VIDEO, this._onResourceLoadComplete, this);
            ResV3d.loadGroup("preload");
        };
        ApplicationVideo.prototype._resizeHandler = function (event) {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill(0x996600);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
        };
        ApplicationVideo.prototype.onThemeLoadComplete = function (e) {
            this.isThemeLoadEnd = true;
            this.createScene();
        };
        ApplicationVideo.prototype._onResourceLoadComplete = function (e) {
            if ("preload" == e.data.groupName) {
                this.loading = new lxl3d.LoadingUI();
                this.loading.width = this.width;
                this.loading.height = this.height;
                this.loading.createView();
                this.stage.addChild(this.loading);
                ResV3d.addListener(lxl3d.CEvent.LOAD_PROGRESS_VIDEO, this._onResourceProgress, this);
                ResV3d.loadGroup("mainVideo");
            }
            else {
                egret.Tween.get(this.loading)
                    .to({ alpha: 0 }, 1000)
                    .call(this.resourceComplete, this);
            }
        };
        ApplicationVideo.prototype.resourceComplete = function () {
            this.stage.removeChild(this.loading);
            this.isResourceLoadEnd = true;
            this.createScene();
            ResV3d.removeListener(lxl3d.CEvent.LOAD_GROUP_COMPLETE_VIDEO, this._onResourceLoadComplete, this);
        };
        ApplicationVideo.prototype._onResourceProgress = function (e) {
            this.loading.setProgress(e.data.itemsLoaded, e.data.itemsTotal);
        };
        ApplicationVideo.prototype.createScene = function () {
            if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
                this.startVideo();
                this._logo.source = "img_logo_png";
                this._logo.x = 10;
                this._logo.y = 10;
                this.stage.addChild(this._logo);
                if (egret.Capabilities.runtimeType == "web")
                    document.onkeydown = this.keyDownHandler;
                this.shape.graphics.beginFill(0x996600);
                this.shape.graphics.drawRect(0, 0, this.width, this.height);
                this.shape.graphics.endFill();
                this.shape.alpha = 0;
                this.shape.visible = false;
                this.stage.addChild(this.shape);
                lxl3d.Toast.getInstance().init(this, ResV3d.getRes("full1_png"));
                lxl3d.CDispatcher.getInstance().addListener(lxl3d.CEvent.EYE_CHANGE_VIDEO, this.changeModel, this);
            }
        };
        ApplicationVideo.prototype.keyDownHandler = function (ev) {
            switch (ev.keyCode) {
                case 32:
                    lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.SPACE_VIDEO, "space"));
                    break;
                case 37:
                    lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.LEFT_VIDEO, "left"));
                    break;
                case 38:
                    lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.UP_VIDEO, "up"));
                    break;
                case 39:
                    lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.RIGHT_VIDEO, "right"));
                    break;
                case 40:
                    lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.DOWN_VIDEO, "down"));
                    break;
            }
        };
        ApplicationVideo.prototype.changeModel = function (e) {
            var _this = this;
            if (this.shape.visible == false) {
                this.shape.alpha = 0;
                this.shape.visible = true;
                egret.Tween.get(this.shape)
                    .to({ alpha: 0.35 }, 1000, egret.Ease.quadOut).call(function () {
                    lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.PROTECTE_EYE_VIDEO, 1));
                });
            }
            else {
                egret.Tween.get(this.shape)
                    .to({ alpha: 0 }, 1000, egret.Ease.quintIn).call(function () {
                    _this.shape.visible = false;
                    lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.PROTECTE_EYE_VIDEO, 0));
                });
            }
        };
        ApplicationVideo.prototype.startVideo = function () {
            this.root.delegate = this;
            this.stage.addChild(this.root);
        };
        return ApplicationVideo;
    }(lxl3d.ui.CLayer));
    lxl3d.ApplicationVideo = ApplicationVideo;
    __reflect(ApplicationVideo.prototype, "lxl3d.ApplicationVideo");
})(lxl3d || (lxl3d = {}));
//# sourceMappingURL=ApplicationPet.js.map