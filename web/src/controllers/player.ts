import { Camera, Euler, Object3D, Vector2, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as MathEuler from "three/src/math/Euler";
import * as MathVector3 from "three/src/math/Vector3";
import * as MathMatrix from "three/src/math/Matrix4";
import { gameData } from "../data/game";

export class PlayerController
{
    camera : Camera;
    cameraTarget : Object3D | null;
    lookDir : Vector3;
    initCameraRotation : Euler;
    dragging : boolean;
    constructor (camera : Camera, canvas : HTMLCanvasElement)
    {
        this.dragging = false;
        this.cameraTarget = null;
        this.camera = camera;

        //const cr = this.camera.rotation.clone();
        //const crw = this.camera.localToWorld(new Vector3(cr.x, cr.y, cr.z))
        this.initCameraRotation = this.camera.rotation.clone()//new Euler(crw.x, crw.y, crw.z);
        this.lookDir = new Vector3(0, 0, -1);//Math.PI
        canvas.style.cursor = "pointer";
        canvas.onpointerdown = (e) => 
        {
            this.dragging = true;
            document.body.style.cursor = "move";
            canvas.style.cursor = "move";
        };
        window.onpointerup = (e) => 
        {
            this.dragging = false;
            document.body.style.cursor = "default";
            canvas.style.cursor = "pointer";
        };
        
        window.onpointermove = (e) => 
        {
            if(!this.dragging) return;
//-e.movementX
            this.lookDir.addScaledVector(this.cameraTarget!.localToWorld(new Vector3(-e.movementX, e.movementY)), gameData.deltaTime!*1);
            //this.lookDir.clamp(new Vector3(0, .1, 0), new Vector3(0, .9, 0));
            //const clamped = this.cameraTarget!.worldToLocal(this.lookDir)
            //if(this.lookDir.y < -.3) this.lookDir.y = -.3;
            //else if(this.lookDir.y > .3) this.lookDir.y = .3;
            //console.log(this.lookDir);
            //this.lookDir = this.cameraTarget!.localToWorld(clamped);
        };
        
    }

    update ()
    {
        if(this.cameraTarget)
        {
            //this.cameraTarget!.position.z += 1*gameData.deltaTime!;

            if(this.camera)
            {
                const targetPos = this.cameraTarget.position;
                const dir = this.cameraTarget.localToWorld(new Vector3(0, 5, 10));
                
                this.cameraTarget.lookAt(new Vector3(this.lookDir.x+targetPos.x, this.lookDir.y+targetPos.y, this.lookDir.z+targetPos.z))
                //this.cameraTarget.rotation.x = this.lookDir.x;
                //this.cameraTarget.rotation.y = this.lookDir.y;
                //this.cameraTarget.rotation.z = this.lookDir.z;

                this.camera.position.set(dir.x, dir.y, dir.z);
                this.camera.lookAt(targetPos);
                //const lookToW = this.camera.localToWorld(new Vector3(this.lookDir.x, this.lookDir.y, 0));
                //const lookToL = this.cameraTarget.worldToLocal(this.lookDir);
            }
        }
    }
}