
function FluxUI_Dashboard(cfg, callback){
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
	this.dashlets = [];
	
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
		
		if(cfg.dashlets){
			for(var i=0;i<cfg.dashlets.length;i++){
				if((typeof cfg.dashlets[i])=='string'){
					cfg.dashlets[i] = {
						text: cfg.dashlets[i]
					}
				}
				
				cfg.dashlets[i].parent = self;
				
				new FluxUI.Dashlet(cfg.dashlets[i], function(l){
					self.dashlets[i] = l;	
				});
			}
			
		}
	}
	
	if(!self.name){
		self.name = 'dashboard';
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

	FluxUI_Dashboard.prototype.calculateSize = function(callback){
		var size = {
			width: 0,
			height: 0
		};
		
		var self = this;
		self.workspace.getSize(function(wsSize){
			size = wsSize;
			
			if(self.workspace.launchbars.top){
				size.height-=self.workspace.launchbars.top.size.height;
			}
			
			if(self.workspace.launchbars.bottom){
				size.height-=self.workspace.launchbars.bottom.size.height;
			}
			
			if(self.workspace.launchbars.left){
				size.width-=self.workspace.launchbars.left.size.width;
			}
			
			if(self.workspace.launchbars.right){
				size.width-=self.workspace.launchbars.right.size.width;
			}
				
			
			if(callback){
				callback(size);
			}
		});
	}
	
	FluxUI_Dashboard.prototype.calculatePosition = function(callback){
		var position = {
			top: 0,
			left: 0
		};
		
		var self = this;
		self.workspace.getSize(function(wsSize){
			
			position = {
				top:0,
				left:0
			};
			
			if(self.workspace.launchbars.top){
				position.top+=self.workspace.launchbars.top.size.height;
			}
			
			if(self.workspace.launchbars.left){
				position.left+=self.workspace.launchbars.left.size.width;
			}
			
			if(callback){
				callback(position);
			}
		});
	}
	
	FluxUI_Dashboard.prototype.getBody = function(callback){
		var driverDashboard = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Dashboard? FluxUI.FluxUI_Settings.driver.object.Dashboard:{};
		
		if(driverDashboard && driverDashboard.getBody){
			return driverDashboard.getBody.call(this, function(elem){
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
	
	FluxUI_Dashboard.prototype.getPosition = function(callback){
		return this.position;
	}
	
	FluxUI_Dashboard.prototype.getSize = function(callback){
		
		return this.size;
	}
	
	FluxUI_Dashboard.prototype.appendChild = function(){
		
	}

	FluxUI_Dashboard.prototype.refresh = function(callback){
		var driverDashboard = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Dashboard? FluxUI.FluxUI_Settings.driver.object.Dashboard:{};
		
		if(driverDashboard && driverDashboard.refresh){
			driverDashboard.refresh.call(this, function(){
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

	FluxUI_Dashboard.prototype.render = function(callback){
		var driverDashboard = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Dashboard? FluxUI.FluxUI_Settings.driver.object.Dashboard:{};
		
		if(driverDashboard && driverDashboard.render){
		
			driverDashboard.render.call(this, function(){
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

	FluxUI_Dashboard.prototype.show = function(callback){
		
		var driverDashboard = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Dashboard? FluxUI.FluxUI_Settings.driver.object.Dashboard:{};
		
		var self = this;
		
		if(driverDashboard && driverDashboard.show){
			if(callback){
				driverDashboard.show.apply(this, function(){
					callback(true);
				});
			}else{
				return driverDashboard.show.apply(this);
			}
			
		}else{
			console.log('No Driver Loaded');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}
	
	FluxUI_Dashboard.prototype.hide = function(callback){
		
		var driverDashboard = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Dashboard? FluxUI.FluxUI_Settings.driver.object.Dashboard:{};
		
		var self = this;
		
		if(driverDashboard && driverDashboard.hide){
			if(callback){
				driverDashboard.hide.apply(this, function(){
					callback(true);
				});
			}else{
				return driverDashboard.hide.apply(this);
			}
			
		}else{
			console.log('No Driver Loaded');
			if(callback){
				callback(false);
			}
			return false;	
		}
	}

define([], function(){
	return FluxUI_Dashboard;
});