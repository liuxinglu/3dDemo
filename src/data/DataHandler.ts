module app {
	export class DataHandler{
		public constructor() {
		}

		public sendMessageToServer(vd:Object) {
			let tempvd = lxl3d.Tool.copyObject(vd);
			let o:Object = {action:'publicMessage', data:tempvd};
			lxl3d.Tool.callJS("sendMsg", o);
		}

		public move3D(d:ViewData) {
			let obj = {type:'3dMove', data:d};
			this.sendMessageToServer(obj);
		}

		private _get3DParam(data:any) {
			lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(CustomEvent.V3D, data as ViewData));
		}

		public getMessageFromServer(data:any) {
			lxl3d.logs.log("getMessageFromServer " + data);
			switch(data.type) {
				case "3dMove":
					this._get3DParam(data.data);
				break;
			}
		}

		public setStudentsFromServer(data:any) {
			lxl3d.logs.log("students:" + data);
			lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.GET_STUDENTS_FROM_SERVER_VIDEO, data));
		}

		public setTeacherFromServer(data:any) {
			lxl3d.logs.log("teacher:" + data);
			lxl3d.CDispatcher.getInstance().dispatch(new lxl3d.CEvent(lxl3d.CEvent.GET_TEACHER_FROM_SERVER_VIDEO, data));
		}

		public getWordsFromServer() {

		}
	}
}