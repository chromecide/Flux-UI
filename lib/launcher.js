function FluxUI_Launcher(cfg, callback){
	
	var self = this;
	this.launchbar = false;
	this.name = 'launcher';
	this.text = 'Launcher';
	if(!cfg){
		this.name = this.name+(new Date()).getTime().toString();
		this.clickEvent = {
			name: this.name+'.Click',
			params:{
				
			}
		}
	}else{
		
		if(!cfg.launchbar){
			throw new Error('You must supply a launchbar');	
		}else{
			this.launchbar = cfg.launchbar;
		}
		
		if(cfg.text){
			this.text = cfg.text;
		}
		
		if(cfg.name){
			this.name = cfg.name;
		}else{
			this.name = this.name+(new Date()).getTime().toString();
		}
		
		if(cfg.clickEvent){
			if((typeof cfg.clickEvent)=='object'){
				this.clickEvent = cfg.clickEvent;
			}else{
				this.clickEvent = {
					name: cfg.clickEvent,
					params:{}
				}
			}
		}
	}
	
	if(callback){
		callback(this);
	}
}
	FluxUI_Launcher.prototype.refresh = function(callback){
		
		var driverLauncher = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Launcher? FluxUI.FluxUI_Settings.driver.object.Launcher:{};
		
		if(driverLauncher && driverLauncher.refresh){
			
			driverLauncher.refresh.call(this, function(){
				if(callback){
					callback(true);
				}
			});
		}else{
			console.log('No Driver Loaded');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}

	FluxUI_Launcher.prototype.render = function(callback){
		
		var driverLauncher = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Launcher? FluxUI.FluxUI_Settings.driver.object.Launcher:{};
		
		if(driverLauncher && driverLauncher.render){
			
			driverLauncher.render.call(this, function(){
				if(callback){
					callback(true);	
				}
			});
		}else{
			console.log('No Driver Loaded');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}
	/*
	FluxUI_Launcher.prototype.show = function(){
		
	}

	FluxUI_Launcher.prototype.hide = function(){
		
	}
*/

define([], function(){
	return FluxUI_Launcher;
});
