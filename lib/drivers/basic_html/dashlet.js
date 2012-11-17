define([], function(){
	var dashlet = {
		render: function(callback){
			var self = this;
			console.log(self.type);
			FluxUI.FluxUI_loadDashlet(self.type, function(dashlet){
				dashlet.render.call(self, function(){
					if(callback){
						callback(self);
					}
				});
			});
		}
	}
	
	return dashlet;
});
