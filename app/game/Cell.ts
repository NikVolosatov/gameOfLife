export class Cell {
    row: number;
    column: number;
    isAlive: boolean;

    constructor(row:number, column: number, isAlive: boolean) {
        this.row = row;
        this.column = column;
        this.isAlive = isAlive;
    }
}