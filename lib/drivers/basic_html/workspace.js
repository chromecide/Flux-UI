define(['util', './launchbar'], function(util){
	var workspace = {
		render: function(callback){
			var self = this;
			var size = this.getSize();
			var wsElem = document.createElement('div');
			wsElem.className = 'FluxUI-Workspace';
			wsElem.id = this.name;
			wsElem.style.display = 'block';
			wsElem.style.position = 'absolute';
			wsElem.style.width = size.width;
			wsElem.style.height = size.height;
			//wsElem.style.visibility = 'hidden';
			
			FluxUI.FluxUI_appendChild(FluxUI.FluxUI_getBody(), wsElem, function(){
				self.rendered = true;
				if(self.launchbars){
				if(self.launchbars.top){
						self.launchbars.top.render();
					}
				}
				if(callback){
					callback(self);
				}
				FluxUI.emit('FluxUI.Workspace.Rendered', self);
			});
			
		},
		getBody: function(callback){
			var elem = document.getElementById(this.name);
			console.log(elem);
			if(callback){
				callback(elem);
			}
			
			return elem;
		},
		show: function(callback){
			var self = this;
			if(!this.rendered){
				this.render(function(elem){
					console.log('SHOWN');
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

