import { useEffect, useState } from "react";
import { GameController } from "../controllers/game";
import { gameData } from "../data/game";
import { GameObject } from "../entities/gameobject";

let rodando = false;

export function GameManager ()
{
    useEffect(()=> 
    {
        if(rodando) return;
        rodando = true;
        const gameManager = new GameController();
        gameManager.start();
    }, []);

    return (
    <div>
        <canvas id="game-canvas"></canvas>
    </div>
    ); 
}