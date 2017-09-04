module lxl3d.ui {
	export class CGroup extends eui.Group{
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
			this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.dispose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
			this.funOnActivity = this.onActivity;
			this.funDispose = this.dispose;
		}

		delegate:any;

		funOnActivity:Function;
		funDispose:Function;
		hasActivi:boolean = false;
		hasDispos:boolean = false;

		onActivity():void {
			for(var i = 0; i < this.numChildren; i++) {
				this.doAcivity((this.getChildAt(i) as CComponent));
			}
			this.hasActivi = true;
		}

		private doAcivity(com:CComponent) {
			if(com.hasOwnProperty("funOnActivity") && com.hasActivi == false)
				com["funOnActivity"]();
			if(com.numChildren == 0) {
				return;
			} else {
				for(var i = 0; i < com.numChildren; i++) {
					this.doAcivity((com.getChildAt(i) as CComponent));
				}
			}
		}

		private _clickHandler(e:egret.TouchEvent) {
			let ee = lxl3d.Tool.copyObject(e);
			this.dispatchEvent(new lxl3d.CEvent(lxl3d.CEvent.CLICK_VIDEO, ee));
		}

		dispose():void {
           for(var i = 0; i < this.numChildren; i++) {
				this.doDispos((this.getChildAt(i) as CComponent));
			}
			this.parent.removeChild(this);
			this.hasDispos = true;
		}

		private doDispos(com:CComponent) {
			if(com.hasOwnProperty("funDispose") && com.hasDispos == false)
				com["funDispose"]();
			if(com.numChildren == 0) {
				return;
			} else {
				for(var i = 0; i < com.numChildren; i++) {
					this.doDispos((com.getChildAt(i) as CComponent));
				}
			}
		}

		pop(com:lxl3d.CComponent):void {
			
			com.addEventListener(lxl3d.CEvent.LOAD_SKIN_COMPLETE_VIDEO, ()=>{
				com.anchorOffsetX = com.width / 2;
				com.anchorOffsetY = com.height / 2;
				com.x = this.stage.stageWidth / 2;
				com.y = this.stage.stageHeight / 2;
				this.addChild(com);
			}, this);
			this.addChild(com);
		}

		removeChildByName(name:string):void {
			this.removeChild(this.getChildByName(name));
		}
	}
}