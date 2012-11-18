define([], function(){
	var dashlet = {
		render: function(callback){
			var self = this;
			FluxUI.FluxUI_loadDashlet(self.type, function(dashlet){
				for(var key in dashlet){
					self[key] = dashlet[key]; 
				}
				self.doRender(function(){
					if(callback){
						callback(self);
					}
				});
			});
		}
	}
	
	return dashlet;
});
