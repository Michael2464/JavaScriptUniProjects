function shotToCenter(x, y, x0, y0, points, lose){
    x0 = x0 || 0;
    y0 = y0 || 0;
    points = points || 10;
    lose = lose || 0;
        
    return (x===x0 && y === y0) ? points : lose;
}

function shotToRomb(x, y, x0, y0, radius, points, lose){
    x0 = xo || 0;
    y0 = yo || 0;
    radius = radius || 1;
    points = points || 3;
    lose = lose || 0;

    return (Math.abs(x-x0) + Math.abs(y-y0) < radius) ? points : lose;
}

function shotToCircle(x, y, x0, y0, radius, points, lose){
    x0 = x0 || 0;
    y0 = y0 || 0;
    radius = radius || 1;
    points = points || 2;
    lose = lose || 0;

    return ((x-x0)**2 + (y-y0)**2 < radius) ? points : lose;
}

function shotToStar(x, y, x0, y0, radius, points, lose){
    x0 = x0 || 0;
    y0 = y0 || 0;
    radius = radius || 1;
    points = points || 4;
    lose = lose || 0;

    return (Math.pow((x-x0), 2/3) + Math.pow((y-y0), 2/3) < radius) ? points : lose;
}

function shotToSquare(x, y, x0, y0, radius, points, lose){
    x0 = xo || 0;
    y0 = yo || 0;
    radius = radius || 1;
    points = points || 1;
    lose = lose || 0;

    return ((x-x0)**2 + (y-y0)**2 > radius && (Math.abs(x-x0) < raduis && Math.abs(y-y0) < radius)) ? points : lose;
}

var params = {
    n: 20,  
    nSelf: [{x:0.9, y:0.3}, {x:1, y:1}], 
    D: 4,
    x: 0,
    y: 0,
    x0: 0,
    y0: 0,
    radius: 1,
    starPoints: 4,
    rombPoints: 3,
    circlePoints: 2,
    squarePoints: 1,
    centerPoints: 200,
    pointsLose: -4
};

function shotToTarget(params){
    if(params){
        var x = params.x;
        var y = params.y;
        var n = params.n;
        var nSelf = params.nSelf || [];
        var x0 = params.x0;
        var y0 = params.y0;
        var r = params.radius;
        var star = params.starPoints;
        var romb = params.rombPoints;
        var circle = params.circlePoints;
        var square = params.squarePoints;
        var center = params.centerPoints;
    }    
    if(!isNaN(x) && !isNaN(y))
    {
        return shotToCenter(x, y, x0, y0, r, center, -1)  || 
               shotToStar(  x, y, x0, y0, r, star,   -2)  ||
               shotToRomb(  x, y, x0, y0, r, romb,   -3)  || 
               shotToCircle(x, y, x0, y0, r, circle, -4)  || 
               shotToSquare(x, y, x0, y0, r, square, -5);
    }
    return 0;
}

// * User chooses what figures to shot
// shots (n amount) but it does it by itself, add new parameter where we can give
// amount of shots made oneself. array of objects
// * Add user interface
// *** 3D space!!! target is on a plane and has an angle, figure this out !!!!
// HOPEWORK: FIX THE FUCKING CODE  


/*
        params
    n (integer) - amount of automatic shots
    nSelf (integer) - amount of automatic shots 
    D (integer) - max range for coordinate (x, y) 
*/

function shots(params) {
    let result = {
        score: 0,
        accuracy: 0
    };

    if(params)
    {
        if(isNaN(params.n) || params.n < 0)
            return;

        for (let i = 0; i < params.n; i++)
        {
            params.x = Math.random() * params.D - params.D/2;
            params.y = Math.random() * params.D - params.D/2;
            
            let points = shotToTarget(params);
            console.log(params.x + ', ' + params.y + ': ' + points);
            result.score += points;
            result.accuracy += points > 0 ? 1/(params.n+params.nSelf.length) : 0;
        }
        
        if(params.nSelf.length){
            for (let i = 0; i < params.nSelf.length; i++) {
                params.x = params.nSelf[i].x;
                params.y = params.nSelf[i].y;
                let points = shotToTarget(params);
                result.score += points;
                result.accuracy += points > 0 ? 1/(params.n + params.nSelf.length) : 0;
            }  
        }  
    
        console.log("-------------------\nScore: " + result.score);
        console.log("Accuracy: " + result.accuracy);
        return;
    }
    console.log("Something went wrong");
}


var radius = 1;

function drawCanvas(){
    const canvas = document.getElementById("myCanvas");
    if(canvas.getContext){
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * radius, true); // Outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * radius, true); // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * radius, true); // Right eye
        ctx.stroke();
    }


}









