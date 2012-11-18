define([], function(){
	var dashlet = {
		doRender: function(callback){
			var self = this;
			
			var wrapperElem = document.createElement('div');
			wrapperElem.id = self.name+'_wrapper';
			
			if(self.options.label && self.options.label!=''){
				var labelElem = document.createElement('label');
				labelElem.setAttribute('for', self.name);
				labelElem.innerHTML = self.options.label;
				wrapperElem.appendChild(labelElem);
			}
			
			var fieldElem = document.createElement('input');
			fieldElem.id = this.name;
			fieldElem.type = 'checkbox';
			fieldElem.value = self.options.value;
			
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
