function FluxUI_Form(cfg, callback){
	
	var self = this;
	self.type = 'html';
	
	if(cfg.type){
		self.type = cfg.type;
	}
	
	if(cfg.options){
		self.options = cfg.options;
	}
	
	if(cfg.parent){
		self.parent = cfg.parent;
	}
	
	if(self.options.fields){
		
		var tFields = [];
		for(var i=0;i<self.options.fields; i++){
			tFields.push(self.options.fields[i]);
		}
		function fieldCreator(){
			if(tFields.length==0){
				if(callback){
					callback(this);
				}
				return;
			}
			
			var fieldCfg = tFields.shift();
			new FluxUI.Dashlet(fieldCfg, function(dsh){
				self.fields.push(dsh);
				fieldCreator();
			})
		}
		fieldCreator();
	}else{
		if(callback){
			callback(this);
		}
	}
}

	FluxUI_Form.prototype.render = function(callback){
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
