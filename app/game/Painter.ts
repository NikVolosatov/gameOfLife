export class Painter {
    canvas: HTMLCanvasElement = null;

    mouse: { x: number; y: number } = null;

    hitCellCallback: (mouse: { x: number; y: number }) => void;

    canPaint: boolean = null;

    constructor(canvas: HTMLCanvasElement, hitCellCallback: (mouse: { x: number; y: number }) => void) {
        this.canvas = canvas;
        this.hitCellCallback = hitCellCallback;
        this.mouse = { x: 0, y: 0 };
    }

    private captureMouse = (e) => {
        this.mouse.x = e.pageX - this.canvas.offsetLeft;
        this.mouse.y = e.pageY - this.canvas.offsetTop;
    }

    private mouseMoveHandler = (e) => {
        this.hitCellCallback(this.mouse);
    }

    private mouseDownHandler = (e) => {
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler, false);
    }

    private mouseUpHandler = (e) => {
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler, false);
    }



    ensurePaint() {
        if (!this.canPaint) {
            this.canPaint = true;
            this.canvas.addEventListener("mousemove", this.captureMouse, false);
            this.canvas.addEventListener("mousedown", this.mouseDownHandler, false);
            this.canvas.addEventListener("mouseup", this.mouseUpHandler, false);
        }
    }

    preventPaint() {
        this.canPaint = false;
        this.canvas.removeEventListener("mousemove", this.captureMouse, false);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler, false);
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler, false);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler, false);
    }
}