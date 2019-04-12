//function to check if there is a unit adjacent 
    isUnitAdjacent(this_bot, new_coord, robotMap){

        var x_cur = this.r;
        var y_cur = this.c;
        
        var x_new = new_coord[0];
        var y_new = new_coord[1];

        var cur_coord = [x_cur, y_cur];

        var move_up = [x_new +1, y_new];
        var move_down = [x_new -1, y_new];
        var move_left = [x_new, y_new -1];
        var move_right = [x_new, y_new +1]
        if (move_up > 0 && !(move_up == cur_coord){
            return true;
        } else if (move_down > 0 && !(cur_coord == move_down)){
            return true;
        } else if (move_left > 0 && !(cur_coord == move_left)){
            return true;
        } else if (move_right > 0 && !(cur_coord == move_right)){
            return true;
        } else {
            return false;
        }


    }
