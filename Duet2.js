 var myGamePiece;
 var myObstacles=[];
 var myScore;
 var myScore1;
 var myScore2;
 var meter;
 var score1=0;
 var play;
 var players;
 var speedY1=3;
 var pause=false;
 var myButton;
 var myHighScore;
 var GameArea;
 var interval;
 var highscores;;
 var oldscores;
 var keycode;
 var keycode1;
 var keycode2;
 var keycode3;
 var affection=false;
 var dist;
 
 function startScreen()
 {
	 score1=0;
	 speedY1=3;
	 myObstacles=[];
	
	 
	 document.getElementById("scorecard").style.display="none";

	 
	 var canvas=document.getElementById("canvas");
	 
	 var context=canvas.getContext("2d");

	 
	 
	 context.font="50px Trebuchet MS"
	 context.fillStyle="white";
	 context.fillText("Duet Game", 130,200);
	 
	 context.font="20px Trebuchet MS"
	 context.fillText("1. SinglePlayer", 180,500);
	 context.fillText("2. DoublePlayer", 180,550);
	 
	 keycode=0;
	 document.addEventListener("keydown", options) ;
	 
	 function options(e)
	 {
            keycode = e.keyCode;
			if(keycode==97||keycode==49)
			{				players=1;
				GameArea.start();
			}
			else if(keycode==98||keycode==50)
			{
				players=2;
				play=1;
				startplayers();
			}		
			keycode=0;
			document.removeEventListener("keydown",options);
	}
		
		
	
	 
 }
 



 GameArea
 ={
	 
	start: function() {
		score1=0;
	 speedY1=3;
	 affection=false;
	 myObstacles=[];
		if(players==1)
		{
		document.getElementById("scorecard").style.display="block";
		myScore= new Score(370,20);
		myHighScore=new highscore();
		myHighScore.initialize();
		}
		 
		 
		 else if(players==2 )
		 {
		 myScore1= new Score(370,20);
		 myScore2= new Score(20,20);
		 }
		 
		 
		 
		myGamePiece=new Player(240,600,90,15,0,"red","blue");
		myButton= new Button(0,700,60,700,415,700);
		myMeter=new meter(415,100,20,100);
		myMeter.level=0;
		 
	
		 this.context=canvas.getContext("2d");
		 
	
		 
		 this.frameNo=0;
		 interval=setInterval(updateGameArea,20);
		//alert(interval+" "+play);
		 
		 window.addEventListener('keydown', function (e) {
            GameArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            GameArea.key = false;
        });
		
		canvas.addEventListener("click" , function(event){
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
		 this.context.clearRect(0,0,canvas.width,canvas.height);
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
		 if(affection==true)
		 {
			 
			 if(dist>0)
			 {
				 
	this.theta+=0.1;	
myObstacles=[];	
	this.x1=this.X+dist*Math.cos(this.theta);
	 this.y1=this.Y+dist*Math.sin(this.theta);
	 
	 this.x2=this.X+dist*Math.cos(Math.PI+this.theta);
	 this.y2=this.Y+dist*Math.sin(Math.PI+this.theta);
		 
	 ctx=GameArea.context;
	 
	 ctx.strokeStyle="white";
	 ctx.beginPath();
	 ctx.arc(this.X,this.Y,dist,0,Math.PI*2,true);
	 ctx.stroke();
	 
	 ctx.fillStyle=this.color1;
	 ctx.beginPath();
	ctx.arc(this.x1, this.y1,this.radius,0,Math.PI*2,true);
	 ctx.fill();
	 
	 ctx.fillStyle=this.color2;
	 ctx.beginPath();
	 ctx.arc(this.x2, this.y2,this.radius,0,Math.PI*2,true);
	 ctx.fill();
				dist--;
			}
			else
			{				
			myGamePiece.Y=600;
			affection=false;
			}			 
		 }
	else
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
		 ctx.fillText("Win",canvas.width/2 - 10,canvas.height/2);
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

function meter(x,y,width,height)
{
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	var level=0;
	
	this.update=function()
	{
		ctx=GameArea.context;
		ctx.strokeStyle="white";
		ctx.strokeRect(this.x,this.y,this.width,this.height);
		
		ctx.font="20px Arial";
		ctx.fillStyle="#91FF00";
		ctx.fillText("Affection",this.x-23,this.y+20+this.height);
		
		
		ctx.fillStyle="#229736"
		if(level<=this.height)
		ctx.fillRect(this.x,this.y+this.height-level,this.width,level);
	
		else
		{		
				affection=true;
				dist=myGamePiece.BigRadius;
				level=0;
		}
	
	}
	
	this.newPos=function()
	{
		level+=0.05;
	}
}

 function updateGameArea()
 {
	 //check Crash
	 for(var i=0;i<myObstacles.length;i++)
	 {
		 if(myGamePiece.crashWith(myObstacles[i]))
		 { 
			if(players==1)
			{
			 GameArea.stop();
			myHighScore.trial();
			  return;
			}
			else if(players==2)
			{
				if(play==1)
				{
					play=2;
					score1=Math.floor(GameArea.frameNo/10);
					changeplayers();
					return;
				}
				
				else if(play==2)
				{
					score2=Math.floor(GameArea.frameNo/10);
					findwinner();
					return;
				}
			}
		 }
	 }
	 GameArea.clear();
	 
	 // obstacle
	  GameArea.frameNo += 1;
	  
	  if (players==1)
	  myHighScore.update( Math.floor(GameArea.frameNo/10));
	  
	  myGamePiece.turn=0;
	  
	  if (GameArea.key && GameArea.key == 37) {turnleft(); }
    if (GameArea.key && GameArea.key == 39) {turnright(); } 
	
	
	
    if (GameArea.frameNo == 1 || GameArea.frameNo%80==1) {
		speedY1+=0.2;
		var w=Math.floor(Math.random()*(canvas.width-20));
        myObstacles.push(new Obstacle(myGamePiece.BigRadius, 20, "yellow", w,0));
    }
	
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedY =speedY1;
		myObstacles[i].newPos();
        myObstacles[i].update();
    }
	 //score
	
	if(players==1)
	{
	 myScore.text="SCORE: " + Math.floor(GameArea.frameNo/10);
    myScore.update();
	}
	
	else if(players==2)
	{
		if(play==1)
		{
	 myScore1.text="SCORE1: " + Math.floor(GameArea.frameNo/10);
    myScore1.update();
	
	 myScore2.text="SCORE2: --";
    myScore2.update();
		}
		
		else if(play==2)
		{
	myScore2.text="SCORE2: " + Math.floor(GameArea.frameNo/10);
    myScore2.update();
	
	 myScore1.text="SCORE1: " + score1;
    myScore1.update();
	
	}
	}
	
    myGamePiece.newPos();    
    myGamePiece.update();
	
	myMeter.newPos();
	myMeter.update();
	
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
 if(players==1)	 
 myHighScore.trial();
 
 
 	 pause=false;
	 GameArea.stop();
	
	 GameArea.clear();

	 GameArea.start();
	 myObstacles=[];
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
 
 function highscore( )
 {
	this.initialize=function()
	 {
		 oldscores= JSON.parse(localStorage.getItem("high")) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		 highscores=JSON.parse(localStorage.getItem("high")) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		 
		 
		 for(var i=0;i<10;i++)
		 {
			 document.getElementById("scorecard").rows[i+1].cells[1].innerHTML=oldscores[i];
		 }
	 }
	 
	 
	 this.update=function(score)
	 {
		 
	 pos=10;
	 	 var table=document.getElementById("scorecard");
		 
	 for( var i=0;i<=9;i++)
	 {
			if(score>oldscores[i])
			{
				pos=i;
				break;
				
			}
	 }
	 
	 if(pos!=10)
	 {
	 for( var j=pos+1;j<10;j++)
					{
						highscores[j]=oldscores[j-1];

					}
				
	highscores[pos]=score;
	 }
	 
	for( var i=0;i<10;i++)
	{
		document.getElementById("scorecard").rows[i+1].cells[1].innerHTML=highscores[i];
	}
	 }
	 
this.trial=function()
{
	
	localStorage.setItem("high",JSON.stringify(highscores));
	 
 }
 }
 
 
 function startplayers()
 {
	 context=canvas.getContext("2d");
	 context.clearRect(0,0,canvas.width,canvas.height);
	context.font="20px Trebuchet MS"
	 context.fillStyle="blue";
	 context.fillText("Player1 Press Space to start", 100,300);
	 keycode1=0;
	 document.addEventListener('keydown', start);
	 
		
		function start(e)
		{
			keycode1=e.keyCode;
		if(keycode1==32)
		{
			GameArea.start();
	 myObstacles=[];
	 document.removeEventListener('keydown',start);
		}
		}
		
 }
 


function findwinner()
{
	pause=false;
	 GameArea.stop();
	 GameArea.clear();
	  var context=canvas.getContext("2d");
	  
	  if(score1>score2)
	  {
		  context.font="30px Trebuchet MS"
	 context.fillStyle="green";
	 context.fillText("Player1 Wins", 130,200);
	  }
	  
	  else if(score1<score2)
	  {
		  context.font="30px Trebuchet MS"
	 context.fillStyle="green";
	 context.fillText("Player2 Wins", 130,200);
	  }
	  
	  else if(score1==score2)
	  {
		  context.font="30px Trebuchet MS"
	 context.fillStyle="green";
	 context.fillText("Tie", 150,200);
	  }
	  
	   context.font="20px Trebuchet MS"
	 context.fillStyle="white";
	 context.fillText("Esc to go back to menu", 100,400);
	  
	  keycode3=0;
	 document.addEventListener('keydown', win1);
		
function win1(e)
	{
		 keycode2 = e.keyCode;
		if(keycode2==27)
		{
			keycode2=0;
			context.clearRect(0,0,canvas.width,canvas.height);
			startScreen();
			document.removeEventListener('keydown', win1);
			
	 
		}
	}
}

 function changeplayers()
 {

	 play=2;
	 pause=false;
	 GameArea.stop();
	 GameArea.clear();
	 speedY1=3;
	 myObstacles=[];
	  var context=canvas.getContext("2d");
	  context.clearRect(0,0,canvas.width,canvas.height);
	  
	  context.font="30px Trebuchet MS"
	 context.fillStyle="red";
	 context.fillText("Player1 Score:"+ score1, 130,100);
	 
	 context.font="20px Trebuchet MS"
	 context.fillStyle="blue";
	 context.fillText("Player2 Press Space to start", 100,300);
	 
	 keycode2=0;
	 document.addEventListener('keydown', change);
		
function change(e)
	{
		 keycode2 = e.keyCode;
		if(keycode2==32)
		{
			keycode2=0;
			GameArea.start();
	        myObstacles=[];
			document.removeEventListener('keydown', change);
			
	 
		}
	}
	 	  	 
 }
 
 