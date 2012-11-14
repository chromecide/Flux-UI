
function FluxUI_Workspace(cfg, callback){
	this.name = 'default';
	this.isDefault = false;
	this.launchbars = {
		top: false,
		left: false,
		right: false,
		bottom: false
	}
	
	if(cfg){
		if(cfg.name){
			this.name = cfg.name;
		}
		
		if(cfg.isDefault==true){
			this.isDefault = true;
		}
		
		if(cfg.launchbars){
			this.launchbars = cfg.launchbars;
		}
	}
	
	if(callback){
		callback(this);
	}
	
	FluxUI.emit('FluxUI.Workspace.Ready', this);
}

	FluxUI_Workspace.prototype.getBody = function(callback){
		var driverWorkspace = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Workspace? FluxUI.FluxUI_Settings.driver.object.Workspace:{};
		if(driverWorkspace && driverWorkspace.getBody){
			if(callback){
				driverWorkspace.getBody.apply(function(bd){
					callback(bd);
				});
				return true;
			}else{
				return driverWorkspace.show.apply(this);	
			}
		}
		console.log('No Driver Loaded');
		if(callback){
			callback(false);
		}
		return false;
	}

	FluxUI_Workspace.prototype.show = function(callback){
		
		var driverWorkspace = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Workspace? FluxUI.FluxUI_Settings.driver.object.Workspace:{};
		
		if(driverWorkspace && driverWorkspace.show){
			if(callback){
				driverWorkspace.show.apply(this, function(){
					callback(true);
				});
			}else{
				return driverWorkspace.show.apply(this);	
			}
			
		}else{
			console.log('No Driver Loaded');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}
	
	FluxUI_Workspace.prototype.render = function(callback){
		
		var driverWorkspace = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Workspace? FluxUI.FluxUI_Settings.driver.object.Workspace:{};
		
		if(driverWorkspace && driverWorkspace.render){
			if(callback){
				driverWorkspace.render.call(this, function(elem){
					callback(this);
				});
			}else{
				return driverWorkspace.show.apply(this);
			}
			
		}else{
			console.log('No Driver Loaded');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}
	
	FluxUI_Workspace.prototype.hide = function(callback){
		console.log('No Driver Loaded');
		if(callback){
			callback(false);
		}
		return false;
	}

	FluxUI_Workspace.prototype.getSize = function(callback){
		var driverWorkspace = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Workspace? FluxUI.FluxUI_Settings.driver.object.Workspace:{};
		var size = false;
		if(driverWorkspace && driverWorkspace.getSize){
			size = driverWorkspace.getSize.apply(this, arguments);
		}else{
			var e = window;
		    var a = 'inner';
		    if (!('innerWidth' in window)){
		        a = 'client';
		        e = document.documentElement || document.body;
		    }
		    size =  { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
		}
		if(callback){
			callback(size);
		}
		return size;
	}
	
	FluxUI_Workspace.prototype.configureLaunchbars = function(cfg, callback){
		console.log(cfg);
	}
	

define([], function(){
	return FluxUI_Workspace;
});
