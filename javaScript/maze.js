(function () {
    var mazeGenerator = {
        map    : [],
        WIDTH  : 50,
        HEIGHT : 30,
 
        DIRECTIONS : {
            'N' : { dy: -1, opposite: 'S' },
            'S' : { dy:  1, opposite: 'N' },
            'E' : { dx:  1, opposite: 'W' },
            'W' : { dx: -1, opposite: 'E' }
        },
 
        prefill : function () {
            for (var x = 0; x < this.WIDTH; x++) {
                this.map[x] = [];
                for (var y = 0; y < this.HEIGHT; y++) {
                    this.map[x][y] = {};
                }
            }
        },
 
        shuffle : function (o) {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },
 
        carve : function (x0, y0, direction) {
            //console.log('[%d, %d, "%s"]', x0, y0, direction);
 
            var x1 = x0 + (this.DIRECTIONS[direction].dx || 0),
                y1 = y0 + (this.DIRECTIONS[direction].dy || 0);
 
            if (x1 == 0 || x1 == this.WIDTH || y1 == 0 || y1 == this.HEIGHT) {
                return;
            }
 
            if ( this.map[x1][y1].seen ) {
                return;
            }
 
            this.map[x0][y0][ direction ] = true;
            this.map[x1][y1][ this.DIRECTIONS[direction].opposite ] = true;
            this.map[x1][y1].seen = true;
 
            var directions = this.shuffle([ 'N', 'S', 'E', 'W' ]);
            for (var i = 0; i < directions.length; i++) {
                this.carve(x1, y1, directions[i]);
            }
        },
 
        output : function () {
            var output = '';
            for (var y = 0; y < this.HEIGHT; y++) {
                for (var x = 0; x < this.WIDTH; x++) {
                    output += ( this.map[x][y].S ? ' ' : '_' );
                    output += ( this.map[x][y].E ? ' ' : '!' );
                }
                output += '\n';
            }
            output = output.replace(/_ /g, '__');
            console.log(output);
        }
    };
 
    mazeGenerator.prefill();
    mazeGenerator.carve(mazeGenerator.WIDTH/2, mazeGenerator.HEIGHT/2, 'N');
    mazeGenerator.output();
})();
