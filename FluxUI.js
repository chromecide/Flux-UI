var FluxUI = {
	FluxUI_Settings:{
		path: '../../lib/',
		driver:{
			name: 'basic_html',
			initCfg: {}
		},
		workspaces: {}
	},
	init: function(cfg, callback){
		var thisNode = this;
		window.FluxUI = thisNode;
		//process any supplied configuration
		if((typeof cfg)=='function'){
			callback = cfg;
			cfg = {};	
		}
		
		require([thisNode.FluxUI_Settings.path+'workspace', thisNode.FluxUI_Settings.path+'launchbar'], function(WorkSpace_ctr, Launchbar_ctr){
			FluxUI.Workspace = WorkSpace_ctr;
			FluxUI.Launchbar = Launchbar_ctr;
			
			if(cfg.driver){
				if((typeof cfg.driver)=='object'){
					thisNode.FluxUI_Settings.driver.name = cfg.driver.name;
					thisNode.FluxUI_Settings.driver.initCfg = cfg;
				}else{
					//just use the string as a driver name
					thisNode.FluxUI_Settings.driver.name = cfg.driver;
					thisNode.FluxUI_Settings.driver.initCfg = {};
				}
			}
			
			//load the driver
			thisNode.FluxUI_setDriver(thisNode.FluxUI_Settings.driver.name, thisNode.FluxUI_Settings.driver.initCfg, function(){
				
				if(cfg.workspaces){
					if(Array.isArray(cfg.workspaces)){
						function wsLoop(){
							var wsCfg = cfg.workspaces.shift();
							if(!wsCfg){
								if(callback){
									callback();
								}
								return;		
							}
							thisNode.FluxUI_addWorkspace(wsCfg, function(){
								wsLoop();
							});
						}
						wsLoop();
					}else{
						
					}
				}
				thisNode.emit('Mixin.Ready', cfg);	
			});
		}, function(){
			console.log('LOAD ERR');
			console.log(arguments);
		});
	},
	FluxUI_setDriver: function(driverName, driverCfg, callback){
		var thisNode = this;
		
		thisNode.FluxUI_Settings.driver.name = driverName;
		thisNode.FluxUI_Settings.driver.initCfg = driverCfg;
		
		console.log('Loading '+driverName+' FluxUI Driver');
		require(['./lib/drivers/'+thisNode.FluxUI_Settings.driver.name+'/driver.js'], function(driverObj){
			if(driverObj){
				thisNode.FluxUI_Settings.driver.object = driverObj;
				if(driverObj.init){
					driverObj.init(driverCfg, function(){
						if(callback){
							callback();
						}
					});
				}
			}
		});
	},
	FluxUI_getBody: function(callback){
		var driver = FluxUI.FluxUI_Settings.driver.object? FluxUI.FluxUI_Settings.driver.object:{};
		var bodyItem = false;
		if(driver && driver.getBody){
			if(callback){
				bodyItem = driver.getBody(function(bd){
					callback(bd);
				});
			}else{
				bodyItem = driver.getBody();
			}
		}else{
			console.log('NO DRIVER LOADED');
		}
		
		return bodyItem;
	},
	FluxUI_appendChild: function(){
		var driver = FluxUI.FluxUI_Settings.driver.object? FluxUI.FluxUI_Settings.driver.object:{};
		
		if(driver && driver.appendChild){
			driver.appendChild.apply(this, arguments);
		}
	},
	FluxUI_getWorkspaceCount: function(callback){
		var cnt = 0;
		for(var wsName in this.workspaces){
			cnt++;
		}
		if(callback){
			callback(cnt);
		}
		return cnt;
	},
	FluxUI_getWorkspace: function(name, callback){
		if((typeof name)=='function'){
			callback = name;
			name = false;
		}
		
		if(FluxUI.FluxUI_Settings.workspaces!={}){
			if(name && name!=''){
				return FluxUI.FluxUI_Settings.workspaces[name];
			}else{
				var foundItem = false;
				for(var wsName in FluxUI.FluxUI_Settings.workspaces){
					if(FluxUI.FluxUI_Settings.workspaces[wsName].isDefault==true){
						foundItem = FluxUI.FluxUI_Settings.workspaces[wsName];
					}
				}
				if(!foundItem){
					foundItem = false;
				}
				if(callback){
					callback(foundItem);
				}
				return foundItem;
			}	
		}else{
			
			callback(false);
			return false;
		}
	},
	FluxUI_addWorkspace: function(cfg, callback){
		var thisNode = this;
		var wsCount = thisNode.FluxUI_getWorkspaceCount();
		if(cfg){
			if(!cfg.name){
				cfg.name = 'default_workspace'+(wsCount>0?'_'+wsCount:'');
				if(wsCount==0){
					cfg.isDefault = true;
				}
			}
		}else{
			cfg = {
				name: 'default_workspace'+(wsCount>0?'_'+wsCount:'')
			};
			
			if(wsCount==0){
				cfg.isDefault = true;
			}
		}
		
		new FluxUI.Workspace(cfg, function(ws){
			
			FluxUI.FluxUI_Settings.workspaces[ws.name] = ws;
			if(callback){
				callback(ws);
			}
			
			FluxUI.emit('FluxUI.Workspace.Added', ws);
		});
	},
	FluxUI_changeWorkspace: function(name, callback){
		var thisNode = this;
		thisNode.FluxUI_getWorkspace(name, function(ws){
			
			if(ws){
				ws.show(function(){
					if(callback){
						callback(false, ws);
					}
					FluxUI.emit('FluxUI.Workspace.Changed', ws);
				})
			}else{
				callback(true, {msg: 'Workspace Not Found'});
			}
		});
	}
}

define(FluxUI);
