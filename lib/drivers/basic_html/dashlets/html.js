define([], function(){
	var dashlet = {
		render: function(callback){
			var self = this;
			var wrapperElem = document.createElement('div');
			wrapperElem.id = this.name;
			wrapperElem.innerHTML = this.options.html;
			self.parent.getBody(function(elem){
				console.log(elem);
				FluxUI.FluxUI_appendChild(elem, wrapperElem, function(){
					if(callback){
						callback(self);
					}
				});	
			});
			
		}
	};
	
	return dashlet;
});
