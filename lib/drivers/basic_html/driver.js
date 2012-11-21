var driver = {
	dashlets: [],
	init: function(cfg, callback){
		var self = this;
		require([
			'util', 
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/workspace.js', 
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/launchbar.js',
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/launcher.js',
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/dashlet.js',
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/dialog.js',
			FluxUI.FluxUI_Settings.path+'drivers/basic_html/dashboard.js'
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
		
		if(!self.dashlets){
			self.dashlets = {};
		}
		if(self.dashlets){
			if(self.dashlets[type]){
				callback(self.dashlets[type]);
			}else{
				require([FluxUI.FluxUI_Settings.path+'drivers/basic_html/dashlets/'+type+'.js'], function(dashlet_ctr){
					self.dashlets[type] = dashlet_ctr;
					callback(dashlet_ctr);
				});	
			}
		}
	},
	getBody: function(){
		return document.getElementsByTagName('body')[0];
	},
	appendChild: function(parent, child, callback){
		
		try{
			parent.appendChild(child);	
		}catch(e){
			console.log(e);
		}
		
		
		if(callback){
			callback();
		}
	}
};

define(driver);
