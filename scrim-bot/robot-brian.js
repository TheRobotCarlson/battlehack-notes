import {BCAbstractRobot, SPECS} from 'battlecode';


// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
var findShortestPath = function(startCoordinates, grid) {
    var distanceFromTop = startCoordinates[0];
    var distanceFromLeft = startCoordinates[1];
  
    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
      distanceFromTop: distanceFromTop,
      distanceFromLeft: distanceFromLeft,
      path: [],
      status: 'Start'
    };
  
    // Initialize the queue with the start location already inside
    var queue = [location];
  
    // Loop through the grid searching for the goal
    while (queue.length > 0) {
      // Take the first location off the queue
      var currentLocation = queue.shift();
  
      // Explore North
      var newLocation = exploreInDirection(currentLocation, 'North', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore East
      var newLocation = exploreInDirection(currentLocation, 'East', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore South
      var newLocation = exploreInDirection(currentLocation, 'South', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
  
      // Explore West
      var newLocation = exploreInDirection(currentLocation, 'West', grid);
      if (newLocation.status === 'Goal') {
        return newLocation.path;
      } else if (newLocation.status === 'Valid') {
        queue.push(newLocation);
      }
    }
  
    // No valid path found
    return false;
  
  };
  
  // This function will check a location's status
  // (a location is "valid" if it is on the grid, is not an "obstacle",
  // and has not yet been visited by our algorithm)
  // Returns "Valid", "Invalid", "Blocked", or "Goal"
  var locationStatus = function(location, grid) {
    var gridSize = grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;
  
    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {
  
      // location is not on the grid--return false
      return 'Invalid';
    } else if (grid[dft][dfl] === 'Goal') {
      return 'Goal';
    } else if (grid[dft][dfl] !== 'Empty') {
      // location is either an obstacle or has been visited
      return 'Blocked';
    } else {
      return 'Valid';
    }
  };
  
  
  // Explores the grid from the given location in the given
  // direction
  var exploreInDirection = function(currentLocation, direction, grid) {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);
  
    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;
  
    if (direction === 'North') {
      dft -= 1;
    } else if (direction === 'East') {
      dfl += 1;
    } else if (direction === 'South') {
      dft += 1;
    } else if (direction === 'West') {
      dfl -= 1;
    }
  
    var newLocation = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      path: newPath,
      status: 'Unknown'
    };
    newLocation.status = locationStatus(newLocation, grid);
  
    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === 'Valid') {
      grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
    }
  
    return newLocation;
  };
  
  
  // OK. We have the functions we need--let's run them to get our shortest path!


class MyRobot extends BCAbstractRobot {
    constructor() {
        super();
        this.pendingRecievedMessages = {};
        this.enemyPlanet = [];
        
        this.voyagersBuilt = 0;
        this.isHoReflect = null; // TODO: horizontal reflection test
        this.mapLen = -1;
        this.myPlanet = [];
        this.myBots = [];
        this.enemyBots = [];
        this.numBots = 0;
        this.myIndex = [];
        this.rounds_played = 0;
        this.planetHunt = false;
        this.gridSize = 3; // square grid size
        this.regions = []
    }
    // state info
    // this.me // a robot object 
    // this.me.turn // round count
    // this.me.time // clock value
        // r = this.me or r = this.robots[1]
        // r.id // between 1 and 4096
        // r.unit // unit type 0=planet, 1=voyager
        // r.signal // current output signal
        // r.team // team
        // r.r: North-South direction (the row that the robot is in)
        // r.c: East-West direction (the column that the robot is in)

    // this.map // true is passable, false is impassable, this.map[0][0] is upper left corner
    // this.orbs_map // overlap of map with how many orbs are in each
    // this.n // size of the map
    // this.orbs // the total amount of orbs the team possesses
    // this.robots // all existing units in random order
    // visible_robot_map = this.get_visible_robot_map();
    // visible = this.get_visible_robots();
    
    // orb_map = this.orbs_map
    // map = this.map
    turn() {
        if(this.numBots != this.robots.length){
            for(var i=0; i<this.robots.length; i++){
                if(this.robots[i].team == this.me.team){
                    if(!this.myBots.includes(this.robots[i])){
                        this.myBots.push(this.robots[i]);
                        this.numBots++;
                    }
                } else{
                    if(!this.enemyBots.includes(this.robots[i])){
                        this.enemyBots.push(this.robots[i]);
                        this.numBots++;
                    }
                }
            }
        }

        var map = this.map;
        var robotMap = this.getVisibleRobotMap();
        // var mapLen = this.n;
        var my_coord = [this.me.r, this.me.c];

        var my_planet = this.getRobot(this.myPlanet);

        if (this.me.unit === SPECS.VOYAGER) {
            
            var signals = [];
            var planetSentry = false;
            for(var i = 0; i < this.myIndex; i++){
                r = this.getRobot(this.myBots[i]);

                signals.push(r.signal);
                if(r.signal == 1){
                    planetSentry = true;
                }
            }

            if(this.me.turn == 1){
                base_y_coord = my_planet.signal >> 8;
                base_x_coord = my_planet.signal & 255;
    
                if(this.isHoReflect){
                    this.enemyPlanet.push(-1 * base_y_coord);
                    this.enemyPlanet.push(base_x_coord);                
                } else {
                    this.enemyPlanet.push(base_y_coord);
                    this.enemyPlanet.push(-1 * base_x_coord);    
                }
                
                for(var i=0; i<this.n; i += this.gridSize){

                    for(var j=0; j<this.n; j += this.gridSize){
                        var sum = 0;
                        for(var k = 0; k < this.gridSize; k++){
                            for(var p =0; p < this.gridSize; p++){
                                sum += this.orbs_map[i + k][j + p];
                            }
                        }
                        this.regions.push([sum, [i + this.gridSize / 2, j + this.gridSize / 2]]); // middle of region
                    }
                }
                this.regions.sort(function(a,b){return a[0] < b[0];}); // descending order

            } else if(this.me.turn == 2){
                this.rounds_played = my_planet.signal;
            } else {
                this.rounds_played++;
            }

                        
            // 1: move towards enemy base
            // 2: if someone is already doing 1, head towards high value region, send order based on voronoi, index - 3
            // 3: if you find an enemy, pursue

            if(!planetSentry || this.planetHunt){ // we're going planet hunting
                this.planetHunt = true;
                var grid = [];
                for (var i=0; i < this.n; i++) {
                    grid[i] = [];
                    for (var j=0; j < this.n; j++) {
                        if(map[i][j]){
                            grid[i][j] = 'Empty';
                        } else{
                            grid[i][j] = 'Obstacle';
                        }
                    }
                }
                
                grid[my_coord[0]][my_coord[1]] = "Start";
                grid[this.enemyPlanet[0]][this.enemyPlanet[1]] = "Goal";

                var moves_temp = findShortestPath(my_coord, grid);
                var moves = [];

                for(var i = 0; i < moves_temp.length; i++){
                    switch(moves_temp[i]){
                        case 'South': moves.push([-1, 0]); break;
                        case 'North': moves.push([1, 0]); break;
                        case 'West': moves.push([0, 1]); break;
                        case 'East': moves.push([0, -1]); break;
                    }
                }
                this.log('id: ' + this.me.id + ' moving ' + this.moves[0] + ' planet hunting');
                this.signal(1); // planet hunting

                return this.move(moves[0][0], moves[0][1]);
            }

            this.planetHunt = false;
            
            // visible enemy?

            // head towards unclaimed high value region
            this.regions
            

            var moved = false;
            var choice = null;
            const choices = [[0,-1], [1, 0], [0, 1], [-1, 0]];

            for(var i=0;i<choices.length;i++){
                var temp = choices[i];
                if(robotMap[my_coord[0] + temp[0]][my_coord[1] + temp[1]] > 0){
                    robot_id = robotMap[my_coord[0] + temp[0]][my_coord[1] + temp[1]]

                    if(this.getRobot(robot_id).team != this.me.team){
                        
                    }
                }
            }
            while(!moved){
                choice = choices[Math.floor(Math.random()*choices.length)];
                var new_coord = [my_coord[0] + choice[0], my_coord[0] + choice[1]];
                
                if(this.isPassable(new_coord, map, robotMap, this.n)){
                    moved = true;
                    this.log(choice);
                }
            }

            return this.move(choice[0], choice[1]);
        }
        else if (this.me.unit === SPECS.PLANET) {
            var moved = false; 
            var choice = null;
            var y_shift = my_coord[0] << 8;

            if(newBot){
                this.signal(y_shift | x_shift);
            } else{
                this.signal(this.me.turn);
            }

        }
    }
    
    isPassable(loc, fullMap, robotMap, mapLen){
        this.log('loc ' + loc)

        var x = loc[0];
        var y = loc[1];
        this.log('location ' + x + ' ' + y)
        this.log('map ' + fullMap[x][y])
        this.log('robot map ' + robotMap[x][y])
        
        if (x >= mapLen || x < 0) {
            return false;
        } else if (y >= mapLen || y < 0) {
            return false;
        } else if (robotMap[x][y] > 0 || !fullMap[x][y]) {
            return false;
        } else {
            return true;
        }
    }

}

var robot = new MyRobot();