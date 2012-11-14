
function FluxUI_Workspace(cfg, callback){
	var self = this;
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
			if(cfg.launchbars.top){
				if(cfg.launchbars.top===true){
					cfg.launchbars.top = {
						name: 'top_launchbar',
						isDefault: true,
						height: 50
					};
				}
				cfg.launchbars.top.workspace = self;
				new FluxUI.Launchbar(cfg.launchbars.top, function(lb){
					self.launchbars.top = lb;
					if(this.rendered){
						//self.launchbars.top.render();
					}
				});
			}
			
			if(cfg.launchbars.left){
				
			}
			
			if(cfg.launchbars.right){
				
			}
			
			if(cfg.launchbars.bottom){
				
			}
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
				driverWorkspace.getBody.call(this, function(bd){
					callback(bd);
				});
				return true;
			}else{
				return driverWorkspace.show.apply(this);	
			}
		}
		console.log('No Driver Loaded');
		
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
