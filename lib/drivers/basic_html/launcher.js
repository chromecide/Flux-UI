define([], function(){
	var launcher = {
		getBody: function(callback){
			
		},
		refresh: function(callback){
			var elem = document.getElementById
		},
		render: function(callback){
			var self = this;
			console.log(self);
			self.launchbar.getBody(function(listElem){
				var liElem = document.createElement('li');
				liElem.id = self.name;
				
				if(self.clickEvent){
					var aElem = document.createElement('a');
					function clickBuilder(eventName, eventParams){
						return function(){
							FluxUI.emit(eventName, eventParams);
						}
					}
					aElem.onclick = clickBuilder(self.clickEvent.name, self.clickEvent.params);
					aElem.innerHTML = self.text;
					FluxUI.FluxUI_appendChild(liElem, aElem, function(){
						FluxUI.FluxUI_appendChild(listElem, liElem, function(){
							if(callback){
								callback(this);
							}	
						});		
					});
				}else{
					liElem.innerHTML = self.text;
					FluxUI.FluxUI_appendChild(listElem, liElem, function(){
						if(callback){
							callback(this);
						}	
					});	
				}
			});
		}
	}
	
	return launcher;
});

