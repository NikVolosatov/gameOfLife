import "./styles";
import {GameOfLife} from "./game/GameOfLife";

window.onload = ()=>{
    let game = new GameOfLife();
    
    let btnStart = document.getElementById("btnStart");
    let btnClear = document.getElementById("btnClear");

    let generationLabel = document.getElementById("lblGeneration");
    game.newGenerationCallback = (number) =>{
        generationLabel.innerText = number;
    }

    btnStart.onclick = (e) =>{
        game.start();
    };

    btnClear.onclick = (e) =>{
        generationLabel.innerText = 0;
        game.clear();
    };

    

};