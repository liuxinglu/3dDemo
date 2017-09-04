module app {
	export class ViewData {
		public constructor() {
		}

		type:string = "";//show normal
		gameIndex:number = 0;
		distance:number = 0;
		lookAtOffset:egret3d.Vector3D;
		lookAtPosition:egret3d.Vector3D;
		rotationX:number;
		rotationY:number;
		rotationZ:number;
	}
}