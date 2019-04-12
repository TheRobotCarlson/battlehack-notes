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

        if (this.me.unit === SPECS.VOYAGER) {
            const moved = false;         
            const choices = [[0,-1], [1, 0], [0, 1], [-1, 0]];
            while(!moved){
                choice = choices[Math.floor(Math.random()*choices.length)];
                if(this.map[this.me.c + choice[0]][this.me.r + choice[1]]){
                    moved = true;
                }
            }

            return this.move(choice[0], choice[1]);
        }

        else if (this.me.unit === SPECS.PLANET) {
            const moved = false; 
            const choices = [[0,-1], [1, 0], [0, 1], [-1, 0]];

            if (this.orbs >= 65536) {
                while(!moved){
                    choice = choices[Math.floor(Math.random()*choices.length)];
                    if(this.map[this.me.c + choice[0]][this.me.r + choice[1]]){
                        moved = true;
                    }
                }

                return this.buildUnit(choice[0], choice[1]);
            }
        }

    }
}

var robot = new MyRobot();