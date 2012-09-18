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
			require([ './Components/Dashboard.js'], function(){
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
						
						uki('#fn-loading-window-label')[0].text('Initialising Layout...');
						
						//load the main layout file
						require(['./lib/Dashboard.js'], function(){
							uki('#fn-loading-window-label')[0].text('Dashboard Loaded');
							
							setTimeout(function(){
								uki('#fn-loading-window')[0].hide();
							}, 200);
							
							//test a mixin
							myNode.mixin('../lib/client/LayoutEditor.js', {}, function(){
								uki('#layout-menu-items').dragstart(function(e) {
									console.log('starting drag');
									var thisList = this;
								    e.dataTransfer.setDragImage(uki({ view: 'Label', rect: '200 30', anchors: 'left top', 
								        inset: '0 5', background: 'cssBox(border: 1px solid #CCC;background:#EEF)', 
								        text: thisList.data()[this.selectedIndex()]})
								        , 10, 10);
								    e.dataTransfer.effectAllowed = 'copy';
								    e.dataTransfer.setData('text/plain', this.selectedRows().join('\n'));
								    setTimeout(function(){
								    	uki('#layout-menu').hide();
								    }, 400);
								    
								});
							});
						});
					});
				});
			});
		});
	})
});
