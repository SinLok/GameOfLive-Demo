import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import { Table, Segment, Image, Header, Card, Menu, Message, Container, Dropdown, Popup } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import socketAPI from '../utilities/socketAPI';

const StillLifePattern = [
  {
    title: "Block",
    image: "block.png"
  },
  {
    title: "Bee-Hive",
    image: "bee_hive.png"
  },
  {
    title: "Loaf",
    image: "loaf.png"
  },
  {
    title: "Boat",
    image: "boat.png"
  },
  {
    title: "Tub",
    image: "tub.png"
  }
];

const OscillatorPattern = [
  {
    title: "Blinker",
    image: "blinker.gif"
  },
  {
    title: "Toad",
    image: "toad.gif"
  },
  {
    title: "Beacon",
    image: "beacon.gif"
  },
  {
    title: "Pulsar",
    image: "pulsar.gif"
  },
  {
    title: "Penta-decathlon",
    image: "penta_decathlon.gif"
  }
];

const SpaceshipPattern = [
  {
    title: "Glider",
    image: "glider.gif"
  },
  {
    title: "Light-weight spaceship",
    image: "light_weight_spaceship.gif"
  },
  {
    title: "Middle-weight spaceship",
    image: "middle_weight_spaceship.gif"
  },
  {
    title: "Heavy-weight spaceship",
    image: "heavy_weight_spaceship.gif"
  }
];


let Game = () => {
  const [socket, setSocket] = useState(null);
  const [boardSize, setBoardSize] = useState(null);
  const [cellsData, setCellsData] = useState({});

  useEffect(() => {
    setSocket(socketIO("127.0.0.1:5000"));
  }, []);

  useEffect(() => {
    if(socket != null){
      initSocketEvent();
    }
  }, [socket]);

  const initSocketEvent = () => {
    socket.on(socketAPI.GAME_BOARD_INIT_DATA, initData => {
      let newCellsData = {};
      for(var row=0; row < initData.boardSize.height; row++){
        for(var col=0; col < initData.boardSize.width; col++){
          let key = row + "|" + col;
          newCellsData[key] = initData.cellsData[row][col];
        }
      }

      setCellsData(newCellsData);
      setBoardSize(initData.boardSize);
    });

    socket.on(socketAPI.UPDATE_CELLS_COLOR, cells => {
      let updateCellsData = {};
      for(var cell of cells){
        updateCellsData[cell.row + "|" + cell.col] = cell.color;
      }
    
      setCellsData(prevCellsData => {
        return {...prevCellsData, ...updateCellsData}
      });
    });
  };

  const renderTable = () => {
    let components = [];
    for(var row = 0; row < boardSize.height; row++){
      let innerComponents = [];
      for(var col = 0; col < boardSize.width; col++){
        let colData = cellsData[row + "|" + col];
        let colorString = "rgb(" + colData.red + "," + colData.green + "," + colData.blue + ")";

        let cellLocation = {row, col};
        innerComponents.push(
          <Table.Cell selectable style={{background: colorString, height: '20px', width: '20px'}} onClick={()=>{
            socket.emit(socketAPI.SEND_CLICK_CELL, cellLocation);
          }} />
        )
      }

      components.push(<Table.Row>{innerComponents}</Table.Row>);
    }

    return (
      <Table celled collapsing>
        <Table.Body>{components}</Table.Body>
      </Table>
    )
  };

  const renderPattern = (patternGroup) => {
    let components = [];
    
    for(var pattern of patternGroup){
      let patternName = pattern.title;
      components.push(
        <Popup
          trigger={<Dropdown.Item onClick={() => {socket.emit(socketAPI.USE_PATTERN, patternName)}}>{patternName}</Dropdown.Item>}
          content={<Segment><Image src={"/images/" + pattern.image} fluid size="tiny" /></Segment>}
          position='right center'
        />
      )
    }

    return components;
  }

  return (
    <div>
      <Menu attached='top' inverted>
        <Menu.Item as='a' header>Conway's Game of Life</Menu.Item>
        <Menu.Item>
          <Dropdown text='Pre-define Pattern' item simple>
            <Dropdown.Menu>
              <Dropdown.Header icon='tags' content='Still lifes' />
              <Dropdown.Divider />
              {
                renderPattern(StillLifePattern)
              }

              <Dropdown.Header icon='tags' content='Oscillators' />
              <Dropdown.Divider />
              {
                renderPattern(OscillatorPattern)
              }

              <Dropdown.Header icon='tags' content='Spaceships' />
              <Dropdown.Divider />
              {
                renderPattern(SpaceshipPattern)
              }
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>

      <Message
        attached
        header='Click table cell or Use pre-defined pattern'
        content={<div>More infomation: <a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life</a></div>} />

      <Segment placeholder attached='bottom'>
        {
          boardSize == null ? <h1>Loading...</h1> : renderTable()
        }
      </Segment>

      <Segment inverted vertical style={{ padding: '4em 0em' }}>
        <Container textAlign='center'>
          ©2020 by Reserved by Jack CHUI
        </Container>
      </Segment>
    </div>
  )
};

export default Game;
