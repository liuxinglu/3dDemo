module lxl3d.ui {
	export class CLayer extends eui.UILayer{
		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onActivity, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
			this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
			this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.dispose, this);
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

		pop(com:lxl3d.CComponent, ani:boolean = false):void {
			
			com.addEventListener(lxl3d.CEvent.LOAD_SKIN_COMPLETE_VIDEO, ()=>{
				com.anchorOffsetX = com.width / 2;
				com.anchorOffsetY = com.height / 2;
				com.x = this.stage.stageWidth / 2;
				if(ani == false) {
					com.y = this.stage.stageHeight / 2;
				} else {
					com.y = 0;
					com.alpha = 0;
				}
				this.addChild(com);
				if(ani == true) {
						egret.Tween.get(com)
						.to({y : this.stage.stageHeight / 2, alpha : 1}, 200)
						.to({y : this.stage.stageHeight / 2 - 30}, 100)
						.to({y : this.stage.stageHeight / 2 + 10}, 100)
						.to({y : this.stage.stageHeight / 2}, 100);
				}
			}, this);
			this.addChild(com);
		}

		removeChildByName(name:string):void {
			this.removeChild(this.getChildByName(name));
		}
	}
}