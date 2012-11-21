define([], function(){
	var dashlet = {
		doRender: function(callback){
			console.log('RENDERING BUTTON');
			var self = this;
			var wrapperElem = document.createElement('button');
			wrapperElem.id = self.name;
			wrapperElem.innerHTML = self.options.display;
			function clickBuilder(eventName, eventParams){
				
				if((typeof self.options.clickEvent=='function')){
					return self.options.clickEvent;
				}else{
					return function(){
						FluxUI.emit(eventName, eventParams);
					}		
				}
				
			}
			
			wrapperElem.onclick = clickBuilder(self.options.clickEvent.name, self.options.clickEvent.params);
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
			elem.innerHTML = val;
			var content = elem.value;
			if(callback){
				callback(content);
			}
			
			return content;
		}
	};
	
	return dashlet;
});
