var FluxUI = {
	FluxUI_Settings:{
		path: '../../lib/',
		driver:{
			name: 'basic_html',
			initCfg: {}
		}
	},
	init: function(cfg, callback){
		var thisNode = this;
		window.FluxUI = thisNode;
		//process any supplied configuration
		if((typeof cfg)=='function'){
			callback = cfg;
			cfg = {};	
		}
		
		require([thisNode.FluxUI_Settings.path+'/workspace'], function(ws){
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
				if(callback){
					callback();
				}
				
				thisNode.emit('Mixin.Ready', cfg);	
			});
		});
	},
	FluxUI_setDriver: function(driverName, driverCfg, callback){
		var thisNode = this;
		
		thisNode.FluxUI_Settings.driver.name = driverName;
		thisNode.FluxUI_Settings.driver.initCfg = driverCfg;
		
		console.log('Loading '+driverName+' FluxUI Driver');
		require(['lib/drivers/'+thisNode.FluxUI_Settings.driver.name+'/driver.js'], function(driverObj){
			if(driverObj){
				if(driverObj.init){
					driverObj.init(driverCfg, function(){
						if(callback){
							callback();
						}
					});
				}else{
					
				}
			}
			
		});
	},
	FluxUI_addWorkspace: function(){
		
	},
	FluxUI_changeWorkspace: function(){
		
	}
}

define(FluxUI);
