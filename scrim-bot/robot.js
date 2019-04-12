import {BCAbstractRobot, SPECS} from 'battlecode';

class MyRobot extends BCAbstractRobot {
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