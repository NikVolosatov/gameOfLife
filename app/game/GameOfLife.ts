class GameOfLife{

    currentCellGeneration: number[][];
    cellSize: number = 7;
    numberOfRows: number = 50;
    numberOfColumns: number = 50;
    seedProbability: number = 0.5;
    tickLength: number = 100;
    canvas: HTMLCanvasElement = null;
    drawingContext: CanvasRenderingContext2D;


    constructor(){

    }
}