module lxl3d {
	export class CEventInit implements EventInit {
		bubbles: boolean;
		cancelable: boolean;
	}

	export class CEvent extends egret.Event{
		/**
		 *连接到服务器 
		 */		
		public static CONNECT_SERVER_VIDEO:string = "CEVENT::CONNECT_SERVER_VIDEO";
		
		/**
		 *连接失败 
		 */		
		public static CONNECT_FAIL_VIDEO:string = "CEVENT::CONNECT_FAIL_VIDEO";

		/**
		 *加载资源完成 
		 */		
		public static LOAD_SKIN_COMPLETE_VIDEO:string = "CEVENT::LOAD_SKIN_COMPLETE_VIDEO";
		/**
		 * 加载配置完成
		 */
		public static LOAD_CONFIG_COMPLETE_VIDEO:string = "CEVENT::LOAD_CONFIG_COMPLETE_VIDEO";
		/**
		 * 加载一组资源完成
		 */
		public static LOAD_GROUP_COMPLETE_VIDEO:string = "CEVENT::LOAD_GROUP_COMPLETE_VIDEO";
		/**
		 * 加载进度
		 */
		public static LOAD_PROGRESS_VIDEO:string = "CEVENT::LOAD_PROGRESS_VIDEO";

		public static PRE_CLICK_VIDEO:string = "CEVENT::PRE_CLICK_VIDEO";
		public static CLICK_VIDEO:string = "CEVENT::CLICK_VIDEO";

		//完成选择
		public static SEL_COMPLETE_VIDEO:string = "CEVENT::SEL_COMPLETE";
		//成功完成游戏
		public static SUCCESS_VIDEO:string = "CEVENT::SUCCESS";
		//返回
		public static BACK_VIDEO:string = "CEVENT::BACK";
		//左右上下
		public static UP_VIDEO:string = "CEVENT::UP";
		public static DOWN_VIDEO:string = "CEVENT::DOWN";
		public static LEFT_VIDEO:string = "CEVENT::LEFT";
		public static RIGHT_VIDEO:string = "CEVENT::RIGHT";
		public static SPACE_VIDEO:string = "CEVENT::SPACE";
		//护眼模式
		public static PROTECTE_EYE_VIDEO:string = "CEVENT::PROTECTE_EYE";
		public static EYE_CHANGE_VIDEO:string = "CEVENT::EYE_CHANGE";

		public static GET_MESSAGE_FROM_SERVER_VIDEO:string = "CEVENT::GET_MESSAGE_FROM_SERVER_VIDEO";
		public static GET_STUDENTS_FROM_SERVER_VIDEO:string = "CEVENT::GET_USERLIST_FROM_SERVER_VIDEO";
		public static GET_TEACHER_FROM_SERVER_VIDEO:string = "CEVENT::GET_TEACHER_FROM_SERVER_VIDEO";
		public static GET_MESSAGE_VIDEO:string = "CEVENT::GET_MESSAGE_VIDEO";
		public static GET_LIST_VIDEO:string = "CEVENT::GET_STUDENTS_VIDEO";
		public static GET_TEACHER_VIDEO:string = "CEVENT::GET_TEACHER_VIDEO";
		public static GET_USER_LIST_VIDEO:string = "CEVENT::GET_USER_LIST_VIDEO";//获取用户列表 包含老师
		public static SEL_DEFENDER_VIDEO:string = "CEVENT::SEL_DEFENDER_VIDEO";//选择防守方
		public static SEL_DEFENDER_COMPLETE_VIDEO:string = "CEVENT::SEL_DEFENDER_COMPLETE_VIDEO";
		public static LINK_LINE_VIDEO:string = "CEVENT::LINK_LINE_VIDEO";//连线
		public static CLEAR_LINE_VIDEO:string = "CEVENT::CLEAR_LINE_VIDEO";//清空连线
		public static OPEN_VIDEO:string = "CEVENT::OPEN_VIDEO";
		public static READONLY_CHANGE_VIDEO:string = "READONLY_CHANGE_VIDEO";
		private _param:any;
		cancelBubble;
		public constructor(type:string, param:any = null, timeSpan:number = 0, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type, bubbles, cancelable, param);
			// let ceinit:CEventInit = new CEventInit();
			// ceinit.bubbles = bubbles;
			// ceinit.cancelable = cancelable;
			this._param = param;
		}

		public get param():any {
			return this._param;
		}

	}
}