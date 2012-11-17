var driver = {
	dashlets: [],
	init: function(cfg, callback){
		var self = this;
		require([
			'util', 
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/workspace', 
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/launchbar', 
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/launcher',
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/dashlet',
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/dialog',
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/dashboard'
		], 
		function(util, ws, lb, l, dsh, dlg, dbd){
			self.Workspace = ws;
			self.Launchbar = lb;
			self.Launcher = l;
			self.Dashlet = dsh;
			self.Dialog = dlg;
			self.Dashboard = dbd;
			
			if(callback){
				callback();
			}
		});
	},
	loadDashlet: function(type, callback){
		var self = this;
		if(self.dashlets){
			if(self.dashlets[type]){
				callback(self.dashlets[type]);
			}
		}else{
			require([FluxUI.FluxUI_Settings.path+'drivers/basic_html/dashlets/'+type], function(dashlet_ctr){
				callback(dashlet_ctr);
			});
		}
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
