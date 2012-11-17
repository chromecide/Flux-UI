
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
	this.activeDashboard = false;
	this.dashboards = {};
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
			
			if(cfg.launchbars.bottom){
				if(cfg.launchbars.bottom===true){
					cfg.launchbars.bottom = {
						name: 'bottom_launchbar',
						isDefault: false,
						height: 50,
						location: 'bottom'
					};
				}else{
					if(!cfg.launchbars.bottom.location){
						cfg.launchbars.bottom.location = 'bottom';
					}
				}
				cfg.launchbars.bottom.workspace = self;
				new FluxUI.Launchbar(cfg.launchbars.bottom, function(lb){
					self.launchbars.bottom = lb;
					if(this.rendered){
						//self.launchbars.top.render();
					}
				});
			}
			
			if(cfg.launchbars.left){
				if(cfg.launchbars.left===true){
					cfg.launchbars.left = {
						name: 'left_launchbar',
						isDefault: false,
						//width: 500,
						location: 'left'
					};
				}else{
					if(!cfg.launchbars.left.location){
						cfg.launchbars.left.location = 'left';
					}
				}
				cfg.launchbars.left.workspace = self;
				new FluxUI.Launchbar(cfg.launchbars.left, function(lb){
					self.launchbars.left = lb;
					if(this.rendered){
						//self.launchbars.top.render();
					}
				});
			}
			
			if(cfg.launchbars.right){
				if(cfg.launchbars.right===true){
					cfg.launchbars.right = {
						name: 'right_launchbar',
						isDefault: true,
						//width: 150,
						location: 'right'
					};
				}else{
					if(!cfg.launchbars.right.location){
						cfg.launchbars.right.location = 'right';
					}
				}
				cfg.launchbars.right.workspace = self;
				new FluxUI.Launchbar(cfg.launchbars.right, function(lb){
					self.launchbars.right = lb;
					if(this.rendered){
						//self.launchbars.top.render();
					}
				});
			}
			
		}
	
		if(cfg.dashboards){
			var defaultActive = false;
			for(var i=0; i< cfg.dashboards.length;i++){
				
				var dashboardCfg = cfg.dashboards[i];
				dashboardCfg.workspace = self;
				
				new FluxUI.Dashboard(dashboardCfg, function(dsh){
					if(i==0){
						defaultActive = dsh.name; 
					}
					
					self.dashboards[dsh.name] = dsh;
					
					if(dashboardCfg.isDefault){
						self.activeDashboard = dsh.name;
					}
				});
				
				if(!self.activeDashboard){
					self.activeDashboard = defaultActive;
				}
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
			if(callback){
				callback(false);
			}
			return false;	
		}
	}
	
	
	FluxUI_Workspace.prototype.refresh = function(callback){
		var self = this;
		var driverWorkspace = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Workspace? FluxUI.FluxUI_Settings.driver.object.Workspace:{};
		
		if(driverWorkspace && driverWorkspace.refresh){
			
			driverWorkspace.refresh.call(this, function(elem){
				if(self.launchbars){
					if(self.launchbars.top){
						self.launchbars.top.refresh(function(){
							if(self.launchbars.bottom){
								self.launchbars.bottom.refresh(function(){
									if(self.launchbars.left){
										self.launchbars.left.refresh(function(){
											if(self.launchbars.right){
												self.launchbars.right.refresh(function(){
													if(callback){
														callback();
													}
												});
											}else{
												if(callback){
													callback();
												}
											}		
										});
									}else{
										if(callback){
											callback();
										}
									}
								});
							}else{
								if(self.launchbars.left){
										self.launchbars.left.refresh(function(){
											if(self.launchbars.right){
												self.launchbars.right.refresh(function(){
													if(callback){
														callback();
													}
												});
											}else{
												if(callback){
													callback();
												}
											}		
										});
									}else{
										if(callback){
											callback();
										}
									}		
							}
						});
					}else{
						if(self.launchbars.bottom){
								self.launchbars.bottom.refresh(function(){
									if(self.launchbars.left){
										self.launchbars.left.refresh(function(){
											if(self.launchbars.right){
												self.launchbars.right.refresh(function(){
													if(callback){
														callback();
													}
												});
											}else{
												if(callback){
													callback();
												}
											}		
										});
									}else{
										if(callback){
											callback();
										}
									}
								});
							}else{
								if(self.launchbars.left){
									self.launchbars.left.refresh(function(){
										if(self.launchbars.right){
											self.launchbars.right.refresh(function(){
												if(callback){
													callback();
												}
											});
										}else{
											if(callback){
												callback();
											}
										}		
									});
								}else{
									if(callback){
										callback();
									}
								}	
							}
					}
					if(callback){
						callback(this);
					}	
				}
				if(self.dashboards){
					
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
	
	FluxUI_Workspace.prototype.render = function(callback){
		var self = this;
		var driverWorkspace = FluxUI.FluxUI_Settings.driver.object && FluxUI.FluxUI_Settings.driver.object.Workspace? FluxUI.FluxUI_Settings.driver.object.Workspace:{};
		
		if(driverWorkspace && driverWorkspace.render){
			driverWorkspace.render.call(this, function(elem){
				if(callback){
					callback(this);	
				}
				window.onresize=function(){
					self.refresh.call(self);
				};
			});
			
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
		var thisSize = false;
		if(driverWorkspace && driverWorkspace.getSize){
			thisSize = driverWorkspace.getSize.call(this, function(wsSize){
				thisSize = wsSize;
				if(callback){
					callback(wsSize);
				}
			});
		}else{
			
			var e = window;
		    var a = 'inner';
		    if (!('innerWidth' in window)){
		        a = 'client';
		        e = document.documentElement || document.body;
		    }
			
		    thisSize =  { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
		}
		
		if(callback){
			callback(thisSize);
		}
		return thisSize;
	}
	
	FluxUI_Workspace.prototype.showDashboard = function(name, callback){
		var self = this;
		if((typeof name)=='function'){
			callback = name;
			name = false;
		}
		
		if(self.activeDashboard){
			self.lastDashboard = self.activeDashboard;
		}
		
		if(!name){
			if(!self.activeDashboard){
				console.log('no dashboard found');
			}else{
				name = self.activeDashboard;
			}
		}
		
		if(self.dashboards[name]){
			self.dashboards[self.lastDashboard].hide();
			var dashboard = self.dashboards[name];
			self.activeDashboard = dashboard.name;
			dashboard.show(function(){
				if(callback){
					callback();
				}
			});
		}else{
			
		}
	}
	
	
	FluxUI_Workspace.prototype.configureLaunchbars = function(cfg, callback){
		console.log(cfg);
	}
	

define([], function(){
	return FluxUI_Workspace;
});
