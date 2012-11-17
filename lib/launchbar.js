
function FluxUI_Launchbar(cfg, callback){
	var self = this;
	this.size = {
		width: 250,
		height: 35
	};
	
	this.position = {
		top: 0,
		left: 0
	};
	
	this.location = 'top';
	this.launchers = [];
	
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
		if(cfg.name){
			self.name = cfg.name;
		}
		
		if(cfg.launchers){
			for(var i=0;i<cfg.launchers.length;i++){
				if((typeof cfg.launchers[i])=='string'){
					cfg.launchers[i] = {
						text: cfg.launchers[i]
					}
				}
				
				cfg.launchers[i].launchbar = self;
				
				new FluxUI.Launcher(cfg.launchers[i], function(l){
					self.launchers[i] = l;	
				});
			}
			
		}
	}
	
	if(!self.name){
		self.name = self.location+'_launchbar';
	}
	
	self.calculateSize(function(sz){
		
		self.size = sz;
	});
	
	self.calculatePosition(function(pos){
		
		self.position = pos;
	});
	
	if(callback){
		callback(this);
	}
}

	FluxUI_Launchbar.prototype.calculateSize = function(callback){
		var size = {
			width: 0,
			height: 0
		};
		
		var self = this;
		self.workspace.getSize(function(wsSize){
			size = wsSize;
			if(self.location=='top' || self.location=='bottom'){
				size.width = wsSize.width;
				size.height = self.size.height>0?self.size.height:35;
			}else{//left or right
				
				if(self.workspace.launchbars.top){
					size.height-=self.workspace.launchbars.top.size.height;
				}
				
				if(self.workspace.launchbars.bottom){
					size.height-=self.workspace.launchbars.bottom.size.height;
				}
				
				size.width = self.size.width>0?self.size.width:300;
			}
			
			if(callback){
				callback(size);
			}
		});
	}
	
	FluxUI_Launchbar.prototype.calculatePosition = function(callback){
		var position = {
			top: 0,
			left: 0
		};
		
		var self = this;
		self.workspace.getSize(function(wsSize){
			
			switch(self.location){
				case 'top':
					//do nothing, it's fine where it is(0,0)
					break;
				case 'bottom':
					position.top = wsSize.height-self.size.height;
					break;
				case 'left':
					position.top = self.workspace.launchbars.top?self.workspace.launchbars.top.size.height:0;
					break;
				case 'right':
					position.top = self.workspace.launchbars.top?self.workspace.launchbars.top.size.height:0;
					position.left = wsSize.width-self.size.width;
					break;
			}
			
			if(callback){
				callback(position);
			}
		});
	}
	
	FluxUI_Launchbar.prototype.getBody = function(callback){
		var driverLaunchbar = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Launchbar? FluxUI.FluxUI_Settings.driver.object.Launchbar:{};
		
		if(driverLaunchbar && driverLaunchbar.getBody){
			return driverLaunchbar.getBody.call(this, function(elem){
				if(callback){
					callback(elem);	
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
	
	FluxUI_Launchbar.prototype.getPosition = function(callback){
		return this.position;
	}
	
	FluxUI_Launchbar.prototype.getSize = function(callback){
		
		return this.size;
	}
	
	FluxUI_Launchbar.prototype.appendChild = function(){
		
	}

	FluxUI_Launchbar.prototype.refresh = function(callback){
		var driverLaunchbar = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Launchbar? FluxUI.FluxUI_Settings.driver.object.Launchbar:{};
		
		if(driverLaunchbar && driverLaunchbar.refresh){
			driverLaunchbar.refresh.call(this, function(){
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

	FluxUI_Launchbar.prototype.render = function(callback){
		var driverLaunchbar = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Launchbar? FluxUI.FluxUI_Settings.driver.object.Launchbar:{};
		
		if(driverLaunchbar && driverLaunchbar.render){
		
			driverLaunchbar.render.call(this, function(){
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
	return FluxUI_Launchbar;
});