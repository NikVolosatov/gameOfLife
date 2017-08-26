import "./styles";
import {GameOfLife} from "./game/GameOfLife";

window.onload = ()=>{
    let game = new GameOfLife();
    game.start();
};