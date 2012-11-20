define([], function(){
	var dashlet = {
		getBody: function(callback){
			var elem = document.getElementById(this.name);
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
			
			var wrapperElem = document.createElement('div');
			wrapperElem.id = this.name+'_wrapper';
			
			var groupElem = document.createElement('fieldset');
			groupElem.id = self.name;
			
			if(self.options.label && self.options.label!=''){
				var labelElem = document.createElement('legend');
				
				if(self.options.checkLabel===true){
					var checkLabelElem = document.createElement('input');
					checkLabelElem.id = self.name+'_checkbox';
					checkLabelElem.type = 'checkbox';
					labelElem.appendChild(checkLabelElem);
				}
				var textLabel = document.createElement('span');
				textLabel.innerHTML = self.options.label;
				labelElem.appendChild(textLabel);
				groupElem.appendChild(labelElem);
				
			}
			
			wrapperElem.appendChild(groupElem);
			
			self.parent.getBody(function(elem){
				FluxUI.FluxUI_appendChild(elem, wrapperElem, function(){
					if(self.options.fields){
						var tFields = [];
						for(var i=0;i<self.options.fields.length; i++){
							tFields.push(self.options.fields[i]);
						}
						
						function fieldCreator(){
							if(tFields.length==0){
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
									if(callback){
										callback();
									}
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
