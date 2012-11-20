define([], function(Container){
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
			if(!self.dashlets){
				self.dashlets = [];
			}

			var wrapperElem = document.createElement('div');
			wrapperElem.className = 'FluxUI_Split';
			wrapperElem.id = this.name;
			
			new Container({name: this.name+'_north'}, function(topCt){
				console.log(topCt);
			});
			
			self.parent.getBody(function(elem){
				FluxUI.FluxUI_appendChild(elem, wrapperElem, function(){
					if(self.options.dashlets){
						var tdashlets = [];
						for(var i=0;i<self.options.dashlets.length; i++){
							tdashlets.push(self.options.dashlets[i]);
						}
						
						function dashletCreator(){
							if(tdashlets.length==0){
								if(self.dashlets){
									//render the dashlets
									var sdashlets = [];
									for(var i=0;i<self.dashlets.length;i++){
										sdashlets.push(self.dashlets[i]);	
									}
									
									function renderField(){
										if(sdashlets.length==0){
											if(callback){
												callback();
											}
											
											return;
										}
										
										var fieldItem = sdashlets.shift();
										
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
							
							var fieldCfg = tdashlets.shift();
							new FluxUI.Dashlet(fieldCfg, function(dsh){
								self.dashlets.push(dsh);
								dsh.parent = self;
								dashletCreator();
							})
						}
						dashletCreator();
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
