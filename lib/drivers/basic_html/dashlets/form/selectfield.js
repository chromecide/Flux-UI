define([], function(){
	var dashlet = {
		doRender: function(callback){
			var self = this;
			var fieldElem = document.createElement('select');
			fieldElem.id = this.name;
			
			if(self.options.data){
				for(var i=0; i<self.options.data.length;i++){
					var dataItem = self.options.data[i];
					var liElem = document.createElement('option');
					liElem.value = dataItem.value;
					liElem.text = dataItem.display;
					fieldElem.appendChild(liElem);
				}
			}
			
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
