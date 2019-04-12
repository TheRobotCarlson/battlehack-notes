import {BCAbstractRobot, SPECS} from 'battlecode';


class MyRobot extends BCAbstractRobot {

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

        var map = this.map;
        var robotMap = this.getVisibleRobotMap();
        // var mapLen = this.n;

        if (this.me.unit === SPECS.VOYAGER) {
            var moved = false;
            var choice = null;
            const choices = [[0,-1], [1, 0], [0, 1], [-1, 0]];
            var my_coord = [this.me.r, this.me.c];

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
            const choices = [[0,-1], [1, 0], [0, 1], [-1, 0]];
            var choice = null;

            if (this.orbs >= 65536) {
                while(!moved){
                    choice = choices[Math.floor(Math.random()*choices.length)];
                    var new_coord = [this.me.r + choice[0], this.me.c + choice[1]]

                    if(this.isPassable(new_coord, map, robotMap, this.n)){
                        moved = true;
                        this.log(choice);
                    }
                }

                return this.buildUnit(choice[0], choice[1]);
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

    maxCostPath(cost, n, loc, endGoal){ 
        var i = 0, j = 0; 

        // Instead of following line, we can use int tc[m+1][n+1] or  
        // dynamically allocate memory to save space. The following line is 
        // used to keep the program simple and make it working on all compilers. 
        let tc = new Array(n).fill(null).map(item =>(new Array(n).fill(null)))   

        tc[0][0] = cost[0][0]; 

        /* Initialize first column of total cost(tc) array */
        for (i = 1; i <= n; i++){ 
            tc[i][0] = tc[i-1][0] + cost[i][0];
        } 

        /* Initialize first row of tc array */
        for (j = 1; j <= n; j++){
            tc[0][j] = tc[0][j-1] + cost[0][j]; 
        }

        /* Construct rest of the tc array */
        for (i = 1; i <= n; i++){
            for (j = 1; j <= n; j++) {
                tc[i][j] = min(tc[i-1][j-1], tc[i-1][j], tc[i][j-1]) + cost[i][j]; 
            }
        }
        this.log(tc);
        return tc[n][n]; 
    } 
}

var robot = new MyRobot();