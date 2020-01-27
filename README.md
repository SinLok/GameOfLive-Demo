# Conway's Game of Life Demo

©2020 by Reserved by Jack CHUI

 1. System Architecture
 2. System Configuration
 3. Features
 4. Installation
 5. Testing
 6. Demo Link

## 1. System Architecture
This demo implemented by the following language and technology:
1.1 Frontend:
 - React
 - Semantic UI React
 - Socket IO Client
 - Html Table

1.2 Backend: 
 - Node.JS
 - Express
 - Socket IO
 - Cookies and Session

When user enter this game (website), the web browser hold a socket connection with the backend server. Backend server emit initiation dataset (including width and height of table,  current game progress data) to client if the connection is successful.

When user click table cell or use pre-defined pattern, the backend server generate a random color for him/her. If he/she leaves the game and come back again, user use same color if the session and cookies are not expire based on the system configuration.

All calculation and data storage hold by backend server. If there are any update, the backend server will broadcast message to all connected client. See the following update flow:

Case 1:
 1. user A send signal (clicked table cell or selected pre-defined pattern) to backend server
 2. backend server receive and update local storage data 
 3. backend server broadcast update to all user

Case 2:

 1. backend server calculate next generation and update local storage data
  2. backend server broadcast update to all user

## 2. System Configuration

 - In project folder: `src` stored all frontend source code, `controllers` and `models` stored all backend source code. `public` folder stored all images and html files.
 - Cookies and Session expire after 24 hours
 - Backend server update "next generation" every 1 second
 - Re-generate color to user if user first time enter the game or cookies and session expired.
 - Average of color: Sum of all neighbors color and divide by count of all neighbors.
> When a dead cell revives by rule #4 “Any dead cell with exactly three
> live neighbors becomes a live cell, as if by reproduction.”, it will
> be given a color that is the average of its neighbors

## 3. Features
This system implemented the following features:

 1. Multiple player and synchronized worldview
 2. Create cellular by user click table cell
 3. Create cellular by user select pre-defined pattern

## 4. Installation

 1. Clone this project
 2. Open terminal and `cd` to this project
 3. `npm install`
 4. `npm run build`
 5. `npm start`

You need to install Node.JS before execute the above installation.

## 5. Testing
This project used [Mocha.JS](https://mochajs.org/) for testing. You can test this project by the following step:
 1. Clone this project
 2. Open terminal and `cd` to this project
 3. `npm install`
 4. `npm run test`

You will see this result:

    # Test of GameModel
        ✓ random generate color if user first time connect or cookies session expired
        ✓ check 2 colors are same
        ✓ check whether update data if user click cell
        ✓ check case 1: Any live cell with fewer than two live neighbors dies, as if caused by under-population (1003ms)
        ✓ check case 2: Any live cell with two or three live neighbors lives on to the next generation (1002ms)
        ✓ check case 3: Any live cell with more than three live neighbors dies, as if by overcrowding (1003ms)
        ✓ check case 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. (1002ms)

## 6. Demo Link
[https://game-of-live-demo.herokuapp.com/](https://game-of-live-demo.herokuapp.com/)

