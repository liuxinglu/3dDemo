module lxl3d {
    export class ApplicationVideo extends ui.CLayer {
        public loading;
        public root:ui.CLayer;
        public shape:egret.Shape;
        private _logo:eui.Image;
        public preURL:string;

        public constructor() {
            super();
            
        }

        onActivity():void {
            super.onActivity();
            this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
            this.root = new ui.CLayer();
            this.shape = new egret.Shape();
            this._logo = new eui.Image();
            let assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

            this.addEventListener(egret.Event.RESIZE, this._resizeHandler, this);
            
            ResV3d.addListener(CEvent.LOAD_CONFIG_COMPLETE_VIDEO, this._conConfigComplete, this);
            this.preURL = lxl3d.Tool.callJS("getURL");
            ResV3d.loadConfig(this.preURL +"resource/default.res.json", this.preURL + "resource/");
        }

        private _conConfigComplete(event:RES.ResourceEvent):void {
            ResV3d.removeListener(CEvent.LOAD_CONFIG_COMPLETE_VIDEO, this._conConfigComplete, this);
            
            //加在皮肤主题配置文件，可以手动覆盖这个文件，替换默认皮肤
            let theme = new eui.Theme(this.preURL + "resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
            ResV3d.addListener(CEvent.LOAD_GROUP_COMPLETE_VIDEO, this._onResourceLoadComplete, this);
            ResV3d.loadGroup("preload");
        }

        private _resizeHandler(event:egret.Event):void {
            this.shape.graphics.clear();
            this.shape.graphics.beginFill(0x996600);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
        }

        private isThemeLoadEnd:boolean = false;

        private onThemeLoadComplete(e:eui.UIEvent):void {
            this.isThemeLoadEnd = true;
            this.createScene();
        }

        private isResourceLoadEnd:boolean = false;
        private _onResourceLoadComplete(e:CEvent):void {
            if("preload" == e.data.groupName) {
                this.loading = new LoadingUI();
                this.loading.width = this.width;
                this.loading.height = this.height;
                this.loading.createView();
                this.stage.addChild(this.loading);
                ResV3d.addListener(CEvent.LOAD_PROGRESS_VIDEO, this._onResourceProgress, this);
                ResV3d.loadGroup("mainVideo");
            } else {
                egret.Tween.get( this.loading)
                    .to( {alpha: 0}, 1000)
                    .call(this.resourceComplete, this);    
            }
        }

        private resourceComplete():void {
            this.stage.removeChild(this.loading);
            this.isResourceLoadEnd = true;
            
            this.createScene();
            ResV3d.removeListener(CEvent.LOAD_GROUP_COMPLETE_VIDEO, this._onResourceLoadComplete, this);
        }

        private _onResourceProgress(e:CEvent):void {
            this.loading.setProgress(e.data.itemsLoaded, e.data.itemsTotal);
        }


        private createScene():void {
            if(this.isThemeLoadEnd && this.isResourceLoadEnd){
                this.startVideo();
                
                this._logo.source = "img_logo_png";
                this._logo.x = 10;
                this._logo.y = 10;
                this.stage.addChild(this._logo);
                if(egret.Capabilities.runtimeType == "web")
                    document.onkeydown = this.keyDownHandler;
                this.shape.graphics.beginFill(0x996600);
                this.shape.graphics.drawRect(0, 0, this.width, this.height);
                this.shape.graphics.endFill();
                this.shape.alpha = 0;
                this.shape.visible = false;
                this.stage.addChild(this.shape);
                Toast.getInstance().init(this, ResV3d.getRes("full1_png"));
                lxl3d.CDispatcher.getInstance().addListener(lxl3d.CEvent.EYE_CHANGE_VIDEO, this.changeModel, this);
            }
        }

        private keyDownHandler(ev:KeyboardEvent):any {
            switch (ev.keyCode) {
                case 32:
                    CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.SPACE_VIDEO, "space"));
                break;
                case 37:
                    CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.LEFT_VIDEO, "left"));
                break;
                case 38:
                    CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.UP_VIDEO, "up"));
                break;
                case 39:
                    CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.RIGHT_VIDEO, "right"));
                break;
                case 40:
                    CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.DOWN_VIDEO, "down"));
                break;
            }
        }

        private changeModel(e:CEvent):void {
            if(this.shape.visible == false) {
                this.shape.alpha = 0;
                this.shape.visible = true;
                egret.Tween.get(this.shape)
                    .to( { alpha: 0.35 }, 1000, egret.Ease.quadOut  ).call(()=>{
                        CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.PROTECTE_EYE_VIDEO, 1));
				});
            } else {
                egret.Tween.get(this.shape)
                    .to( { alpha: 0 }, 1000, egret.Ease.quintIn  ).call( ()=>{
                        this.shape.visible = false;
                        CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.PROTECTE_EYE_VIDEO, 0));
				} );
            }
        }

        protected startVideo():void {
                this.root.delegate = this;
                this.stage.addChild(this.root);
        }

        
    }
    
}