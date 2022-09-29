import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Camera, Clock, TextureLoader } from "three";
import { gameData } from "../data/game";

export class GameController
{
    constructor ()
    {
        gameData.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
        gameData.camera.position.set(0, 5, -5);
        gameData.camera.lookAt(0, 1, 0);

        const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
        gameData.renderer = new WebGLRenderer({
            canvas,
            antialias: true,
        });
        gameData.renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    }
    
    start ()
    {
        this.updateCycle ();
    }

    updateCycle ()
    {
        gameData.update ();
        requestAnimationFrame(() => this.updateCycle);
    }
} 