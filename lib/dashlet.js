function FluxUI_Dashlet(cfg, callback){
	var self = this;
	self.type = 'html';
	
	self.size = {
		width: 150,
		height: 150
	};
	
	self.gridSize = {
		width: 3,
		height: 3
	};
	
	if(cfg.type){
		self.type = cfg.type;
	}
	
	if(cfg.options){
		self.options = cfg.options;
	}
	
	if(cfg.parent){
		self.parent = cfg.parent;
	}
	if(callback){
		callback(this);
	}
}

	FluxUI_Dashlet.prototype.render = function(callback){
		var driverDashlet = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Dashlet? FluxUI.FluxUI_Settings.driver.object.Dashlet:{};
		
		if(driverDashlet && driverDashlet.render){
			driverDashlet.render.call(this, function(){
				if(callback){
					callback(true);
				}
			});
		}else{
			console.log('No Driver Loaded: Dashlet.render');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}

define([], function(){
	return FluxUI_Dashlet;
});
