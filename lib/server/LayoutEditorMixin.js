var mixinFunctions = {
	init: function(){
		var self = this;
		//add properties that are needed by this mixin
		self.on('tunnelready', function(destinationId, tunnel){
			//have to send them one at a tme for the moment as there is a scope issue in the browser subscribe loop
			self.sendEvent(destinationId, 'Subscribe', {eventName: [{name: 'LayoutEditor.Start'}]});
			self.sendEvent(destinationId, 'Subscribe', {eventName: ['LayoutEditor.Stop']});
			self.sendEvent(destinationId, 'Subscribe', {eventName: [{name: 'FluxSingularityMainButton.click', fields:['component_id']}]});
			
		});
		//add Events that are emitted by this mixin
		self.on('LayoutEditor.Start', function(msg, rawMessage){
			console.log('LayoutEditor Started: '+rawMessage._message.sender);
		});
		
		self.on('LayoutEditor.Stop', function(msg, rawMessage){
			console.log('LayoutEditor Stopped: '+rawMessage._message.sender);
		});
		
		self.on('FluxSingularityMainButton.click', function(msg, rawMsg){
			
		});
	}
}

if (typeof define === 'function' && define.amd) {
	define(mixinFunctions);
} else {
	module.exports = mixinFunctions;
}
	