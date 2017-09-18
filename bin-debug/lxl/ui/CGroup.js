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
    var ui;
    (function (ui) {
        var CGroup = (function (_super) {
            __extends(CGroup, _super);
            function CGroup() {
                var _this = _super.call(this) || this;
                _this.hasActivi = false;
                _this.hasDispos = false;
                _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onActivity, _this);
                _this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, _this.dispose, _this);
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this._clickHandler, _this);
                _this.funOnActivity = _this.onActivity;
                _this.funDispose = _this.dispose;
                return _this;
            }
            CGroup.prototype.onActivity = function () {
                for (var i = 0; i < this.numChildren; i++) {
                    this.doAcivity(this.getChildAt(i));
                }
                this.hasActivi = true;
            };
            CGroup.prototype.doAcivity = function (com) {
                if (com.hasOwnProperty("funOnActivity") && com.hasActivi == false)
                    com["funOnActivity"]();
                if (com.numChildren == 0) {
                    return;
                }
                else {
                    for (var i = 0; i < com.numChildren; i++) {
                        this.doAcivity(com.getChildAt(i));
                    }
                }
            };
            CGroup.prototype._clickHandler = function (e) {
                var ee = lxl3d.Tool.copyObject(e);
                this.dispatchEvent(new lxl3d.CEvent(lxl3d.CEvent.CLICK_VIDEO, ee));
            };
            CGroup.prototype.dispose = function () {
                for (var i = 0; i < this.numChildren; i++) {
                    this.doDispos(this.getChildAt(i));
                }
                this.parent.removeChild(this);
                this.hasDispos = true;
            };
            CGroup.prototype.doDispos = function (com) {
                if (com.hasOwnProperty("funDispose") && com.hasDispos == false)
                    com["funDispose"]();
                if (com.numChildren == 0) {
                    return;
                }
                else {
                    for (var i = 0; i < com.numChildren; i++) {
                        this.doDispos(com.getChildAt(i));
                    }
                }
            };
            CGroup.prototype.pop = function (com) {
                var _this = this;
                com.addEventListener(lxl3d.CEvent.LOAD_SKIN_COMPLETE_VIDEO, function () {
                    com.anchorOffsetX = com.width / 2;
                    com.anchorOffsetY = com.height / 2;
                    com.x = _this.stage.stageWidth / 2;
                    com.y = _this.stage.stageHeight / 2;
                    _this.addChild(com);
                }, this);
                this.addChild(com);
            };
            CGroup.prototype.removeChildByName = function (name) {
                this.removeChild(this.getChildByName(name));
            };
            return CGroup;
        }(eui.Group));
        ui.CGroup = CGroup;
        __reflect(CGroup.prototype, "lxl3d.ui.CGroup");
    })(ui = lxl3d.ui || (lxl3d.ui = {}));
})(lxl3d || (lxl3d = {}));
//# sourceMappingURL=CGroup.js.map