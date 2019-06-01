 var myGamePiece;
 var myObstacles=[];
 var myScore1;
 var myScore2;
 var play=1;
 var speedY1=3;
 var pause=false;
 var myButton;
 var GameArea;
 var interval;
 
 
 function startGame() 
 {
    GameArea.start();
	
	speedY1=3;
	 myObstacles=[];
	
}


 GameArea
 ={
    canvas : document.createElement("canvas"),
    
	start : function() {
		 myGamePiece=new Player(240,600,90,15,0,"red","blue");
		 myScore= new Score(370,20);
		myButton= new Button(0,700,60,700,415,700);
		 
		 this.canvas.width=480;
		 this.canvas.height=720;
		 this.context=this.canvas.getContext("2d");
		 
	
		 document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		 
		 this.frameNo=0;
		 interval=setInterval(updateGameArea,20);
		 
		 window.addEventListener('keydown', function (e) {
            GameArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            GameArea.key = false;
        });
		
		this.canvas.addEventListener("click" , function(event){
		if(event.x < myButton.x1 + 50 && event.x > myButton.x1 && 
		    event.y < myButton.y1 && event.y > myButton.y1 - 50)
		   pauseGame();
		
		else if(event.x < myButton.x2 + 50 && event.x > myButton.x2 && 
		    event.y < myButton.y2 && event.y > myButton.y2 - 50)
		   resumeGame();   
		   
		else if(event.x < myButton.x3 + 50 && event.x > myButton.x3 && 
		           event.y < myButton.y3  && event.y > myButton.y3 - 50)
		          restartGame();
				  
	})
		 
	 },
	 
	 clear: function()
	 {
		 this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	 },
	 
	 resume: function()
	 {
		 interval=setInterval(updateGameArea,20);
	 },
	 
	 
	 stop: function()
	 {
		 clearInterval(interval);
		 
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
 
 
function Button(x1,y1,x2,y2,x3,y3)
{
	
	this.x1=x1;
	this.x2=x2;
	this.x3=x3;
	this.y1=y1;
	this.y2=y2;
	this.y3=y3;
	
	this.update=function()
	{
	ctx=GameArea.context;

	
	ctx.fillStyle="white";
	ctx.font = "20px Trebuchet MS";
	ctx.fillText("Pause",this.x1,this.y1);
	
    ctx.fillStyle="white";
	ctx.font = "20px Trebuchet MS";
	ctx.fillText("Resume",this.x2,this.y2);
	
	ctx.fillStyle="white";
	ctx.font = "20px Trebuchet MS";
	ctx.fillText("Restart",this.x3,this.y3);
	
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
		speedY1+=0.2;
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
	
	myButton.update();
	
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
 
 
 function restartGame()
 {	
 	 pause=false;
	 GameArea.stop();
	
	 GameArea.clear();

	 startGame();
 }
 
 function pauseGame()
 {
	 
	 if (!pause)
	 {
		  pause=true;
		  
		  
	 GameArea.stop();
		return;
	 }
 }

function resumeGame()
{ 
	 if(pause)
	 {    pause=false;

		  GameArea.resume();
		  return;
		 
	 }
 
 }
 