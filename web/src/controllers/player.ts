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
    rotateDir : Vector2;
    moveDir : Vector2;

    constructor (camera : Camera, canvas : HTMLCanvasElement)
    {
        this.dragging = false;
        this.cameraTarget = null;
        this.camera = camera;

        this.initCameraRotation = this.camera.rotation.clone()
        this.lookDir = new Vector3(0, 0, -1);
        this.rotateDir = new Vector2(0,0);
        this.moveDir = new Vector2(0,0);

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
            this.lookDir.addScaledVector(this.cameraTarget!.localToWorld(new Vector3(-e.movementX, e.movementY)).sub(this.cameraTarget!.position), gameData.deltaTime!*1);
        };

        window.onkeydown = (e) => 
        {
            if(e.key == "w") this.rotateDir.y = -1;
            else if(e.key == "s") this.rotateDir.y = 1;

            if(e.key == "a") this.rotateDir.x = 1;
            else if(e.key == "d") this.rotateDir.x = -1;

            if(e.key == " ") this.moveDir.y = 1;
        }

        window.onkeyup = (e) => 
        {
            if(e.key == "w") this.rotateDir.y = 0;
            else if(e.key == "s") this.rotateDir.y = 0;

            if(e.key == "a") this.rotateDir.x = 0;
            else if(e.key == "d") this.rotateDir.x = 0;

            if(e.key == " ") this.moveDir.y = 0;
        }
        
    }

    update ()
    {
        if(this.cameraTarget)
        {
            if(this.rotateDir.x != 0 || this.rotateDir.y != 0)
            {
                this.lookDir.add(this.cameraTarget!.localToWorld(new Vector3(this.rotateDir.x*gameData.deltaTime!*(1+(2*this.moveDir.y)), this.rotateDir.y*gameData.deltaTime!*(1+(1*this.moveDir.y)))).sub(this.cameraTarget!.position));
            }

            if(this.camera)
            {
                const targetPos = this.cameraTarget.position;
                const dir = this.cameraTarget.localToWorld(new Vector3(0, 5, 10));
                
                this.cameraTarget.lookAt(new Vector3(this.lookDir.x+targetPos.x, this.lookDir.y+targetPos.y, this.lookDir.z+targetPos.z))

                this.camera.position.set(dir.x, dir.y, dir.z);
                this.camera.lookAt(targetPos);
            }
        }

        if(this.moveDir.y != 0 || this.moveDir.x != 0) this.cameraTarget!.translateOnAxis(new Vector3(this.moveDir.x, 0, -this.moveDir.y).normalize(), 50*gameData.deltaTime!);
    }
}