module app {
	export class V3dManager {
		public constructor() {
		}

		viewData:ViewData = new ViewData();
		dataHandler:DataHandler = new DataHandler();

		private static _qipan:V3dManager;
		public static getInstance():V3dManager {
			if(this._qipan == null)
				this._qipan = new V3dManager();
			// lxl3d.Tool.callJS("getURL");
			return this._qipan;
		}
	}
}