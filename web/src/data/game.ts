import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Camera, Clock, TextureLoader } from "three";

export class GameData
{
    scene? : Scene;
    camera? : Camera;
    renderer? : WebGLRenderer;
    ambientLight? : AmbientLight;
    directionalLight? : DirectionalLight;
    #clock? : Clock;
    #deltaTime? : number;

    constructor()
    {
        this.scene = new Scene();

        this.ambientLight = new AmbientLight(0xffffff, 0.5);
        this.ambientLight.castShadow = true;
        this.scene.add(this.ambientLight);

        this.directionalLight = new DirectionalLight(0xffffff, 1);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);

        //this.scene.background = new TextureLoader().load("")

        this.#clock = new Clock();
        this.#deltaTime = 0;
    }

    get deltaTime ()
    {
        return this.#deltaTime;
    }

    update ()
    {
        this.renderer?.render(this.scene!, this.camera!);
        this.#deltaTime = this.#clock?.getDelta();
    }
}

const gameData = new GameData ();

export {gameData};