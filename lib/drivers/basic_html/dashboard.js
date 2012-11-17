define(['util'], function(util){
	var dashboard = {
		getBody: function(callback){
			console.log('getBody');
			var elem = document.getElementById(this.name);
			console.log(elem);
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
					
					wsElem.style.top = self.position.top;
					wsElem.style.left = self.position.left;	
					wsElem.style.width = self.size.width;
					wsElem.style.height = self.size.height;
					
					if(callback){
						callback(self, size, pos);
					}
				});
			});
		},
		render: function(callback){
			var self = this;

			self.workspace.getSize(function(size){
				var dshElem = document.createElement('div');
			
				dshElem.className = 'FluxUI_Dashboard';
				dshElem.id = self.name;
				
				dshElem.style.display = 'block';
				dshElem.style.position = 'absolute';
				dshElem.style.width = self.size.width+'px';
				dshElem.style.height = self.size.height+'px';
				dshElem.style.top = self.position.top+'px';
				dshElem.style.left = self.position.left+'px';
				
				self.workspace.getBody(function(bd){
					FluxUI.FluxUI_appendChild(bd, dshElem, function(){
						self.rendered = true;
						if(self.dashlets && self.dashlets.length>0){
							var tList = [];
							for(var i=0;i<self.dashlets.length;i++){
								console.log(self.dashlets[i]);
								tList.push(self.dashlets[i]);
							}
							function doDashletRender(){
								if(tList.length==0){
									FluxUI.emit('FluxUI.Workspace.Dashboard.Rendered', self);
									if(callback){
										callback();
									}
									return;
								}
								
								var dashletItem = tList.shift();
								dashletItem.render(function(){
									doDashletRender();
								});
							}
							doDashletRender();
						}else{
							if(callback){
								callback();
							}
						}
					});	
				});
			});
		},
		show: function(callback){
			var self = this;
			if(!this.rendered){
				this.render(function(elem){
					
					FluxUI.emit('FluxUI.Workspace.Dashboard.Show', self);
				});
			}else{
				document.getElementById(this.name).style.visibility = 'visible';
			}
			
			if(callback){
				callback();
			}
		},
		hide: function(callback){
			var self = this;
			if(!this.rendered){
				this.render(function(elem){
					
					FluxUI.emit('FluxUI.Workspace.Dashboard.HIde', self);
				});
			}else{
				document.getElementById(this.name).style.visibility = 'hidden';
			}
			
			if(callback){
				callback();
			}
		}
	};
	
	return dashboard;
});