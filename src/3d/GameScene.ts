/**
 *
 * @author 
 *
 */
class GameScene  extends lxl3d.ui.CLayer{


    // View3D操作对象
    protected view: egret3d.View3D;

    protected lightGroup: egret3d.LightGroup;

    /**
    * look at 摄像机控制器 。</p>
    * 指定摄像机看向的目标对象。</p>
    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
    */
    private cameraCtl: egret3d.LookAtController;

    private mesh: egret3d.Mesh;
    private _queueLoad:egret3d.QueueLoader;
     private _lastDistance:number = 0;
    private _lastLookAtOffset:egret3d.Vector3D;
    private _lastLookAtPosition:egret3d.Vector3D;
    private _lastRotationX:number;
    private _lastRotationY:number;
    private _lastRotationZ:number;
    private _context3d:egret3d.Egret3DCanvas;

    constructor(context3d: egret3d.Egret3DCanvas) {
        super();
        this._context3d = context3d;
    }

    onActivity():void {
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
        let info = lxl3d.Tool.callJS("getInfoToken");
        if (info._userRole == "COORDINATOR") {
            this._context3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        } else {
            lxl3d.CDispatcher.getInstance().addListener(app.CustomEvent.V3D, this._updateView, this);
        }
        this._context3d.start();
        this._updateData();
        this.loaderSkyBox();
    }

    private _updateData() {
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
    }

    public loaderSkyBox() {
        let info = lxl3d.Tool.callJS("getInfoToken");
        if (info._userRole == "COORDINATOR") {
            Qipan.viewData.type = "showFrist";
            Qipan.viewData.gameIndex = 8;
            Qipan.dataHandler.sendMessageToServer(Qipan.viewData);
        }
        lxl3d.Tool.callJS("loadGameComplete");
        this.createGameScene();
        // this._queueLoad = new egret3d.QueueLoader();
        // this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_FR.png");
        // this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_BK.png");
        // this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_LF.png");
        // this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_RT.png");
        // this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_UP.png");
        // this._queueLoad.load(lxl3d.Tool.callJS("getURL") + lxl3d.ConfigVideo.V3D_PATH + "scene/skyBox/cloudy_noon_DN.png");
        // this._queueLoad.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this._onComplete, this);
    }

    private _updateView(e:lxl3d.CEvent) {
        let data:app.ViewData = e.data;
        this.cameraCtl.distance = data.distance;
        // this.cameraCtl.lookAtOffset = data.lookAtOffset;
        // this.cameraCtl.lookAtPosition = data.lookAtPosition;
        this.cameraCtl.rotationX = data.rotationX;
        this.cameraCtl.rotationY = data.rotationY;
        this.cameraCtl.rotationZ = data.rotationZ;
        this.cameraCtl.update();
    }

    private _onComplete(e:egret3d.LoaderEvent3D) {
        let loader:egret3d.QueueLoader = e.target;
        let fr:egret3d.ITexture = loader.getAsset("resource/3d/scene/skyBox/cloudy_noon_FR.png");
        let bk:egret3d.ITexture = loader.getAsset("resource/3d/scene/skyBox/cloudy_noon_BK.png");
        let lf:egret3d.ITexture = loader.getAsset("resource/3d/scene/skyBox/cloudy_noon_LF.png");
        let rt:egret3d.ITexture = loader.getAsset("resource/3d/scene/skyBox/cloudy_noon_RT.png");
        let up:egret3d.ITexture = loader.getAsset("resource/3d/scene/skyBox/cloudy_noon_UP.png");
        let dn:egret3d.ITexture = loader.getAsset("resource/3d/scene/skyBox/cloudy_noon_DN.png");
        let cubeTexture = egret3d.CubeTexture.createCubeTextureByImageTexture(fr, bk, lf, rt, up, dn);
        // // let cube = new egret3d.CubeGeometry(2000, 2000, 1000);
        let sphere = new egret3d.SphereGeometry(200, 20, 20);
        let mat = new egret3d.CubeTextureMaterial(cubeTexture);
        let sky = new egret3d.Mesh(sphere, mat);
        // //-----
        // let sky = new egret3d.Sky(sphere, mat, this.view.camera3D);
        sky.material.cullMode = egret3d.ContextConfig.FRONT;
        this.view.addChild3D(sky);
        // let img = loader.getAsset("resource/3d/scene/skyBox/cloudy_noon_UP.png");
        // let mat2 = new egret3d.TextureMaterial(img);
        // var mesh = new egret3d.Mesh(sphere, mat);
        // mesh.material.cullMode = egret3d.ContextConfig.FRONT;
        // this.view.addChild3D(mesh);
        this.createGameScene();
    }

    public createGameScene() {
        // let texture = RES.getRes("3d/background.jpg");
        // console.log(texture)
        // this.view.backImage = texture;


        var geo: egret3d.Geometry = RES.getRes("3d/0_Model/Esm/Zhouyu.esm");
        var clip: egret3d.SkeletonAnimationClip = RES.getRes("3d/0_Model/Eam/attack.eam");
        var idleClip: egret3d.SkeletonAnimationClip = RES.getRes("3d/0_Model/Eam/idle.eam");
        var tex: egret3d.ITexture = RES.getRes("3d/0_Model/Texture/hero_01.png");

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

        let skeletonController = mesh.animation.skeletonAnimationController;

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
    }

    protected onKeyDown(e: egret3d.KeyEvent3D) {
        switch (e.keyCode) {
            case egret3d.KeyCode.Key_1:
                this.mesh.animation.play("attack");
                break;
        }
    }

    protected onAnimationComplete(e: egret3d.LoaderEvent3D) {
        console.log("onAnimationComplete");
        this.mesh.animation.play("idle");
    }

    protected onAnimationCycle(e: egret3d.LoaderEvent3D) {
        console.log("播放完成一个循环");
    }

   
    protected update(e: egret3d.Event3D) {
        this.cameraCtl.update();
        let flag = 0.01;
        if((Math.abs(this.cameraCtl.distance - this._lastDistance) >= flag) || 
            (Math.abs(this.cameraCtl.rotationX - this._lastRotationX) >= flag) || 
            (Math.abs(this.cameraCtl.rotationY - this._lastRotationY) >= flag) || 
            (Math.abs(this.cameraCtl.rotationZ - this._lastRotationZ) >= flag)) {
            this._updateData();
            app.V3dManager.getInstance().dataHandler.move3D(app.V3dManager.getInstance().viewData);
        }
        // egret.log("distance:" + this.cameraCtl.distance + " lookAtOffset:" + this.cameraCtl.lookAtOffset + " lookAtPosition:" + this.cameraCtl.lookAtPosition + " rotationX:" + this.cameraCtl.rotationX + " rotationY:" + this.cameraCtl.rotationY + " rotationZ:" + this.cameraCtl.rotationZ);
    }
}
