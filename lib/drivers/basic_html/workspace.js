define(['util', './launchbar'], function(util){
	var workspace = {
		refresh: function(callback){
			var self = this;
			var wsElem = document.getElementById(self.name);
			self.getSize(function(size){
				wsElem.style.width = size.width;
				wsElem.style.height = size.height;
				if(callback){
					
					callback(self, size);
				}
			});
		},
		render: function(callback){
			var self = this;
			self.getSize(function(size){
				var wsElem = document.createElement('div');
				wsElem.className = 'FluxUI-Workspace';
				wsElem.id = self.name;
				wsElem.style.display = 'block';
				wsElem.style.position = 'absolute';
				wsElem.style.width = size.width;
				wsElem.style.height = size.height;
				//wsElem.style.visibility = 'hidden';
				
				FluxUI.FluxUI_appendChild(FluxUI.FluxUI_getBody(), wsElem, function(){
					self.rendered = true;
					if(self.launchbars){
						if(self.launchbars.top){
							self.launchbars.top.render(function(){
								if(self.launchbars.bottom){
									self.launchbars.bottom.render(function(){
										if(self.launchbars.left){
											self.launchbars.left.render(function(){
												if(self.launchbars.right){
													self.launchbars.right.render(function(){
														if(callback){
															callback();
														}
													});
												}else{
													if(callback){
														callback();
													}
												}
											});
										}else{
											if(self.launchbars.right){
												self.launchbars.right.render(function(){
													if(callback){
														callback();
													}
												});
											}	
										}	
									});
								}else{
									if(self.launchbars.left){
										self.launchbars.left.render(function(){
											if(self.launchbars.right){
												self.launchbars.right.render(function(){
													if(callback){
														callback();
													}
												});
											}else{
												if(callback){
													callback();
												}
											}
										});
									}else{
										if(self.launchbars.right){
											self.launchbars.right.render(function(){
												if(callback){
													callback();
												}
											});
										}	
									}		
								}
							});
						}else{
							if(self.launchbars.bottom){
								self.launchbars.bottom.render(function(){
									
								});
							}else{
								if(self.launchbars.left){
									self.launchbars.left.render(function(){
										if(self.launchbars.right){
											self.launchbars.right.render(function(){
												if(callback){
													callback();
												}
											});
										}else{
											if(callback){
												callback();
											}
										}	
									});
								}else{
									if(callback){
										callback();
									}
								}
							}
						}
					}
					if(callback){
						callback(self);
					}
					FluxUI.emit('FluxUI.Workspace.Rendered', self);
				});	
			});
		},
		getBody: function(callback){
			var elem = document.getElementById(this.name);
			
			if(callback){
				callback(elem);
			}
			
			return elem;
		},
		show: function(callback){
			var self = this;
			if(!this.rendered){
				this.render(function(elem){
					FluxUI.emit('FluxUI.Workspace.Show', self);
				});
			}else{
				document.getElementById(this.name).style.visibility = 'visible';
			}
			
			if(callback){
				callback();
			}
		},
		hide: function(){
			
		}
	}
		
	return workspace;
});

