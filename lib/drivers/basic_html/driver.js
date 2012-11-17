var driver = {
	init: function(cfg, callback){
		var self = this;
		require(['util', FluxUI.FluxUI_Settings.path+'drivers/basic_html/workspace', FluxUI.FluxUI_Settings.path+'drivers/basic_html/launchbar', FluxUI.FluxUI_Settings.path+'drivers/basic_html/launcher'], function(util, ws, lb, l){
			self.Workspace = ws;
			self.Launchbar = lb;
			self.Launcher = l;
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
