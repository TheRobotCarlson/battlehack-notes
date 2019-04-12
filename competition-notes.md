## General info
- Map
    - 30x30 - 40x40 tiles
    - tiled *grid*
    - horizontally or vertically symmetric
    - passable vs impassable tiles
        - passable - light gray
        - impassable - black - 0 orbs
    - full knowledge
    - enemy is in symmetric location

- round based, 256 rounds

- units (voyagers)
    - produced by planet
    - placed in a queue
    - 100 ms clock + 20ms of additional computation, max 200ms
        - possibly stackable
    - can move N, S, E, W
        - can't move beside teammate
    - has a unique id between 1 and 4096
    - can broadcast a 16-bit signal
    - vision radius squared radius of 4
        - [ ][ ][x][ ][ ]
        - [ ][x][x][x][ ]
        - [x][x][v][x][x]
        - [ ][x][x][x][ ]
        - [ ][ ][x][ ][ ]


# Strategy
General strategy notes

## Pathfinding
- single agent vs multi-agent cooperation
    - single 

- weighted 

## Gathering

## Enemy reaction

## Coordination / communication
- similar 
 

```
import {BCAbstractRobot, SPECS} from 'battlecode';

class MyRobot extends BCAbstractRobot {
    turn() {
        if (this.me.unit === SPECS.VOYAGER) {
            const choices = [[0,-1], [1, 0], [0, 1], [-1, 0]];
            const choice = choices[Math.floor(Math.random()*choices.length)]
            return this.move(choice[0], choice[1]);
        }
        else if (this.me.unit === SPECS.PLANET) {
            if (this.orbs >= 65536) {
                return this.buildUnit(0, 1)
            }
        }
    }
}

var robot = new MyRobot();
```