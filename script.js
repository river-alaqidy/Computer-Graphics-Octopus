function setUp() {
    var canvas = document.getElementById("myCanvas");
    var x = 0;
    var theta1 = 0;
    var theta2 = 0;

    function draw() {
        var context = canvas.getContext("2d");
        canvas.width = canvas.width;

        var stack = [ mat3.create() ];

        function moveToTx(x,y) {
            var res=vec2.create(); 
            vec2.transformMat3(res,[x,y],stack[0]); 
            context.moveTo(res[0],res[1]);
        }

	    function lineToTx(x,y) {
            var res=vec2.create(); 
            vec2.transformMat3(res,[x,y],stack[0]); 
            context.lineTo(res[0],res[1]);
        }       

        function octopus() {
            // head of octopus
            context.fillStyle = "purple";
            context.beginPath();
            moveToTx(-70,95);
            lineToTx(-70,-30);
            lineToTx(-40,-55);
            lineToTx(40,-55);
            lineToTx(70,-30);
            lineToTx(70,95);
            context.closePath();
            context.fill();

            // body of octopus
            context.beginPath();
            moveToTx(-50,75);
            lineToTx(50,75);
            lineToTx(110,125);
            lineToTx(110,200);
            lineToTx(50,250);
            lineToTx(-50,250);
            lineToTx(-110,200);
            lineToTx(-110,125);
            context.closePath();
            context.fill();

            // outer part of eyes
            context.fillStyle = "white";
            context.beginPath();
            moveToTx(-50,-30);
            lineToTx(-20,-30);
            lineToTx(-20,40);
            lineToTx(-50,40);
            context.closePath();
            context.fill();

            context.beginPath();
            moveToTx(50,-30);
            lineToTx(20,-30);
            lineToTx(20,40);
            lineToTx(50,40);
            context.closePath();
            context.fill();

            // inner part of eyes
            context.fillStyle = "grey";
            context.beginPath();
            moveToTx(-20,40);
            lineToTx(-35,40);
            lineToTx(-35,5);
            lineToTx(-20,5);
            context.closePath();
            context.fill();

            context.beginPath();
            moveToTx(20,40);
            lineToTx(35,40);
            lineToTx(35,5);
            lineToTx(20,5);
            context.closePath();
            context.fill();

            // mouth
            context.fillStyle = "white";
            context.beginPath();
            moveToTx(30,60);
            lineToTx(-30,60);
            lineToTx(-10,80);
            lineToTx(10,80);
            context.closePath();
            context.fill();        
        }

        function tentacle(color) {
            context.fillStyle = color;
            context.beginPath();
            moveToTx(0,-15);
            lineToTx(90,-15);
            lineToTx(90,15);
            lineToTx(0,15);
            context.closePath();
            context.fill();
        }
       
        var octopus_to_canvas = mat3.create();
        mat3.fromTranslation(octopus_to_canvas,[x,150]); // translate with variable x
        mat3.scale(octopus_to_canvas,octopus_to_canvas,[0.75,0.75]);
        mat3.multiply(stack[0],stack[0],octopus_to_canvas);
        octopus();

        stack.unshift(mat3.clone(stack[0]));

        var blue_to_body = mat3.create();
        mat3.fromTranslation(blue_to_body,[100,165]);
        mat3.rotate(blue_to_body,blue_to_body,theta2);
        mat3.multiply(stack[0],stack[0], blue_to_body);
        tentacle("blue");
        stack.unshift(mat3.clone(stack[0]));

        var orange_to_blue = mat3.create();
        mat3.fromTranslation(orange_to_blue,[90,0]);
        mat3.rotate(orange_to_blue,orange_to_blue,theta1);
        mat3.scale(orange_to_blue,orange_to_blue,[.75,1]);
        mat3.multiply(stack[0],stack[0], orange_to_blue);
        tentacle("orange");

        stack.shift();
        stack.shift();

        stack.unshift(mat3.clone(stack[0]));

        var pink_to_body = mat3.create();
        mat3.fromTranslation(pink_to_body,[85,105]);
        mat3.rotate(pink_to_body,pink_to_body,theta2);
        mat3.multiply(stack[0],stack[0], pink_to_body);
        tentacle("pink");
        stack.unshift(mat3.clone(stack[0]));

        var red_to_pink = mat3.create();
        mat3.fromTranslation(red_to_pink,[90,0]);
        mat3.rotate(red_to_pink,red_to_pink,theta1);
        mat3.scale(red_to_pink,red_to_pink,[.75,1]);
        mat3.multiply(stack[0],stack[0], red_to_pink);
        tentacle("red");

        stack.shift();
        stack.shift();

        stack.unshift(mat3.clone(stack[0]));

        var green_to_body = mat3.create();
        mat3.fromTranslation(green_to_body,[85,215]);
        mat3.rotate(green_to_body,green_to_body,Math.PI / 6 + theta2);
        mat3.multiply(stack[0],stack[0], green_to_body);
        tentacle("green");
        stack.unshift(mat3.clone(stack[0]));

        var yellow_to_green = mat3.create();
        mat3.fromTranslation(yellow_to_green,[90,0]);
        mat3.rotate(yellow_to_green,yellow_to_green,theta1);
        mat3.scale(yellow_to_green,yellow_to_green,[.75,1]);
        mat3.multiply(stack[0],stack[0], yellow_to_green);
        tentacle("yellow");

        stack.shift();
        stack.shift();

        stack.unshift(mat3.clone(stack[0]));

        var orange_to_body = mat3.create();
        mat3.fromTranslation(orange_to_body,[40,240]);
        mat3.rotate(orange_to_body,orange_to_body,Math.PI / 4 + theta2);
        mat3.multiply(stack[0],stack[0], orange_to_body);
        tentacle("orange");
        stack.unshift(mat3.clone(stack[0]));

        var pink_to_orange = mat3.create();
        mat3.fromTranslation(pink_to_orange,[90,0]);
        mat3.rotate(pink_to_orange,pink_to_orange,theta1);
        mat3.scale(pink_to_orange,pink_to_orange,[.75,1]);
        mat3.multiply(stack[0],stack[0], pink_to_orange);
        tentacle("pink");

        stack.shift();
        stack.shift();

        stack.unshift(mat3.clone(stack[0]));

        var red_to_body = mat3.create();
        mat3.fromTranslation(red_to_body,[-40,240]);
        mat3.rotate(red_to_body,red_to_body,3 *(Math.PI / 4) + theta2);
        mat3.multiply(stack[0],stack[0], red_to_body);
        tentacle("red");
        stack.unshift(mat3.clone(stack[0]));

        var green_to_red = mat3.create();
        mat3.fromTranslation(green_to_red,[90,0]);
        mat3.rotate(green_to_red,green_to_red,theta1);
        mat3.scale(green_to_red,green_to_red,[.75,1]);
        mat3.multiply(stack[0],stack[0], green_to_red);
        tentacle("green");

        stack.shift();
        stack.shift();

        stack.unshift(mat3.clone(stack[0]));

        var yellow_to_body = mat3.create();
        mat3.fromTranslation(yellow_to_body,[-85,215]);
        mat3.rotate(yellow_to_body,yellow_to_body,5 * (Math.PI / 6) + theta2);
        mat3.multiply(stack[0],stack[0], yellow_to_body);
        tentacle("yellow");
        stack.unshift(mat3.clone(stack[0]));

        var blue_to_yellow = mat3.create();
        mat3.fromTranslation(blue_to_yellow,[90,0]);
        mat3.rotate(blue_to_yellow,blue_to_yellow,theta1);
        mat3.scale(blue_to_yellow,blue_to_yellow,[.75,1]);
        mat3.multiply(stack[0],stack[0], blue_to_yellow);
        tentacle("blue");

        stack.shift();
        stack.shift();

        stack.unshift(mat3.clone(stack[0]));

        var orange_to_body2 = mat3.create();
        mat3.fromTranslation(orange_to_body2,[-100,165]);
        mat3.rotate(orange_to_body2,orange_to_body2,Math.PI + theta2);
        mat3.multiply(stack[0],stack[0], orange_to_body2);
        tentacle("orange");
        stack.unshift(mat3.clone(stack[0]));

        var red_to_orange = mat3.create();
        mat3.fromTranslation(red_to_orange,[90,0]);
        mat3.rotate(red_to_orange,red_to_orange,theta1);
        mat3.scale(red_to_orange,red_to_orange,[.75,1]);
        mat3.multiply(stack[0],stack[0], red_to_orange);
        tentacle("red");

        stack.shift();
        stack.shift();

        stack.unshift(mat3.clone(stack[0]));

        var green_to_body2 = mat3.create();
        mat3.fromTranslation(green_to_body2,[-85,115]);
        mat3.rotate(green_to_body2,green_to_body2,-3 * Math.PI / 4 + theta2);
        mat3.multiply(stack[0],stack[0], green_to_body2);
        tentacle("green");
        stack.unshift(mat3.clone(stack[0]));

        var pink_to_green = mat3.create();
        mat3.fromTranslation(pink_to_green,[90,0]);
        mat3.rotate(pink_to_green,pink_to_green,theta1);
        mat3.scale(pink_to_green,pink_to_green,[.75,1]);
        mat3.multiply(stack[0],stack[0], pink_to_green);
        tentacle("pink");

        stack.shift();
        stack.shift();
        
        theta1 = (theta1 + .1) % (.5 *Math.PI);
        theta2 = (theta2 - .05) % (.25 *Math.PI);
        x = (x + 5) % 1000;
        setTimeout(() => {
            window.requestAnimationFrame(draw);
          }, "100");
    }
    window.requestAnimationFrame(draw);
}
window.onload = setUp;