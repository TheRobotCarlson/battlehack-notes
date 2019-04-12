import {BCAbstractRobot, SPECS} from 'battlecode';
import nav from './nav.js.js';
import util from './util.js.js';

const voyager = {};

voyager.takeTurn = (self) => {
    self.log('voyager taking turn')
    var visiblebots = self.getVisibleRobots()

    // On the first turn, find our base
    if (!self.planet) {
        self.planet = visiblebots.filter(robot => robot.team === self.me.team && robot.unit === SPECS.PLANET)[0];
    }

    const choices = [[0,-1], [1, 0], [0, 1], [-1, 0]];
    const choice = choices[Math.floor(Math.random()*choices.length)]
    return this.move(choice[0], choice[1]);

    // if we don't have a destination, figure out what it is.
    // if (!self.destination) {
    //     // need to figure out if 1st or 2nd voyager: if 1st get karb, else fuel
    //     if (visiblebots
    //         .filter(robot => robot.team === self.me.team && robot.unit === SPECS.VOYAGER).length > 1){
    //         // can see another voyager on my team
    //         self.resourceDestination = nav.getClosestRsrc(self.me, self.getFuelMap());
    //     } else {
    //         self.resourceDestination = nav.getClosestRsrc(self.me, self.getKarboniteMap());
    //     }
    //     self.destination = self.resourceDestination;
    // }

    // // If we're near our destination, do the thing
    // if (self.me.karbonite === SPECS.UNITS[self.me.unit].KARBONITE_CAPACITY
    //         || self.me.fuel === SPECS.UNITS[self.me.unit].FUEL_CAPACITY) {
    //     self.destination = self.planet;
    //     if (nav.sqDist(self.me, self.destination) <= 2) {
    //         self.destination = self.resourceDestination
    //         return self.give(
    //             self.planet.x - self.me.x,
    //             self.planet.y - self.me.y,
    //             self.me.karbonite,
    //             self.me.fuel);
    //     }
    // } else {
    //     if (nav.sqDist(self.me, self.destination) === 0) {
    //         return self.mine();
    //     }
    // }
    // If we have nothing else to do, move to our destination.
    const choice = nav.goto(self, self.destination);

    return self.move(choice.x, choice.y);
}



export default voyager;
