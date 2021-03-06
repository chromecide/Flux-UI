var err = false;
require(['./lib/uki.js'], function(){
//require(['http://static.ukijs.org/pkg/0.3.8/uki.js'], function(){
	require(['./themes/wave.js', './Components/Window.js'], function(){
		uki({
			id: 'fn-loading-window',
			view: 'Window',
			rect: '350 100',
			childViews: [
				{
					view: 'Label',
					id: 'fn-loading-window-label',
					text: 'Loading Flux Singularity...',
					anchors: 'left top right bottom',
					rect: '0 0 300 100',
					style: {
						textAlign: 'center'
					}
				}
			]
			
		}).show();
		
		require(['./lib/FluxSingularity/lib/FluxNode_0.0.1.js'], function(FluxNode){
			uki('#fn-loading-window-label')[0].text('Loading Flux-UI Components...');
			require([ './Examples/POP3/POP3Viewer.js'], function(){
				window.myNode = new FluxNode({
					mixins: [
						{
							name: 'Websockets',
							options: {
								host: 'localhost',
								port: 8080
							}
						}
					]
				}, function(nd){
					nd.on('Require.Error', function(nd, err){
						uki('#fn-loading-window-label')[0].text(err.msg);
					});
					nd.on('tunnelready', function(destination, tunnel){
						nd.parentNodeId = destination;
						//override the trigger function to allow routing the events through the newly created Flux-Node
						uki.view.Base.prototype.trigger2 = uki.view.Base.prototype.trigger;
						var newTriggerFunction = function(eventName, evtData){
							//transfer the event through the  node for processing
							if(evtData && evtData.source && evtData.source.id()!=''){
								var newEventName = evtData.source.id()+'.'+eventName;
								
								nd.emit(newEventName, evtData.source.NodeData?evtData.source.NodeData:{component_id: evtData.source.id()});	
							}
							uki.view.Base.prototype.trigger2.apply(this, arguments);
						}
						uki.view.Base.prototype.trigger = newTriggerFunction;
						console.log('subscribing');
						nd.sendEvent(
							destination, 
							'Subscribe', 
							{
								eventName:[
									{
										name:'POP3.MessageReady', 
										fields:['account', 'message'], 
										notfields:['message.html', 'message.headers']
									}
								]
							}
						);
					});
					
					nd.on('POP3.MessageReady', function(message, rawMessage){
						console.log(message);
						var currentData = uki('#POP3_MailList').data();
						//currentData.push(message.message.subject);
						uki('#POP3_MailList').data(currentData);
					});
					uki('#fn-loading-window').hide();
				});
			});
		});
	})
});
