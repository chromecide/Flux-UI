(function(){
	uki.view.declare('uki.view.Dashboard', uki.view.Container, function(Base){
		this.typeName = function() { return 'uki.view.Dashboard'; };
		
		this._setup=function(){
			Base._setup.call(this);	
		}
		
	});
})();
