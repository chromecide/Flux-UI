define([], function(){
	var dialog = {
		getBody: function(callback){
			var elem = document.getElementById(this.name+'Content');
			if(callback){
				callback(elem);	
			}
			return elem;
		},
		show: function(callback){
			var self = this;
			var elem = document.getElementById(this.name+'_wrapper');
			if(elem){
				elem.style.visibility = 'visible';
				winElem = document.getElementById(this.name);
				winElem.style.visibility = 'visible';
			}else{
				var wrapElem = document.createElement('div');
				wrapElem.id = this.name+'_wrapper';
				FluxUI.FluxUI_getSize(function(sz){
					wrapElem.style.position = 'absolute';
					wrapElem.style.display = 'block';
					wrapElem.style.width = sz.width;
					wrapElem.style.height = sz.height;
					wrapElem.style.opacity = 0.5;
					wrapElem.style.filter = 'alpha(opacity=' + 0.5 + ')';
					wrapElem.className = 'FluxUI_DialogWrapper';
					
					winElem = document.createElement('div');
					winElem.id = self.name;
					winElem.className = 'FluxUI_Dialog';
					winElem.style.position = 'absolute';
					winElem.style.display = 'block';
					winElem.style.width = self.size.width;
					winElem.style.height = self.size.height;
					winElem.style.left = ((sz.width/2) - (self.size.width/2));
					winElem.style.top = ((sz.height/2) - (self.size.height/2));
					
					winElem.style.opacity = 1;
					winElem.style.filter = 'alpha(opacity=' + 1 + ')';
					
					winTitleElem = document.createElement('div');
					winTitleElem.className = 'FluxUI_DialogTitle';
					winTitleElem.style.display = 'block';
					winTitleElem.style.position = 'absolute';
					winTitleElem.style.width = (self.size.width-4)+'px';
					winTitleElem.style.height = '35px';
					winTitleElem.style.top = '2px';
					winTitleElem.style.left = '2px';
					winTitleElem.style.float = 'left';
					winTitleElem.innerHTML = self.title;
					
					winContentElem = document.createElement('div');
					winContentElem.id = self.name+'Content';
					winContentElem.style.height = (self.size.height-39)+'px';
					winContentElem.style.display = 'block';
					winContentElem.style.position = 'absolute';
					winContentElem.style.width = (self.size.width-4)+'px';
					winContentElem.style.top = '39px';
					winContentElem.style.left = '2px';
					winContentElem.style.overflow = 'auto';
					
					winElem.appendChild(winTitleElem);
					winElem.appendChild(winContentElem);
					
					FluxUI.FluxUI_appendChild(FluxUI.FluxUI_getBody(), wrapElem, function(){
						FluxUI.FluxUI_appendChild(FluxUI.FluxUI_getBody(), winElem, function(){	
							if(self.dashlets){
								for(var i = 0; i<self.dashlets.length;i++){
									var dashlet = self.dashlets[i];
									console.log(dashlet);
									dashlet.parent = self;
									dashlet.render(function(){
										console.log('dashlet rendered');
									});
								}
							}
							if(callback){
								callback();
							}
						});	
					});
				});
			}
		},
		hide: function(callback){
			console.log('HIDING');
			console.log(this);
			var elem = document.getElementById(this.name+'_wrapper');
			elem.style.visibility = 'hidden';
			
			var winElem = document.getElementById(this.name);
			winElem.style.visibility = 'hidden';
		}
	}
	
	return dialog;
});
