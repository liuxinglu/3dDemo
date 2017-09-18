var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(context3d) {
        var _this = _super.call(this) || this;
        _this._lastDistance = 0;
        _this._context3d = context3d;
        return _this;
    }
    GameScene.prototype.onActivity = function () {
        var view = new egret3d.View3D(0, (this._context3d.height - this._context3d.width) / 2, this._context3d.width, this._context3d.width);
        // var view = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
        view.camera3D.lookAt(new egret3d.Vector3D(0, 500, -500), new egret3d.Vector3D(0, 0, 0));
        view.backColor = 0xff000000;
        this._context3d.addView3D(view);
        this.view = view;
        this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
        this.cameraCtl.lookAtObject.y = 100;
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 30;
        this.cameraCtl.rotationY = 180;
        var info = lxl3d.Tool.callJS("getInfoToken");
        if (info._userRole == "COORDINATOR") {
            this._context3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        }
        else {
            lxl3d.CDispatcher.getInstance().addListener(app.CustomEvent.V3D, this._updateView, this);
        }
        this._updateData();
        this.loaderSkyBox();
        this._context3d.start();
    };
    GameScene.prototype._updateData = function () {
        this._lastDistance = this.cameraCtl.distance;
        this._lastLookAtOffset = this.cameraCtl.lookAtOffset;
        this._lastLookAtPosition = this.cameraCtl.lookAtPosition;
        this._lastRotationX = this.cameraCtl.rotationX;
        this._lastRotationY = this.cameraCtl.rotationY;
        this._lastRotationZ = this.cameraCtl.rotationZ;
        app.V3dManager.getInstance().viewData.distance = this._lastDistance;
        app.V3dManager.getInstance().viewData.rotationX = this._lastRotationX;
        app.V3dManager.getInstance().viewData.rotationY = this._lastRotationY;
        app.V3dManager.getInstance().viewData.rotationZ = this._lastRotationZ;
        app.V3dManager.getInstance().viewData.lookAtOffset = this._lastLookAtOffset;
        app.V3dManager.getInstance().viewData.lookAtPosition = this._lastLookAtPosition;
    };
    GameScene.prototype.loaderSkyBox = function () {
        var info = lxl3d.Tool.callJS("getInfoToken");
        if (info._userRole == "COORDINATOR") {
            Qipan.viewData.type = "showFrist";
            Qipan.viewData.gameIndex = 8;
            Qipan.dataHandler.sendMessageToServer(Qipan.viewData);
        }
        lxl3d.Tool.callJS("loadGameComplete");
        this._queueLoad = new egret3d.QueueLoader();
        this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_FR.png");
        this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_BK.png");
        this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_LF.png");
        this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_RT.png");
        this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_UP.png");
        this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_DN.png");
        this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "1.jpg");
        this._queueLoad.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this._onComplete, this);
    };
    GameScene.prototype._updateView = function (e) {
        var data = e.data;
        this.cameraCtl.distance = data.distance;
        // this.cameraCtl.lookAtOffset = data.lookAtOffset;
        // this.cameraCtl.lookAtPosition = data.lookAtPosition;
        this.cameraCtl.rotationX = data.rotationX;
        this.cameraCtl.rotationY = data.rotationY;
        this.cameraCtl.rotationZ = data.rotationZ;
        this.cameraCtl.update();
    };
    GameScene.prototype._onComplete = function (e) {
        var loader = e.target;
        var fr = loader.getTexture("resource/3d/scene/skyBox/cloudy_noon_FR.png");
        var bk = loader.getTexture("resource/3d/scene/skyBox/cloudy_noon_BK.png");
        var lf = loader.getTexture("resource/3d/scene/skyBox/cloudy_noon_LF.png");
        var rt = loader.getTexture("resource/3d/scene/skyBox/cloudy_noon_RT.png");
        var up = loader.getTexture("resource/3d/scene/skyBox/cloudy_noon_UP.png");
        var dn = loader.getTexture("resource/3d/scene/skyBox/cloudy_noon_DN.png");
        var img = loader.getAsset("resource/3d/scene/skyBox/cloudy_noon_FR.png"); //resource/3d/timg.jpeg  resource/3d/1.jpg
        // let cubeTexture = egret3d.CubeTexture.createCubeTextureByImageTexture(fr, bk, lf, rt, up, dn);
        var cubeTexture = egret3d.CubeTexture.createCubeTexture(document.getElementById("fr"), document.getElementById("bk"), document.getElementById("lf"), document.getElementById("rt"), document.getElementById("up"), document.getElementById("dn"));
        var cube = new egret3d.CubeGeometry(2000, 2000, 2000);
        var mat = new egret3d.CubeTextureMaterial(cubeTexture);
        var mat2 = new egret3d.TextureMaterial(img);
        var sphere = new egret3d.SphereGeometry(200, 20, 20);
        var sky = new egret3d.Sky(cube, mat2, this.view.camera3D);
        sky.material.cullMode = egret3d.ContextConfig.FRONT;
        this.view.addChild3D(sky);
        // var mesh = new egret3d.Mesh(cube, mat);
        // mesh.material.cullMode = egret3d.ContextConfig.FRONT;
        // this.view.addChild3D(mesh);
        this.createGameScene();
    };
    GameScene.prototype.createGameScene = function () {
        // let texture = RES.getRes("3d/background.jpg");
        // console.log(texture)
        // this.view.backImage = texture;
        var geo = RES.getRes("3d/0_Model/Esm/Zhouyu.esm");
        var clip = RES.getRes("3d/0_Model/Eam/attack.eam");
        var idleClip = RES.getRes("3d/0_Model/Eam/idle.eam");
        var tex = RES.getRes("3d/0_Model/Texture/hero_01.png");
        clip.animationName = "attack";
        idleClip.animationName = "idle";
        var mesh = new egret3d.Mesh(geo);
        this.mesh = mesh;
        clip.isLoop = false;
        idleClip.isLoop = true;
        mesh.material.diffuseTexture = tex;
        mesh.material.ambientColor = 0xb4b4b4;
        mesh.material.gloss = 10;
        mesh.material.specularLevel = 0.5;
        var skeletonController = mesh.animation.skeletonAnimationController;
        skeletonController.addSkeletonAnimationClip(clip);
        skeletonController.addSkeletonAnimationClip(idleClip);
        skeletonController.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.onAnimationComplete, this);
        skeletonController.addEventListener(egret3d.AnimationEvent3D.CYCLE, this.onAnimationCycle, this);
        this.view.addChild3D(mesh);
        mesh.animation.play(idleClip.animationName);
        // this.lightGroup = new egret3d.LightGroup();
        // var dirLight = new egret3d.DirectLight(new egret3d.Vector3D(1, -1, 0))
        // this.lightGroup.addLight(dirLight);
        // mesh.lightGroup = this.lightGroup;
        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    };
    GameScene.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case egret3d.KeyCode.Key_1:
                this.mesh.animation.play("attack");
                break;
        }
    };
    GameScene.prototype.onAnimationComplete = function (e) {
        console.log("onAnimationComplete");
        this.mesh.animation.play("idle");
    };
    GameScene.prototype.onAnimationCycle = function (e) {
        console.log("播放完成一个循环");
    };
    GameScene.prototype.update = function (e) {
        this.cameraCtl.update();
        var flag = 0.01;
        // if((Math.abs(this.cameraCtl.distance - this._lastDistance) >= flag) || 
        //     (Math.abs(this.cameraCtl.rotationX - this._lastRotationX) >= flag) || 
        //     (Math.abs(this.cameraCtl.rotationY - this._lastRotationY) >= flag) || 
        //     (Math.abs(this.cameraCtl.rotationZ - this._lastRotationZ) >= flag)) {
        //     this._updateData();
        //     app.V3dManager.getInstance().dataHandler.move3D(app.V3dManager.getInstance().viewData);
        // }
        // egret.log("distance:" + this.cameraCtl.distance + " lookAtOffset:" + this.cameraCtl.lookAtOffset + " lookAtPosition:" + this.cameraCtl.lookAtPosition + " rotationX:" + this.cameraCtl.rotationX + " rotationY:" + this.cameraCtl.rotationY + " rotationZ:" + this.cameraCtl.rotationZ);
    };
    return GameScene;
}(lxl3d.ui.CLayer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map