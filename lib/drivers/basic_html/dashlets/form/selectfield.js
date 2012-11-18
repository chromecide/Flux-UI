define([], function(){
	var dashlet = {
		doRender: function(callback){
			var self = this;
			
			var fieldElem = document.createElement('select');
			fieldElem.id = this.name;
			
			var wrapperElem = document.createElement('div');
			wrapperElem.id = self.name+'_wrapper';
			
			if(self.options.label && self.options.label!=''){
				var labelElem = document.createElement('label');
				labelElem.setAttribute('for', self.name);
				labelElem.innerHTML = self.options.label;
				wrapperElem.appendChild(labelElem);
			}
			
			if(self.options.data){
				for(var i=0; i<self.options.data.length;i++){
					var dataItem = self.options.data[i];
					var liElem = document.createElement('option');
					liElem.value = dataItem.value;
					liElem.text = dataItem.display;
					fieldElem.appendChild(liElem);
				}
			}
			wrapperElem.appendChild(fieldElem);
			self.parent.getBody(function(elem){
				FluxUI.FluxUI_appendChild(elem, wrapperElem, function(){
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
