let userKey="adroi.adv";

let tokenKey="adroi.adv.token";

let timestampKey="adroi.adv.timestamp";

let lastPathKey="adroi.adv.lastPath";

let session=Object.create({
	
	getUser(){
	
		var user=localStorage.getItem(userKey)

		return user ? JSON.parse(user) : null;
	
	},
	
	setUser(user){
		
		var token=user ? user.token : null;
		
		token && this.setToken(token);
			
		delete user.token;
		
		localStorage.setItem(userKey,JSON.stringify(user));
		
	},
	
	getToken(){
		
		var token=localStorage.getItem(tokenKey);
		
		return token || null;
		
	},
	
	setToken(token){
		
		localStorage.setItem(tokenKey,token);
	
	},
	
	setLastPath(path){
		
		localStorage.setItem(lastPathKey,path);
	
	},
	
	getLastPath(){
		
		var path=localStorage.getItem(lastPathKey);
		
		return path || false;
		
	},
	
	getTimestamp(){
		
		var timestamp=localStorage.getItem(timestampKey);
		
		return +(timestamp || 0);
		
	},
	
	setTimestamp(timestamp){
		
		//default now
		timestamp=timestamp || 0;

		localStorage.setItem(timestampKey,timestamp);
	
	},
	
	resetTimestamp(){
		
		this.setTimestamp(+(new Date()));
		
	},
	
	isLogin(){
		
		var user=this.getUser();
		
		//logout
		if(!user)
			return false;
		
		var initTimestamp=this.getTimestamp();
	
		//logout
		if(initTimestamp===0)
			return false;
		
		var nowTimestamp=+(new Date());
		
		//30 minute
		var delta=30*60*1000;
		
		//not time out
		if(initTimestamp + delta > nowTimestamp)
			return true;

		//time out
		return false;
	},
	
	clear:function(){
		
		localStorage.removeItem(userKey);
		
		localStorage.removeItem(tokenKey);
		
		localStorage.removeItem(lastPathKey);
		
		localStorage.removeItem(timestampKey);
	}
	
});

export default session;