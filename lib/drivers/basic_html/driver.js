var driver = {
	init: function(cfg, callback){
		var self = this;
		require(['util', FluxUI.FluxUI_Settings.path+'drivers/basic_html/workspace', FluxUI.FluxUI_Settings.path+'drivers/basic_html/launchbar'], function(util, ws, lb){
			self.Workspace = ws;
			self.Launchbar = lb;
			if(callback){
				callback();
			}
		});
	},
	getBody: function(){
		return document.getElementsByTagName('body')[0];
	},
	appendChild: function(parent, child, callback){
		parent.appendChild(child);
		if(callback){
			callback();
		}
	}
};

define(driver);
