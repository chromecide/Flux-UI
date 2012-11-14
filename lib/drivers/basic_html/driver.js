var driver = {
	init: function(cfg, callback){
		var self = this;
		require(['util', FluxUI.FluxUI_Settings.path+'drivers/basic_html/workspace'], function(util, ws){
			self.Workspace = ws;
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
