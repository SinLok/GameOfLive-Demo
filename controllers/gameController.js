const Game = require("../models/gameModel");
const SocketAPI = require("./socketAPI");

module.exports = (io) => {
    const gameModel = new Game.GameModel(io);

    io.on('connection', function(socket){
        let connectionId = socket.request.cookies['connect.sid'];

        // emit data when connect
        socket.emit(
            SocketAPI.GAME_BOARD_INIT_DATA, 
            {
                boardSize: {
                    height: Game.GAME_BORAD_HEIGHT,
                    width: Game.GAME_BORAD_WIDTH
                },
                cellsData: gameModel.getWholeGameBoardData()
            }
        );

        // when user click cell
        socket.on(SocketAPI.SEND_CLICK_CELL, location => {
            io.emit(SocketAPI.UPDATE_CELLS_COLOR, [gameModel.onUserClickCell(connectionId, location)]);
        });

        socket.on(SocketAPI.USE_PATTERN, patternName => {
            io.emit(SocketAPI.UPDATE_CELLS_COLOR, gameModel.onPreDefinePatternSelected(connectionId, patternName));
        });
    });
};