 var myGamePiece;
 var myObstacles=[];
 var myScore;
 var speedY1=3;
 
 function startGame() 
 {
    GameArea.start();
}


 var GameArea
 ={
    canvas : document.createElement("canvas"),
    
	start : function() {
		 myGamePiece=new Player(240,600,90,15,0,"red","blue");
		 myScore= new Score(370,20);
		 
		 this.canvas.width=480;
		 this.canvas.height=720;
		 this.context=this.canvas.getContext("2d");
		 
	
		 document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		 
		 this.frameNo=0;
		 this.interval=setInterval(updateGameArea,20);
		 
		 window.addEventListener('keydown', function (e) {
            GameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            GameArea.key = false;
        })
		 
	 },
	 
	 clear: function()
	 {
		 this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	 },
	 
	 stop: function()
	 {
		 clearInterval(this.interval);
	 }
 }
 
 
 function Obstacle(width, height, color, X, Y)
 {
	 
	 this.width=width;
	 this.height=height;
	 this.X=X;
	 this.Y=Y;
     this.speedY = 0; 
	 this.color=color;
	 
	 this.update=function()
	 {
		 ctx=GameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.X, this.Y, this.width, this.height);
		 
	 }
	 
	 
	 this.newPos=function()
	 {
		 
		 this.Y+=this.speedY;
	 }
	
	
 
 }
 

 function Player(X,Y,BigRadius,radius,theta,color1,color2)
 {
	 this.X=X;
	 this.Y=Y;
	 this.theta=theta;
	 this.BigRadius=BigRadius;
	 this.radius=radius;
	 this.color1=color1;
	 this.color2=color2;
	 this.turn = 0;
	 
	 
	 
	 this.update=function()
	 {
	 this.x1=this.X+this.BigRadius*Math.cos(this.theta);
	 this.y1=this.Y+this.BigRadius*Math.sin(this.theta);
	 
	 this.x2=this.X+this.BigRadius*Math.cos(Math.PI+this.theta);
	 this.y2=this.Y+this.BigRadius*Math.sin(Math.PI+this.theta);

	 ctx=GameArea.context;
	 
	 ctx.strokeStyle="white";
	 ctx.beginPath();
	 ctx.arc(this.X,this.Y,this.BigRadius,0,Math.PI*2,true);
	 ctx.stroke();
	 
	 ctx.fillStyle=this.color1;
	 ctx.beginPath();
	ctx.arc(this.x1, this.y1,this.radius,0,Math.PI*2,true);
	 ctx.fill();
	 
	 ctx.fillStyle=this.color2;
	 ctx.beginPath();
	 ctx.arc(this.x2, this.y2,this.radius,0,Math.PI*2,true);
	 ctx.fill();
	 }
 
	this.newPos=function()
	{
		this.theta+=this.turn;	
		this.Y-=0.1;
	}
 
	this.crashWith=function(object)
	{
		var crash=false;
		
		if(this.x1 < object.X + object.width + this.radius && this.x1 > object.X - this.radius  && 
		   this.y1 < object.Y + object.height + this.radius && this.y1 > object.Y - this.radius)
			crash=true;
		
		else if(this.x2 < object.X + object.width + this.radius && this.x2 > object.X - this.radius  && 
		          this.y2 < object.Y + object.height + this.radius && this.y2 > object.Y - this.radius)
			crash=true;
		
		return crash;
	}
 }
 
 
 function Score(x,y)
 {
	 this.x=x;
	 this.y=y;
	 
	 
	 this.update=function()
	 {
		 ctx=GameArea.context;
	 ctx.font = "20px Trebuchet MS";
	 ctx.fillStyle = "white";
     ctx.fillText(this.text, this.x, this.y);
	 }
	 
	 this.win=function()
	 {
		 ctx=GameArea.context;
		 ctx.font="30px Arial";
		 ctx.fillStyle="white";
		 ctx.fillText("Win",GameArea.canvas.width/2 - 10,GameArea.canvas.height/2);
	 }
	 
 }
 
 function updateGameArea()
 {
	 //check Crash
	 for(var i=0;i<myObstacles.length;i++)
	 {
		 if(myGamePiece.crashWith(myObstacles[i]))
		 {
			 
			 GameArea.stop();
			 return;
		 }
	 }
	 GameArea.clear();
	 
	 // obstacle
	  GameArea.frameNo += 1;
	  myGamePiece.turn=0;
	  if (GameArea.key && GameArea.key == 37) {turnleft(); }
    if (GameArea.key && GameArea.key == 39) {turnright(); } 
	
    if (GameArea.frameNo == 1 || GameArea.frameNo%80==1) {
		speedY1+=0.1;
		var w=Math.floor(Math.random()*(GameArea.canvas.width-20));
        myObstacles.push(new Obstacle(myGamePiece.BigRadius, 20, "yellow", w,0));
    }
	
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedY =speedY1;
		myObstacles[i].newPos();
        myObstacles[i].update();
    }
	 //score
	
	 myScore.text="SCORE: " + Math.floor(GameArea.frameNo/10);
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
	
	if(myGamePiece.Y==myGamePiece.BigRadius)
	{
		GameArea.stop();
		myScore.win(0,0);
		
	}
	 
 }
 
 function turnleft()
 {
	 myGamePiece.turn=-0.1;
 }
 
  function turnright()
 {
	 myGamePiece.turn=+0.1;
 }
 
 function clearmove()
 {
	 myGamePiece.turn=0;
 }
 