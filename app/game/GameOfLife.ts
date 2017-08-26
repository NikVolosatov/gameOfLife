import { Cell } from "./Cell";


export class GameOfLife {

    currentCellGeneration: Cell[][] = null;
    cellSize: number = 5;
    numberOfRows: number = 100;
    numberOfColumns: number = 100;
    seedProbability: number = 0.5;
    tickLength: number = 2000;
    canvas: HTMLCanvasElement = null;
    drawingContext: CanvasRenderingContext2D = null;


    constructor() {
        this.initCanvas();
        this.seed();

        this.drawGrid();

    }

    public start() {
        setInterval(() => {
            this.drawGrid();
            this.evolveCellGeneration();
            
        }, this.tickLength);
    }

    private initCanvas() {
        this.canvas = document.createElement("canvas");
        document.getElementsByClassName("container")[0].appendChild(this.canvas);

        this.canvas.height = this.cellSize * this.numberOfRows;
        this.canvas.width = this.cellSize * this.numberOfColumns;

        this.drawingContext = this.canvas.getContext("2d");
    }

    private seed() {
        this.currentCellGeneration = [];

        this.crawlCells((row, column) => {
            this.currentCellGeneration[row][column] = new Cell(row, column, Math.random() < this.seedProbability);
        }, (row) => {
            this.currentCellGeneration[row] = [];
        });
    }

    private drawGrid() {
        this.crawlCells((row, column) => {
            this.drawCell(this.currentCellGeneration[row][column]);
        });
    }

    private drawCell(cell: Cell) {
        let x = cell.column * this.cellSize;
        let y = cell.row * this.cellSize;

        let fillStyle = "rgb(38, 38, 38)";
        if (cell.isAlive) {
            fillStyle = "rgb(242, 198, 65)"
        }

        this.drawingContext.strokeStyle = 'rgba(242, 198, 65, 0.1)'
        this.drawingContext.strokeRect(x, y, this.cellSize, this.cellSize);

        this.drawingContext.fillStyle = fillStyle;
        this.drawingContext.fillRect(x, y, this.cellSize, this.cellSize);
    }

    private evolveCellGeneration() {
        let newGeneration = [];

        this.crawlCells((row, column) => {
            let evolvedCell = this.evolveCell(this.currentCellGeneration[row][column]);
            newGeneration[row][column] = evolvedCell;
        }, (row) => {
            newGeneration[row] = [];
        });

        this.currentCellGeneration = newGeneration;
    }

    private evolveCell(cell: Cell) {
        let evolvedCell = new Cell(cell.row, cell.column, cell.isAlive);

        let numberOfAliveNeighbors = this.getCountAliveNeighbors(cell);
        if (cell.isAlive || numberOfAliveNeighbors === 3) {
            evolvedCell.isAlive = numberOfAliveNeighbors > 1 && numberOfAliveNeighbors < 4;
        }

        return evolvedCell;
    }

    private getCountAliveNeighbors(cell: Cell): number {
        let lowerRowBound = Math.max(cell.row - 1, 0);
        let upperRowBound = Math.min(cell.row + 1, this.numberOfRows - 1);

        let lowerColumnBound = Math.max(cell.column - 1, 0);
        let upperColumnBound = Math.min(cell.column + 1, this.numberOfColumns - 1);

        let numberOfAliveNeighbors = 0;

        let rowBounds = this.createNumberArray(lowerRowBound, upperRowBound);
        let columnBounds = this.createNumberArray(lowerColumnBound, upperColumnBound);

        for (var row = 0; row < rowBounds.length; row++) {
            for (var column = 0; column < columnBounds.length; column++) {
                if (row !== cell.row && column !== cell.column && this.currentCellGeneration[row][column].isAlive) {
                    numberOfAliveNeighbors++;
                }
            }
        }

        return numberOfAliveNeighbors;
    }

    private createNumberArray(lowEnd: number, highEnd: number): number[] {
        let arr: number[] = [];
        while (lowEnd <= highEnd) {
            arr.push(lowEnd++);
        }
        return arr;
    }

    private crawlCells(callback: (row: number, column: number) => void, rowCallback?: (row: number) => void) {
        for (var row = 0; row < this.numberOfRows; row++) {
            if (rowCallback) {
                rowCallback(row);
            }
            for (var column = 0; column < this.numberOfColumns; column++) {
                callback(row, column);
            }
        }
    }


}