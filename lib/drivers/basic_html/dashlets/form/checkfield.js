define([], function(){
	var dashlet = {
		doRender: function(callback){
			var self = this;
			var fieldElem = document.createElement('input');
			fieldElem.id = this.name;
			fieldElem.type = 'checkbox';
			fieldElem.value = self.options.value;
			
			self.parent.getBody(function(elem){
				FluxUI.FluxUI_appendChild(elem, fieldElem, function(){
					if(callback){
						callback(self);
					}
				});	
			});
			
		},
		getValue: function(callback){
			var self = this;
			var elem = document.getElementById(self.name);
			var content = elem.value;
			if(callback){
				callback(content);
			}
			
			return content;
		},
		setValue: function(val, callback){
			var self = this;
			var elem = document.getElementById(self.name);
			elem.value = val;
			var content = elem.value;
			if(callback){
				callback(content);
			}
			
			return content;
		}
	};
	
	return dashlet;
});
