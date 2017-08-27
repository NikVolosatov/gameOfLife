/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
var GameOfLife_1 = __webpack_require__(4);
window.onload = function () {
    var game = new GameOfLife_1.GameOfLife();
    var btnStart = document.getElementById("btnStart");
    var btnClear = document.getElementById("btnClear");
    var generationLabel = document.getElementById("lblGeneration");
    game.newGenerationCallback = function (number) {
        generationLabel.innerText = number;
    };
    btnStart.onclick = function (e) {
        game.start();
    };
    btnClear.onclick = function (e) {
        generationLabel.innerText = 0;
        game.clear();
    };
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(3);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = __webpack_require__(5);
var Painter_1 = __webpack_require__(11);
var GameOfLife = (function () {
    function GameOfLife() {
        var _this = this;
        this.currentCellGeneration = null;
        this.generationNumber = null;
        this.interval = null;
        this.cellSize = 10;
        this.numberOfRows = 50;
        this.numberOfColumns = 100;
        this.tickLength = 60;
        this.canvas = null;
        this.drawingContext = null;
        this.painter = null;
        this.hitCallback = function (mouse) {
            var cellColumn = Math.round(mouse.x / _this.cellSize);
            var cellRow = Math.round(mouse.y / _this.cellSize);
            if (cellColumn === _this.numberOfColumns) {
                cellColumn--;
            }
            if (cellRow === _this.numberOfRows) {
                cellRow--;
            }
            var cell = _this.currentCellGeneration[cellRow][cellColumn];
            if (!cell.isAlive) {
                cell.isAlive = !cell.isAlive;
                _this.drawCell(cell);
            }
        };
        this.initCanvas();
        this.seed();
        this.drawGrid();
        this.painter = new Painter_1.Painter(this.canvas, this.hitCallback);
        this.painter.ensurePaint();
        this.generationNumber = 0;
    }
    Object.defineProperty(GameOfLife.prototype, "isGaming", {
        get: function () {
            return this.interval !== null;
        },
        enumerable: true,
        configurable: true
    });
    GameOfLife.prototype.start = function () {
        var _this = this;
        if (!this.isGaming) {
            this.painter.preventPaint();
            this.interval = setInterval(function () {
                _this.evolveCellGeneration();
                _this.drawGrid();
            }, this.tickLength);
        }
    };
    GameOfLife.prototype.clear = function () {
        this.seed();
        this.drawGrid();
        this.painter.ensurePaint();
        this.generationNumber = 0;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };
    GameOfLife.prototype.initCanvas = function () {
        this.canvas = document.createElement("canvas");
        document.getElementsByClassName("canvas-container")[0].appendChild(this.canvas);
        this.canvas.height = this.cellSize * this.numberOfRows;
        this.canvas.width = this.cellSize * this.numberOfColumns;
        this.drawingContext = this.canvas.getContext("2d");
    };
    GameOfLife.prototype.seed = function () {
        var _this = this;
        this.currentCellGeneration = [];
        this.crawlCells(function (row, column) {
            //this.currentCellGeneration[row][column] = new Cell(row, column, Math.random() < this.seedProbability);
            _this.currentCellGeneration[row][column] = new Cell_1.Cell(row, column, false);
        }, function (row) {
            _this.currentCellGeneration[row] = [];
        });
    };
    GameOfLife.prototype.drawGrid = function () {
        var _this = this;
        this.crawlCells(function (row, column) {
            _this.drawCell(_this.currentCellGeneration[row][column]);
        });
    };
    GameOfLife.prototype.drawCell = function (cell) {
        var x = cell.column * this.cellSize;
        var y = cell.row * this.cellSize;
        var fillStyle = "rgb(38, 38, 38)";
        if (cell.isAlive) {
            fillStyle = "rgb(242, 198, 65)";
        }
        this.drawingContext.strokeStyle = 'rgba(242, 198, 65, 0.1)';
        this.drawingContext.strokeRect(x, y, this.cellSize, this.cellSize);
        this.drawingContext.fillStyle = fillStyle;
        this.drawingContext.fillRect(x, y, this.cellSize, this.cellSize);
    };
    GameOfLife.prototype.evolveCellGeneration = function () {
        var _this = this;
        var newGeneration = [];
        this.crawlCells(function (row, column) {
            var evolvedCell = _this.evolveCell(_this.currentCellGeneration[row][column]);
            newGeneration[row][column] = evolvedCell;
        }, function (row) {
            newGeneration[row] = [];
        });
        this.currentCellGeneration = newGeneration;
        this.generationNumber++;
        if (this.newGenerationCallback) {
            this.newGenerationCallback(this.generationNumber);
        }
    };
    GameOfLife.prototype.evolveCell = function (cell) {
        var evolvedCell = new Cell_1.Cell(cell.row, cell.column, cell.isAlive);
        var numberOfAliveNeighbors = this.getCountAliveNeighbors(cell);
        if (cell.isAlive || numberOfAliveNeighbors === 3) {
            evolvedCell.isAlive = numberOfAliveNeighbors > 1 && numberOfAliveNeighbors < 4;
        }
        return evolvedCell;
    };
    GameOfLife.prototype.getCountAliveNeighbors = function (cell) {
        var lowerRowBound = Math.max(cell.row - 1, 0);
        var upperRowBound = Math.min(cell.row + 1, this.numberOfRows - 1);
        var lowerColumnBound = Math.max(cell.column - 1, 0);
        var upperColumnBound = Math.min(cell.column + 1, this.numberOfColumns - 1);
        var numberOfAliveNeighbors = 0;
        var rowBounds = this.createNumberArray(lowerRowBound, upperRowBound);
        var columnBounds = this.createNumberArray(lowerColumnBound, upperColumnBound);
        for (var i = 0; i < rowBounds.length; i++) {
            var currentRow = rowBounds[i];
            for (var j = 0; j < columnBounds.length; j++) {
                var currentColumn = columnBounds[j];
                if (currentRow === cell.row && currentColumn === cell.column) {
                    continue;
                }
                else if (this.currentCellGeneration[currentRow][currentColumn].isAlive) {
                    numberOfAliveNeighbors++;
                }
            }
        }
        return numberOfAliveNeighbors;
    };
    GameOfLife.prototype.createNumberArray = function (lowEnd, highEnd) {
        var arr = [];
        while (lowEnd <= highEnd) {
            arr.push(lowEnd++);
        }
        return arr;
    };
    GameOfLife.prototype.crawlCells = function (callback, rowCallback) {
        for (var row = 0; row < this.numberOfRows; row++) {
            if (rowCallback) {
                rowCallback(row);
            }
            for (var column = 0; column < this.numberOfColumns; column++) {
                callback(row, column);
            }
        }
    };
    return GameOfLife;
}());
exports.GameOfLife = GameOfLife;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Cell = (function () {
    function Cell(row, column, isAlive) {
        this.row = row;
        this.column = column;
        this.isAlive = isAlive;
    }
    return Cell;
}());
exports.Cell = Cell;


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Painter = (function () {
    function Painter(canvas, hitCellCallback) {
        var _this = this;
        this.canvas = null;
        this.mouse = null;
        this.canPaint = null;
        this.captureMouse = function (e) {
            _this.mouse.x = e.pageX - _this.canvas.offsetLeft;
            _this.mouse.y = e.pageY - _this.canvas.offsetTop;
        };
        this.mouseMoveHandler = function (e) {
            _this.hitCellCallback(_this.mouse);
        };
        this.mouseDownHandler = function (e) {
            _this.canvas.addEventListener("mousemove", _this.mouseMoveHandler, false);
        };
        this.mouseUpHandler = function (e) {
            _this.canvas.removeEventListener("mousemove", _this.mouseMoveHandler, false);
        };
        this.canvas = canvas;
        this.hitCellCallback = hitCellCallback;
        this.mouse = { x: 0, y: 0 };
    }
    Painter.prototype.ensurePaint = function () {
        if (!this.canPaint) {
            this.canPaint = true;
            this.canvas.addEventListener("mousemove", this.captureMouse, false);
            this.canvas.addEventListener("mousedown", this.mouseDownHandler, false);
            this.canvas.addEventListener("mouseup", this.mouseUpHandler, false);
        }
    };
    Painter.prototype.preventPaint = function () {
        this.canPaint = false;
        this.canvas.removeEventListener("mousemove", this.captureMouse, false);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler, false);
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler, false);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler, false);
    };
    return Painter;
}());
exports.Painter = Painter;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map