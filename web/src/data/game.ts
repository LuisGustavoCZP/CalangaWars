import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Camera, Clock, TextureLoader, CubeTextureLoader, LinearFilter, ShaderLib, ShaderMaterial, BackSide, BoxGeometry, Mesh } from "three";

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

        /* const loader = new CubeTextureLoader();
        const texture = loader.load([
            "../assets/textures/skybox/milkyway_2048.jpg"
        ]);
        this.scene.background = texture; */
        const loader = new TextureLoader();
        const texture = loader.load(
            "./assets/textures/skybox/milkyway_2048.jpg"
        );
        texture.magFilter = LinearFilter;
        texture.minFilter = LinearFilter;
        const shader = ShaderLib.equirect;
        const material = new ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: BackSide,
        });
        material.uniforms.tEquirect.value = texture;
        const plane = new BoxGeometry(1000, 1000, 1000);
        const bgMesh = new Mesh(plane, material);
        this.scene.add(bgMesh);

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