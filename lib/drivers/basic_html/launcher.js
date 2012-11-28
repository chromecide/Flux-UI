define([], function(){
	var launcher = {
		getBody: function(callback){
			
		},
		refresh: function(callback){
			console.log('REFRESHING');
			var self = this;
			var existingElem = document.getElementById(self.name);
			
			if(!existingElem){
				self.launchbar.getBody(function(listElem){
					var liElem = document.createElement('li');
					liElem.id = self.name;
					
					if(self.clickEvent){
						var aElem = document.createElement('a');
						function clickBuilder(eventName, eventParams){
							
							if((typeof self.clickEvent=='function')){
								return self.clickEvent;
							}else{
								return function(){
									console.log(eventName);
									FluxUI.emit(eventName, eventParams);
								}		
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
						var textElem =  document.createElement('span');
						textElem.innerHTML = self.text;
						liElem.appendChild(textElem);
						FluxUI.FluxUI_appendChild(listElem, liElem, function(){
							if(callback){
								callback(this);
							}	
						});	
					}
				});
				}else{
					console.log('EXISTS');
				}
		},
		render: function(callback){
			var self = this;
			
			self.launchbar.getBody(function(listElem){
				var liElem = document.createElement('li');
				liElem.id = self.name;
				
				if(self.clickEvent){
					var aElem = document.createElement('a');
					function clickBuilder(eventName, eventParams){
						
						if((typeof self.clickEvent=='function')){
							return self.clickEvent;
						}else{
							return function(){
								console.log(FluxUI);
								FluxUI.emit(eventName, eventParams);
							}		
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
					var textElem =  document.createElement('span');
					textElem.innerHTML = self.text;
					liElem.appendChild(textElem);
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

