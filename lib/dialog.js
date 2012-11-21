function FluxUI_Dialog(cfg, callback){
	
	var self = this;
	this.title = '';
	this.dashlets = [];
	this.buttons = false;
	this.name = 'dialog';
	this.size = {
		width: 500,
		height: 500
	};
	
	if(!cfg){
		cfg = {};
	}
	
		
	if(cfg.name){
		this.name = cfg.name;	
	}
	
	if(cfg.title){
		this.title = cfg.title;
	}
	
	if(cfg.size){
		this.size = cfg.size;	
	}
	
	if(cfg.dashlets){
		
		var dList = [];
		for(var i=0;i<cfg.dashlets.length;i++){
			dList.push(cfg.dashlets[i]);
		}
		
		function dashletLoader(){
			if(dList.length==0){		
				if(cfg.buttons){
					self.buttons = [];
					var bList = [];
					for(var i=0;i<cfg.buttons.length;i++){
						bList.push(cfg.buttons[i]);
					}
					function buttonLoader(){
						if(bList.length==0){
							if(callback){
								callback(self, cfg);
							}
							
							return;
						}
						
						var btCfg = bList.shift();
						if(!btCfg.type){
							btCfg.type = 'button'
						}
						new FluxUI.Dashlet(
							btCfg,
							function(btn){
								self.buttons.push(btn);
								buttonLoader();
							}
						);
					}
					buttonLoader();
				}else{
					if(callback){
						callback(self, cfg);
					}
				}
				
				return;
			}
			
			var dashlet = dList.shift();
			
			new FluxUI.Dashlet(dashlet, function(dsh){
				
				self.dashlets.push(dsh);
				dashletLoader();
			});
		}
		
		dashletLoader();
	}else{
		if(cfg.buttons){
			self.buttons = [];
			var bList = [];
			for(var i=0;i<cfg.buttons.length;i++){
				bList.push(cfg.buttons[i]);
			}
			function buttonLoader(){
				if(bList.length==0){
					if(callback){
						if(callback){
							callback(self, cfg);
						}
					}
					
					return;
				}
				
				var btCfg = bList.shift();
				if(!btCfg.type){
					btCfg.type = 'button'
				}
				new FluxUI.Dashlet(
					btCfg,
					function(btn){
						self.buttons.push(btn);
						buttonLoader();
					}
				);
			}
			buttonLoader();
		}else{
			if(callback){
				callback(self,cfg);
			}
		}
	}
}

	FluxUI_Dialog.prototype.getBody = function(callback){
		
		var driverDialog = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Dialog? FluxUI.FluxUI_Settings.driver.object.Dialog:{};
		
		if(driverDialog && driverDialog.getBody){
			driverDialog.getBody.call(this, function(elem){
				if(callback){
					callback(elem);	
				}
			});
		}else{
			console.log('No Driver Loaded: Dialog.getBody');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}

	FluxUI_Dialog.prototype.show = function(callback){
		
		var driverDialog = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Dialog? FluxUI.FluxUI_Settings.driver.object.Dialog:{};
		
		if(driverDialog && driverDialog.show){
			
			driverDialog.show.call(this, function(){
				if(callback){
					callback(true);	
				}
			});
		}else{
			console.log('No Driver Loaded: Dialog');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}
	
	FluxUI_Dialog.prototype.hide = function(){
		
		var driverDialog = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Dialog? FluxUI.FluxUI_Settings.driver.object.Dialog:{};
		
		if(driverDialog && driverDialog.hide){
			
			driverDialog.hide.call(this, function(){
				if(callback){
					callback(true);	
				}
			});
		}else{
			console.log('No Driver Loaded: Dialog');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}

define([], function(){
	return FluxUI_Dialog;
})
