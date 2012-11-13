var driver = {
	init: function(cfg, callback){
		require(['util'], function(util, vp){
			/*this.viewport = vp.init({}, function(){
				if(callback){
					callback(vp);
				}
				FluxUI.emit('FluxUI.Viewport.Ready', {});
			});*/
		});
	}
};

define(driver);
