//needs vector2D.js 



 var Enemy = function(x,y, radius, color){
	this.x = x;
	this.y = y; 
	this.radius = radius;
	this.color = color; 
	this.health;
	

	//sets different speeds and behaviors for circles 
	if(this.color == "red"){
	
	this.maxSpeed = getRandomDecimal(.5,.9);
	this.health = 1;
	
	}
	
	if( this.color == "green"){
		this.maxSpeed = getRandomDecimal(1,2);
		this.health = 1;
	
	}
	
	if( this.color == "blue"){
	this.maxSpeed = .5;
	this.radius = 10;
	this.health = 1;
	
	}
	
	if( this.color == "purple"){
		this.radius = 15;
		this.maxSpeed = getRandomDecimal(.5,2);
		this.health = 10;
		
	}
	
	
	
	this.enemyState = "alive";
	
	this.location = new Vector2D(this.x,this.y);
	this.velocity = new Vector2D(0,0);
	this.acceleration = new Vector2D(0,0);
	
		
	this.desiredVelocity = new Vector2D(0,0);
	this.steer = new Vector2D(0,0);
	
	this.vector = this.location.subtract(this.velocity);
	


}

Enemy.prototype = {

	draw: function(ctx){
				ctx.beginPath();
				ctx.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false);
				ctx.closePath();
				ctx.fillStyle = this.color;
				ctx.fill();
				ctx.closePath();
				
				
	
	},
	
	move: function(){
		this.velocity.incrementBy(this.acceleration);
		if( this.velocity >= this.maxSpeed){
			this.velocity == this.maxSpeed;
		}
		this.location.incrementBy(this.velocity);
		this.acceleration.scaleBy(0);
	
		
		
		
	},
	//param must be a vector
	seek: function(targetVector){
		 this.desiredVelocity = targetVector.subtract(this.location);
		this.desiredVelocity.normalize();
		this.desiredVelocity.scaleBy(this.maxSpeed);
		this.steer = this.desiredVelocity.subtract(this.velocity);
		if( this.steer >= this.maxSpeed){
				this.steer == this.maxSpeed;
		
		}
		
		if(this.enemyState == 1){
					this.maxSpeed = 0;
					
				
				}
		this.acceleration.incrementBy(this.steer);
	
	},
	
	flee: function(targetVector){
		 this.desiredVelocity = this.location.subtract(targetVector);
		this.desiredVelocity.normalize();
		this.desiredVelocity.scaleBy(this.maxSpeed);
		this.steer = this.desiredVelocity.subtract(this.velocity);
		if( this.steer >= this.maxSpeed){
				this.steer == this.maxSpeed;
		
		}
		
		if(this.enemyState == 1){
					this.maxSpeed = 0;
					
				
				}
		this.acceleration.incrementBy(this.steer);
	
	},
	
	//function to check the boundaries of a specified area
	//array param is the array item you want to check. ex. enemies[i]
	//vector param is the vector you want to flee from
		checkBounds: function(array,x,y,w,h){
		//if(array.location.x >= x && array.location.x <= x + w && array.location.y >= y && array.location.y <= y + h){
			//array.flee(vector);
			var a = array.location;
			var r = x+w+array.radius-3;
			var b = y+h+array.radius-3;
			var l = x-array.radius+3;
			var t = y-array.radius+3;
			
			if(a.x >= l && a.x <= r && a.y >= t && a.y <= b){
				if(a.x >= l && a.x <= l+4) a.x = l-1;
				else if(a.x <= r && a.x >= r-4) a.x = r+1;
				else if(a.y >= t && a.y <= t+4) a.y = t-1;
				else if(a.y <= b && a.y >= b-4) a.y = b+1;
		
		
			}		
					
					
		//}
		
		
		
	}
	
	
	
	
	



};