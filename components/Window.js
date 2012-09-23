(function(){
	uki.view.declare('uki.view.Window', uki.view.Popup, {
		
	    close: function(){
	    	//uki('#window-bg')[0].visible(false);
	    	console.log(this);
	    	return this._BASE.hide.call(this);
	    }
	},function(Base){
		this._BASE = Base;
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
						opacity: 0,
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
			
			this.hideOnClick = function(state) {
		        if (state === undefined) return this._clickHandler;
		        if (state != !!this._clickHandler) {
		            if (state) {
		                this._clickHandler = this._clickHandler || uki.proxy(function(e) {
		                    if (uki.dom.contains(this._relativeTo.dom(), e.target)) return;
		                    if (uki.dom.contains(this.dom(), e.target)) return;
		                    /*if(!this.modal){
		                    	this.hide();	
		                    }*/
		                }, this);
		                uki.dom.bind(document.body, 'mousedown', this._clickHandler);
		                uki.dom.bind(window, 'resize', this._clickHandler);
		            } else {
		                uki.dom.unbind(document.body, 'mousedown', this._clickHandler);
		                uki.dom.unbind(window, 'resize', this._clickHandler);
		                this._clickHandler = false;
		            }
		        }
		        return this;
		    };
	    }
	    
	    this.show = function(){
	    	//uki('#window-bg')[0].visible(true);
	    	return Base.show.call(this);
	    }
	    
	    this.hide = function(){
	    	if(!this.modal){
	    		//uki('#window-bg')[0].visible(false);
	    		return Base.hide.call(this);	
	    	}
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
