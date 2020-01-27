const SocketAPI = require("../controllers/socketAPI");

const GAME_BORAD_HEIGHT = 30;
const GAME_BORAD_WIDTH = 75;

// Only record the offset, start from top left position
const PreDefinePattern = {
    // Still lifes
    "Block": [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 1, col: 0},
        {row: 1, col: 1}
    ],
    "Bee-Hive": [
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 1, col: 0},
        {row: 1, col: 3},
        {row: 2, col: 1},
        {row: 2, col: 2}
    ],
    "Loaf": [
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 1, col: 0},
        {row: 1, col: 3},
        {row: 2, col: 1},
        {row: 2, col: 3},
        {row: 3, col: 2}
    ],
    "Boat": [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 1, col: 0},
        {row: 1, col: 2},
        {row: 2, col: 1}
    ],
    "Tub": [
        {row: 0, col: 1},
        {row: 1, col: 0},
        {row: 1, col: 2},
        {row: 2, col: 1}
    ],

    // Oscillators
    "Blinker": [
        {row: 0, col: 0},
        {row: 1, col: 0},
        {row: 2, col: 0}
    ],
    "Toad": [
        {row: 0, col: 2},
        {row: 1, col: 0},
        {row: 1, col: 3},
        {row: 2, col: 0},
        {row: 2, col: 3},
        {row: 3, col: 1}
    ],
    "Beacon": [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 1, col: 0},
        {row: 2, col: 3},
        {row: 3, col: 2},
        {row: 3, col: 3}
    ],
    "Pulsar": [
        {row: 0, col: 2},
        {row: 0, col: 3},
        {row: 0, col: 4},
        {row: 0, col: 8},
        {row: 0, col: 9},
        {row: 0, col: 10},

        {row: 5, col: 2},
        {row: 5, col: 3},
        {row: 5, col: 4},
        {row: 5, col: 8},
        {row: 5, col: 9},
        {row: 5, col: 10},

        {row: 7, col: 2},
        {row: 7, col: 3},
        {row: 7, col: 4},
        {row: 7, col: 8},
        {row: 7, col: 9},
        {row: 7, col: 10},

        {row: 12, col: 2},
        {row: 12, col: 3},
        {row: 12, col: 4},
        {row: 12, col: 8},
        {row: 12, col: 9},
        {row: 12, col: 10},

        {row: 2, col: 0},
        {row: 2, col: 5},
        {row: 2, col: 7},
        {row: 2, col: 12},

        {row: 3, col: 0},
        {row: 3, col: 5},
        {row: 3, col: 7},
        {row: 3, col: 12},

        {row: 4, col: 0},
        {row: 4, col: 5},
        {row: 4, col: 7},
        {row: 4, col: 12},

        {row: 8, col: 0},
        {row: 8, col: 5},
        {row: 8, col: 7},
        {row: 8, col: 12},

        {row: 9, col: 0},
        {row: 9, col: 5},
        {row: 9, col: 7},
        {row: 9, col: 12},

        {row: 10, col: 0},
        {row: 10, col: 5},
        {row: 10, col: 7},
        {row: 10, col: 12}
    ],
    "Penta-decathlon": [
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 0, col: 3},
        {row: 1, col: 0},
        {row: 1, col: 4},
        {row: 2, col: 0},
        {row: 2, col: 4},
        {row: 3, col: 1},
        {row: 3, col: 2},
        {row: 3, col: 3},
        
        {row: 8, col: 1},
        {row: 8, col: 2},
        {row: 8, col: 3},
        {row: 9, col: 0},
        {row: 9, col: 4},
        {row: 10, col: 0},
        {row: 10, col: 4},
        {row: 11, col: 1},
        {row: 11, col: 2},
        {row: 11, col: 3},
    ],

    // Spaceships
    "Glider": [
        {row: 0, col: 0},
        {row: 1, col: 1},
        {row: 1, col: 2},
        {row: 2, col: 0},
        {row: 2, col: 1}
    ],
    "Light-weight spaceship": [
        {row: 0, col: 2},
        {row: 0, col: 3},
        {row: 1, col: 0},
        {row: 1, col: 1},
        {row: 1, col: 3},
        {row: 1, col: 4},
        {row: 2, col: 0},
        {row: 2, col: 1},
        {row: 2, col: 2},
        {row: 2, col: 3},
        {row: 3, col: 1},
        {row: 3, col: 2}
    ],
    "Middle-weight spaceship": [
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 0, col: 3},
        {row: 0, col: 4},
        {row: 0, col: 5},
        {row: 1, col: 0},
        {row: 1, col: 5},
        {row: 2, col: 5},
        {row: 3, col: 0},
        {row: 3, col: 4},
        {row: 4, col: 2}
    ],
    "Heavy-weight spaceship": [
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 0, col: 3},
        {row: 0, col: 4},
        {row: 0, col: 5},
        {row: 0, col: 6},
        {row: 1, col: 0},
        {row: 1, col: 6},
        {row: 2, col: 6},
        {row: 3, col: 0},
        {row: 3, col: 5},
        {row: 4, col: 2},
        {row: 4, col: 3}
    ]
}

class GameModel{
    constructor(io){
        this.EMPTY_CELL_COLOR = this._createRGB(0, 0, 0);
        this.gameBoard = Array(GAME_BORAD_HEIGHT).fill().map(() => Array(GAME_BORAD_WIDTH).fill(this.EMPTY_CELL_COLOR));
        this.io = io;
        this.userColorMap = {};
    
        this._scheduleNextGeneration();
    }

    _createRGB(r, g, b){
        return { red: r, green: g, blue: b }
    }
    
    _isSameColor(color1, color2){
        return color1.red == color2.red && color1.green == color2.green && color1.blue == color2.blue;
    }

    _generateRandomColor(connectionId){
        // init color if user first time enter this game
        if(this.userColorMap[connectionId] == null){
            this.userColorMap[connectionId] = this._createRGB(
                Math.floor(Math.random()*256),
                Math.floor(Math.random()*256),
                Math.floor(Math.random()*256)
            )
        }
    }

    onUserClickCell(connectionId, location){
        this._generateRandomColor(connectionId);

        this.gameBoard[location.row][location.col] = this.userColorMap[connectionId];
        return { row: location.row, col: location.col, color: this.userColorMap[connectionId] };
    }

    getWholeGameBoardData(){
        return this.gameBoard;
    }

    _sleep(ms){
        return new Promise((resolver) => setTimeout(resolver, ms));
    }

    async _scheduleNextGeneration(){
        while(true){
            
            let thisGenerationUpdate = [];
            for(var row = 0; row < GAME_BORAD_HEIGHT; row++){
                for(var col = 0; col < GAME_BORAD_WIDTH; col++){
                    let {count, avgColor} = this.countAndAvgColorOfNeighbors(row, col);

                    if(this._isSameColor(this.gameBoard[row][col], this.EMPTY_CELL_COLOR)){
                        // Cell Die
                        if(count == 3){
                            // Case 4
                            thisGenerationUpdate.push({row, col, color: avgColor});
                        }
                    }else{
                        // Cell Alive
                        if(count == 2 || count == 3){
                            // Case 2
                            // Keep alive
                        }else{
                            // Case 1 or Case 3
                            thisGenerationUpdate.push({row, col, color: this.EMPTY_CELL_COLOR});
                        }
                    }
                }
            }

            // Update Game Board
            for(var info of thisGenerationUpdate){
                this.gameBoard[info.row][info.col] = info.color;
            }

            this.io.emit(SocketAPI.UPDATE_CELLS_COLOR, thisGenerationUpdate);

            await this._sleep(1000);
        }
    }

    countAndAvgColorOfNeighbors(r, c){
        var count = 0;
        var avgColor = this._createRGB(0, 0, 0);

        for(var rowOffset = -1; rowOffset <= 1; rowOffset++){
            for(var colOffset = -1; colOffset <= 1; colOffset++){
                let rowIdx = r + rowOffset;
                let colIdx = c + colOffset;

                if(rowIdx >= 0 && colIdx >= 0 && 
                    rowIdx < GAME_BORAD_HEIGHT && colIdx < GAME_BORAD_WIDTH &&
                    !(rowOffset == 0 && colOffset == 0) &&
                    !this._isSameColor(this.gameBoard[rowIdx][colIdx], this.EMPTY_CELL_COLOR)){
                        count++;

                    avgColor.red += this.gameBoard[rowIdx][colIdx].red;
                    avgColor.green += this.gameBoard[rowIdx][colIdx].green;
                    avgColor.blue += this.gameBoard[rowIdx][colIdx].blue;
                }
            }
        }

        avgColor.red = Math.floor(avgColor.red / count);
        avgColor.green = Math.floor(avgColor.green / count);
        avgColor.blue = Math.floor(avgColor.blue / count);

        return {count, avgColor};
    }

    onPreDefinePatternSelected(connectionId, patternName){
        this._generateRandomColor(connectionId);
        let rowIdx = Math.floor(Math.random() * GAME_BORAD_HEIGHT);
        let colIdx = Math.floor(Math.random() * GAME_BORAD_WIDTH);
        let userColor = this.userColorMap[connectionId];

        let selectedPattern = PreDefinePattern[patternName];
        var updatedCells = [];

        for(var location of selectedPattern){
            let updateRow = rowIdx + location.row;
            let updateCol = colIdx + location.col;

            if(updateRow < GAME_BORAD_HEIGHT && updateCol < GAME_BORAD_WIDTH){
                this.gameBoard[updateRow][updateCol] = userColor;
                updatedCells.push({ row: updateRow, col: updateCol, color: userColor });
            }
        }

        return updatedCells;
    }
}

module.exports = {
    GameModel,
    GAME_BORAD_HEIGHT,
    GAME_BORAD_WIDTH
};