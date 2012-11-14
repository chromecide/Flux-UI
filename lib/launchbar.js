
function FluxUI_Launchbar(cfg, callback){
	var self = this;
	this.size = {
		width: 100,
		height: 50
	};
	this.location = 'top';
	
	if(cfg){
		if(cfg.workspace){
			self.workspace = cfg.workspace;
		}
		if(cfg.height){
			self.size.height = cfg.height;
		}
		if(cfg.width){
			self.size.width = cfg.width;
		}
		if(cfg.location){
			self.location = cfg.location;
		}
	}
	
	
	
	if(callback){
		callback(this);
	}
}

	FluxUI_Launchbar.prototype.getBody = function(){
		
	}
	
	FluxUI_Launchbar.prototype.appendChild = function(){
		
	}


	FluxUI_Launchbar.prototype.render = function(callback){
		console.log('rendering launchbar');
		var driverLaunchbar = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Launchbar? FluxUI.FluxUI_Settings.driver.object.Launchbar:{};
		
		if(driverLaunchbar && driverLaunchbar.render){
			console.log(driverLaunchbar);
			console.log('====');
			if(callback){
				console.log(this);
				driverLaunchbar.render.apply(this, function(){
					callback(true);
				});
			}else{
				console.log(this);
				return driverLaunchbar.render.call(this);
			}
			
		}else{
			console.log('No Driver Loaded');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}

	FluxUI_Launchbar.prototype.show = function(callback){
		
		var driverLaunchbar = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Launchbar? FluxUI.FluxUI_Settings.driver.object.Launchbar:{};
		
		var self = this;
		
		if(driverLaunchbar && driverLaunchbar.show){
			if(callback){
				driverLaunchbar.show.apply(this, function(){
					if(self.launchbars.top){
						self.launchbars.top.show();
					}
					callback(true);
				});
			}else{
				return driverLaunchbar.show.apply(this);
			}
			
		}else{
			console.log('No Driver Loaded');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}
	
	FluxUI_Launchbar.prototype.hide = function(){
		
	}

define([], function(){
	console.log('returning');
	return FluxUI_Launchbar;
});