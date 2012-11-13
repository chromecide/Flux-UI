function FluxUI_Workspace(){
	this.launcbars = {
		top: false,
		left: false,
		right: false,
		bottom: false
	}
	this.init = function(cfg, callback){
		FluxUI.emit('FluxUI.Workspace.InitStarted', cfg);
		
		if((typeof cfg)=='function'){
			callback = cfg;
			cfg = {};
		}
		
		if(callback){
			callback(this);
		}
		
		FluxUI.emit('FluxUI.Workspace.InitComplete', cfg);
	}
}

	FluxUI_Workspace.prototype.getSize = function(){
		var e = window;
	    var a = 'inner';
	    if (!('innerWidth' in window)){
	        a = 'client';
	        e = document.documentElement || document.body;
	    }
	    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
	}
	
	FluxUI_Workspace.prototype.configure = function(cfg, callback){
		
	}

define(FluxUI_Workspace);
