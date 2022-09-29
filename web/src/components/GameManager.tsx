import { useEffect, useState } from "react";
import { GameController } from "../controllers/game";
import { gameData } from "../data/game";
import { load } from "../loaders/gltf-loader";


export function GameManager ()
{

    async function loadThings ()
    {
        const spaceship = await load("../assets/meshs/glft/spaceships/craft_speederA.glb");
        console.log(spaceship);
        gameData.scene!.add(spaceship);
        spaceship.position.set(0, 0, 0);
    }

    useEffect(()=> 
    {
        const gameManager = new GameController();
        gameManager.start();
        loadThings ();
    }, []);

    return (
    <div>
        <canvas id="game-canvas"></canvas>
    </div>
    ); 
}