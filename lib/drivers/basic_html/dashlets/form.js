define([], function(){
	var dashlet = {
		getBody: function(callback){
			console.log(this);
			var elem = document.getElementById(this.name+'_form');
			console.log(elem);
			if(callback){
				callback(elem);
			}
			
			return elem;
		},
		doRender: function(callback){
			var self = this;
			if(!self.fields){
				self.fields = [];
			}
			console.log(self);
			var wrapperElem = document.createElement('div');
			wrapperElem.id = this.name;
			
			var formElem = document.createElement('form');
			formElem.id = self.name+'_form';
			
			wrapperElem.appendChild(formElem);
			
			self.parent.getBody(function(elem){
				FluxUI.FluxUI_appendChild(elem, wrapperElem, function(){
					if(self.options.fields){
						var tFields = [];
						for(var i=0;i<self.options.fields.length; i++){
							tFields.push(self.options.fields[i]);
						}
						
						function fieldCreator(){
							if(tFields.length==0){
								console.log('fields created');
								if(self.fields){
									//render the fields
									var sFields = [];
									for(var i=0;i<self.fields.length;i++){
										sFields.push(self.fields[i]);	
									}
									
									function renderField(){
										if(sFields.length==0){
											if(callback){
												callback();
											}
											
											return;
										}
										
										var fieldItem = sFields.shift();
										
										fieldItem.render(function(){
											renderField();
										});
									}
									renderField();
								}else{
									self.parent.getBody(function(elem){		
										FluxUI.FluxUI_appendChild(elem, wrapperElem, function(){
											if(callback){
												callback(self);
											}
										});	
									});
								}
								return;
							}
							
							var fieldCfg = tFields.shift();
							new FluxUI.Dashlet(fieldCfg, function(dsh){
								self.fields.push(dsh);
								dsh.parent = self;
								fieldCreator();
							})
						}
						fieldCreator();
					}else{
						if(callback){
							callback(self);
						}	
					}
					
				});	
			});
			
			
			
		}
	};
	
	return dashlet;
});
