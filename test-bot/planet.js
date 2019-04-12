import {BCAbstractRobot, SPECS} from 'battlecode';
import nav from './nav.js.js';
import util from './util.js.js';

const planet = {};

planet.takeTurn = (self) => {
    self.log('planet taking turn')
    var visiblebots = self.getVisibleRobots()

    if (this.orbs >= 65536) {
        return this.buildUnit(0, 1);
    }
}

export default planet;
