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
var GameOfLife_1 = __webpack_require__(9);
window.onload = function () {
    var game = new GameOfLife_1.GameOfLife();
    game.start();
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
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = __webpack_require__(10);
var GameOfLife = (function () {
    function GameOfLife() {
        this.currentCellGeneration = null;
        this.cellSize = 5;
        this.numberOfRows = 100;
        this.numberOfColumns = 100;
        this.seedProbability = 0.3;
        this.tickLength = 100;
        this.canvas = null;
        this.drawingContext = null;
        this.initCanvas();
        this.seed();
        this.drawGrid();
    }
    GameOfLife.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.evolveCellGeneration();
            _this.drawGrid();
        }, this.tickLength);
    };
    GameOfLife.prototype.initCanvas = function () {
        this.canvas = document.createElement("canvas");
        document.getElementsByClassName("container")[0].appendChild(this.canvas);
        this.canvas.height = this.cellSize * this.numberOfRows;
        this.canvas.width = this.cellSize * this.numberOfColumns;
        this.drawingContext = this.canvas.getContext("2d");
    };
    GameOfLife.prototype.seed = function () {
        var _this = this;
        this.currentCellGeneration = [];
        this.crawlCells(function (row, column) {
            _this.currentCellGeneration[row][column] = new Cell_1.Cell(row, column, Math.random() < _this.seedProbability);
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
/* 10 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map