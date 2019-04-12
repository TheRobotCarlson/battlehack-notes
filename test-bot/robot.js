import {BCAbstractRobot, SPECS} from 'battlecode';
import nav from './nav.js';
import util from './util.js';
import planet from './planet.js';
import voyager from './voyager.js';

class MyRobot extends BCAbstractRobot {
    constructor() {
        super();
        this.pendingRecievedMessages = {};
        this.enemyPlanets = [];
        this.myType = undefined;
        this.voyagersBuilt = 0;
        this.isHoReflect = true;
        this.mapLen = -1
    }

    turn() {
        if (this.me.turn === 1) {
            this.isHoReflect = nav.isHoReflect(this);
            this.mapLen = this.map.length;
        }
        if (this.myType === undefined){
            switch(this.me.unit) {
                case SPECS.VOYAGER:
                    this.myType = voyager;
                    break;
                case SPECS.PLANET:
                    this.myType = planet;
                    break;
            }
        }

        // this.step++; // step isn't useful; use this.me.turn

        return this.myType.takeTurn(this);

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


        // my_coords = [this.me.c, this.me.r];
        // my_team = this.me.team

        // this.log("unit: " + str(self.me['unit']) + "coords: " + str(location));

        // for(i=0; i < visible.length; i++){
        //     r = visible[i];
        //     if(!this.is_visible(r)){
        //         continue;
        //     }
            
        //     if(r.team != my_team){ // enemy
        //         if (this.me.unit === SPECS.VOYAGER) {
                   
        //         }
        //         else if (this.me.unit === SPECS.PLANET) {

        //         }
        //     } else { // my own units
        //         if (this.me.unit === SPECS.VOYAGER) {
              
        //         }
        //         else if (this.me.unit === SPECS.PLANET) {

        //         }
        //     }
        // }

    }
}

var robot = new MyRobot();