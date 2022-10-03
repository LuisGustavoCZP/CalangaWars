import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Camera, Clock, TextureLoader, Object3D } from "three";
import { gameData } from "../data/game";
import { GameObject } from "../entities/gameobject";
import { load } from "../loaders/gltf-loader";
import { PlayerController } from "./player";

export class GameController
{
    gameObjects : Map<string, Object3D>;
    playerController : PlayerController;

    constructor ()
    {
        this.gameObjects = new Map();
        
        gameData.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
        gameData.camera.position.set(0, 5, -5);
        gameData.camera.lookAt(0, 1, 0);
        const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
        gameData.renderer = new WebGLRenderer({
            canvas,
            antialias: true,
        });
        gameData.renderer.setSize(window.innerWidth/2, window.innerHeight/2);

        this.playerController = new PlayerController(gameData.camera, canvas);
    }

    async loadThings ()
    {
        const spaceship = await load("../assets/meshs/glft/spaceships/nave1.glb");
        gameData.scene!.add(spaceship);
        spaceship.position.set(0, 0, 0);
        spaceship.rotation.set(0, 1*Math.PI, 0);

        this.playerController.cameraTarget = spaceship; 

        const spaceship2 = await load("../assets/meshs/glft/spaceships/navee.glb");
        gameData.scene!.add(spaceship2);
        spaceship2.position.set(0, 0, 5);
        spaceship2.rotation.set(0, 0, 0);

        console.log("Rodou aqui");
    }

    update ()
    {
        gameData.update ();
        this.playerController.update();
    }

    async start ()
    {
        await this.loadThings ();
        this.updateCycle ();
    }

    updateCycle ()
    {
        this.update ();
        requestAnimationFrame(() => this.updateCycle());
    }
} 