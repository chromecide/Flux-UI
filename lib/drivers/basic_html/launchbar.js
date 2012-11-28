define(['util'], function(util){
	var launchBar = {
		getBody: function(callback){
			
			var elem = document.getElementById(this.name+'_list');
			
			if(callback){
				callback(elem);
			} 
			return elem;
		},
		refresh: function(callback){
			var self = this;
			var wsElem = document.getElementById(self.name);
			
			self.calculateSize(function(size){
				self.size = size;
				self.calculatePosition(function(pos){
					self.position = pos;
					if(wsElem){
						wsElem.style.top = self.position.top;
						wsElem.style.left = self.position.left;	
						wsElem.style.width = self.size.width;
						wsElem.style.height = self.size.height;
						
						if(self.launchers){
							console.log(self.launchers);
							for(var i=0;i<self.launchers.length;i++){
								console.log(self.launchers[i]);
								self.launchers[i].refresh();
							}
						}	
					}
					
					
					if(callback){
						callback(self, size, pos);
					}
				});
			});
		},
		render: function(callback){
			var self = this;

			self.workspace.getSize(function(size){

				var lbElem = document.createElement('div');
			
				lbElem.className = 'FluxUI-'+self.location+'Launchbar';
				lbElem.id = self.name;
				
				lbElem.style.display = 'block';
				lbElem.style.position = 'absolute';
				lbElem.style.width = self.size.width+'px';
				lbElem.style.height = self.size.height+'px';
				lbElem.style.top = self.position.top+'px';
				lbElem.style.left = self.position.left+'px';
				
				//add the list element used for showing the launchbar "buttons"
				var ulElem = document.createElement('ul');
				ulElem.id = lbElem.id+'_list';
				ulElem.style.width = self.size.width+'px';
				ulElem.style.height = self.size.height+'px';
				ulElem.style.top = self.position.top+'px';
				ulElem.style.left = self.position.left+'px';
				ulElem.style.padding ='0 0 0 0';
				ulElem.style.left = '0 0 0 0';
				
				lbElem.appendChild(ulElem);
				
				self.workspace.getBody(function(bd){
					FluxUI.FluxUI_appendChild(bd, lbElem, function(){
						self.rendered = true;
						if(self.launchers && self.launchers.length>0){
							var tList = [];
							for(var i=0;i<self.launchers.length;i++){
								tList.push(self.launchers[i]);
							}
							function doLauncherRender(){
								if(tList.length==0){
									FluxUI.emit('FluxUI.Workspace.Launchbar.Rendered', self);
									if(callback){
										
										callback();
									}
									return;
								}
								
								var launcherItem = tList.shift();
								launcherItem.render(function(){
									doLauncherRender();
								});
							}
							doLauncherRender();
						}else{
							if(callback){
								callback();
							}
						}
					});	
				});
			});
		},
		show: function(){
			var self = this;
			if(!this.rendered){
				this.render(function(elem){
					
					FluxUI.emit('FluxUI.Workspace.Launchbar.Show', self);
				});
			}else{
				document.getElementById(this.name).style.visibility = 'visible';
			}
			
			if(callback){
				callback();
			}
		}
	};
	
	return launchBar;
});