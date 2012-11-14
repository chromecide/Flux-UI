define(['util'], function(util){
	var workspace = {
		render: function(callback){
			var self = this;
			var size = this.getSize();
			var wsElem = document.createElement('div');
			wsElem.className = 'FluxUI-Workspace';
			wsElem.id = this.name;
			wsElem.innerHTML = 'blah';
			wsElem.style.display = 'block';
			wsElem.style.position = 'absolute';
			wsElem.style.width = size.width;
			wsElem.style.height = size.height;
			//wsElem.style.visibility = 'hidden';
			if(this.launchbars){
				console.log(this.launchbars);
			}
			FluxUI.FluxUI_appendChild(FluxUI.FluxUI_getBody(), wsElem, function(){
				self.rendered = true;
				
				if(callback){
					callback(self);
				}
				FluxUI.emit('FluxUI.Workspace.Rendered', self);
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
				console.log('rendering');
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

