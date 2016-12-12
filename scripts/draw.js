var graphics;

var drawInitalState = function () {
    graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(370, 220);
    graphics.lineTo(370, 40);
    graphics.lineTo(300, 40);
    graphics.lineTo(300, 70);
    graphics.drawCircle(300, 95, 50);
    graphics.beginFill(constants.blackColor);
    graphics.drawCircle(310, 88, 4);
    graphics.drawCircle(290, 88, 4);
    graphics.endFill();
    graphics.moveTo(290, 110);
    graphics.lineTo(315, 100);
};

var drawBody = function () {
    graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 120);
    graphics.lineTo(300, 190);
};

var drawLeftHand = function () {
    graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 135);
    graphics.lineTo(260, 165);
};

var drawRightHand = function () {
    graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 135);
    graphics.lineTo(340, 165);
};

var drawLeftLeg = function () {
    graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 190);
    graphics.lineTo(255, 225);
};

var drawRightLeg = function () {
    graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(300, 190);
    graphics.lineTo(345, 225);
    drawXeyes();
};

var drawXeyes = function () {
    graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.whiteColor);
    graphics.beginFill(constants.whiteColor);
    graphics.drawCircle(310, 88, 4);
    graphics.drawCircle(290, 88, 4);
    graphics.endFill();
    graphics.lineStyle(4, constants.blackColor);
    graphics.moveTo(285, 84);
    graphics.lineTo(295, 94);
    graphics.moveTo(295, 84);
    graphics.lineTo(285, 94);
    graphics.moveTo(305, 84);
    graphics.lineTo(315, 94);
    graphics.moveTo(315, 84);
    graphics.lineTo(305, 94);
};

var drawHappyFace = function () {
    graphics = game.add.graphics(0, 0);
    graphics.lineStyle(4, constants.whiteColor);
    graphics.moveTo(290, 110);
    graphics.lineTo(315, 100);
    graphics.lineStyle(4, constants.blackColor);    
    graphics.arc(300, 100, 10, 0, Math.PI)
};