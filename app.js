
(function() {
    var canvas = document.getElementById('snow'),
        ctx = canvas.getContext("2d"),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        maxFlakes = 500,
        angle = 0,
        flakesArr = [];

    function initSnow() {
        canvas.width = windowWidth;
        canvas.height = windowHeight;

        for(var i = 0; i < maxFlakes; i++) {
            flakesArr.push({
                xCoordinate: Math.random()*windowWidth,
                yCoordinate: Math.random()*windowHeight,
                radius: Math.random()*4,
                density: Math.random()*maxFlakes
            })
        }
    };

    function drawSnow() {
        ctx.clearRect(0, 0, windowWidth, windowHeight);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for(var i = 0; i < flakesArr.length; i++) {
            var el = flakesArr[i];
            ctx.moveTo(el.xCoordinate, el.yCoordinate);
            ctx.arc(el.xCoordinate, el.yCoordinate, el.radius, 0, Math.PI*2, true);
        }
        ctx.fill();
        updateSnow();
    }

    function updateSnow() {
        angle += 0.01;
        
        for(var i = 0; i < flakesArr.length; i++) {
            var el = flakesArr[i];
            el.yCoordinate += Math.cos(angle + el.density) + 1 + el.radius/2;
            el.xCoordinate += Math.sin(angle) * 2;

            if(el.xCoordinate > windowWidth+5 || el.xCoordinate < -5 || el.yCoordinate > windowHeight) {
                if(i%3 > 0) {
                    flakesArr[i] = {
                        xCoordinate: Math.random()*windowWidth, 
                        yCoordinate: -10, 
                        radius: el.radius, 
                        density: el.density
                    };
                }
                else {
            
                    if(Math.sin(angle) > 0) {
            
                        flakesArr[i] = {
                            xCoordinate: -5, 
                            yCoordinate: Math.random()*windowHeight, 
                            radius: el.radius,
                            density: el.density
                        };
                    }
                    else {
                
                        flakesArr[i] = {
                            xCoordinate: windowWidth+5, 
                            yCoordinate: Math.random()*windowHeight, 
                            radius: el.radius, 
                            density: el.density
                        };
                    }
                }
            }
        }
    }


    initSnow();
    setInterval(drawSnow, 30);
}())