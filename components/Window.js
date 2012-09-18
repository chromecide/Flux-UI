(function(){
	uki.view.declare('uki.view.Window', uki.view.Popup, function(Base){
		this.typeName = function() { return 'uki.view.Window'; };
		this._initClassName = function() {
			var self = this;
			if(uki('#window-bg').length==0){
				uki({
					view: 'Box',
					id:'window-bg',
					rect: screen.width+' '+screen.height,
					style:{
						backgroundColor: '#000',
						opacity: 0.5,
						zIndex: 99999
					}
				}).click(function(){
					self.hide();
				}).visible(false).attachTo(window);
			}
			
	        Base._initClassName.call(this);
	        this.style({zIndex:999999});
			if(!self.relativeTo()){
				this.relativeTo(uki('#window-bg')[0]);
			}
	    }
	    
	    this.show = function(){
	    	uki('#window-bg')[0].visible(true);
	    	return Base.show.call(this);
	    }
	    
	    this.hide = function(){
	    	uki('#window-bg')[0].visible(false);
	    	return Base.hide.call(this);
	    }
	    
	    //need to override the calulcation done by the base class to be able to center the popup withing the window
	    this._recalculateRect = function() {
	    	var rect = Base._recalculateRect.call(this);
	    	
	    	if(rect.x && rect.y){
	    		rect.x = (document.body.offsetWidth/2) - (rect.width/2);
	    		rect.y = (document.body.offsetHeight/2) - (rect.height/3);	
	    	}
	    	return rect;
	    }
	 });
})();
