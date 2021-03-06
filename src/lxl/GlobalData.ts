
module lxl3d {
	export class GlobalData {
		public constructor() {
			this.resManager = new ResManager();
		}

		public dataManager:DataManager;
		public resManager:ResManager;
		public root:any;

		public connectServer():void {
			this.dataManager = new DataManager();
			this.dataManager.addListener(CEvent.CONNECT_SERVER_VIDEO, this.connectServerComplete, this);
		}

		private connectServerComplete(e:CEvent):void {
			
		}

		private static _instance:GlobalData;
		public static getInstance():GlobalData {
			if(this._instance == null)
				this._instance = new GlobalData();
			return this._instance;
		}
	}
}