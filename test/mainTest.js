const Game = require("../models/gameModel");
const should = require("should");

// fake socket io to prevent GameModel _scheduleNextGeneration crash
class FakeSocketIO{
    emit(apiName, data) {
        return { apiName, data}
    }
}

describe('# Test of GameModel', () => {
    const fakeIO = new FakeSocketIO();
    // create 3X3 for testing easily
    const gameModel = new Game.GameModel(fakeIO, 3, 3);

    it('random generate color if user first time connect or cookies session expired', done => {
        let color = gameModel._getUserColor("I am an ID");
        should(color !== null).be.true;
        done()
    })

    it('check 2 colors are same', done => {
        let color1 = gameModel._createRGB(1, 1, 1)
        let color2 = gameModel._createRGB(1, 1, 1)

        should(gameModel._isSameColor(color1, color2)).be.true;
        done()
    })

    it('check whether update data if user click cell', done => {
        gameModel.onUserClickCell("I am an ID", {row: 0, col: 0});
        let gameBoard = gameModel.getWholeGameBoardData();
        let emptyCellColor = gameModel._createRGB(0, 0, 0)

        should(gameModel._isSameColor(gameBoard[0][0], emptyCellColor)).be.false;
        done()
    })

    it('check case 1: Any live cell with fewer than two live neighbors dies, as if caused by under-population', (done) => {
        let emptyCellColor = gameModel._createRGB(0, 0, 0)
        gameModel.onUserClickCell("I am an ID", {row: 0, col: 0});

        // 1 second to updat as next generation
        gameModel._sleep(1000).then((result) => {
            let gameBoard = gameModel.getWholeGameBoardData();        
            should(gameModel._isSameColor(gameBoard[0][0], emptyCellColor)).be.true;
        }).finally(done);
    })

    it('check case 2: Any live cell with two or three live neighbors lives on to the next generation', (done) => {
        let emptyCellColor = gameModel._createRGB(0, 0, 0)
        gameModel.onUserClickCell("I am an ID", {row: 1, col: 0});
        gameModel.onUserClickCell("I am an ID", {row: 1, col: 1});
        gameModel.onUserClickCell("I am an ID", {row: 1, col: 2});

        // 1 second to updat as next generation
        gameModel._sleep(1000).then((result) => {
            let gameBoard = gameModel.getWholeGameBoardData();        
            should(gameModel._isSameColor(gameBoard[1][1], emptyCellColor)).be.false;
        }).finally(done);
    })

    it('check case 3: Any live cell with more than three live neighbors dies, as if by overcrowding', (done) => {
        let emptyCellColor = gameModel._createRGB(0, 0, 0)
        gameModel.onUserClickCell("I am an ID", {row: 0, col: 1});
        gameModel.onUserClickCell("I am an ID", {row: 1, col: 0});
        gameModel.onUserClickCell("I am an ID", {row: 1, col: 1});
        gameModel.onUserClickCell("I am an ID", {row: 1, col: 2});

        // 1 second to updat as next generation
        gameModel._sleep(1000).then((result) => {
            let gameBoard = gameModel.getWholeGameBoardData();        
            should(gameModel._isSameColor(gameBoard[1][1], emptyCellColor)).be.true;
        }).finally(done);
    })

    it('check case 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.', (done) => {
        let emptyCellColor = gameModel._createRGB(0, 0, 0)
        gameModel.onUserClickCell("I am an ID", {row: 0, col: 0});
        gameModel.onUserClickCell("I am an ID", {row: 0, col: 1});
        gameModel.onUserClickCell("I am an ID", {row: 1, col: 0});

        // 1 second to updat as next generation
        gameModel._sleep(1000).then((result) => {
            let gameBoard = gameModel.getWholeGameBoardData();        
            should(gameModel._isSameColor(gameBoard[1][1], emptyCellColor)).be.false;
        }).finally(done);
    })
})