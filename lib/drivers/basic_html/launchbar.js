define(['util'], function(util){
	var launchBar = {
		getBody: function(){
			
		},
		render: function(callback){
			var self = this;
			
			var size = self.workspace.getSize();
			this.size.width = size.width;
			var lbElem = document.createElement('div');
			
			lbElem.className = 'FluxUI-TopLaunchbar';
			lbElem.id = this.name;
			lbElem.innerHTML = 'blah';
			lbElem.style.display = 'block';
			lbElem.style.position = 'absolute';
			lbElem.style.width = this.size.width+'px';
			lbElem.style.height = this.size.height+'px';
			this.workspace.getBody(function(bd){
				FluxUI.FluxUI_appendChild(bd, lbElem, function(){
					self.rendered = true;
					
					if(callback){
						callback(self);
					}
					
					FluxUI.emit('FluxUI.Workspace.Launchbar.Rendered', self);
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