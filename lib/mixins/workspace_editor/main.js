define([], function(){
	var wsEditorMixin = {
		init: function(cfg, callback){
			var thisNode = this;
			
			thisNode.on('FluxUI.Workspace.StartEdit', thisNode.wsEditor_onStartEditor);
			
			if(callback){
				callback(cfg);
			}
			
			thisNode.emit('Mixin.Ready', cfg);
		},
		wsEditor_onStartEditor: function(message, rawMessage){
			console.log(message);
			if(!message.workspace || message.workspace==''){
				message.workspace = false;
			}
			
			new FluxUI.Dialog(
				{
					title: 'Workspace Editor',
					dashlets:[
						{
							type: 'form',
							name: 'wsEditorForm',
							options:{
								fields:[
									{
										type: 'form/inputfield',
										name: 'wsName',
										options: {
											label: 'Name',
											type:' text'
										}
									},
									{
										type: 'form/selectfield',
										name: 'wsTargetDevice',
										options: {
											label: 'Target Device',
											data: [
												{
													value: 'Browser',
													display: 'Browser'
												},
												{
													value: 'Tablet',
													display: 'Tablet'
												},
												{
													value: 'Phone',
													display: 'Phone'
												}
											]
										}
									},
									{
										type: 'form/fieldgroup',
										name: 'wsLaunchbars',
										options:{
											label: 'Launchbars',
											fields: [
												{
													type: 'form/fieldgroup',
													name: 'wsTopLaunchbarEnabled',
													options:{
														label: 'Top',
														checkLabel: true,
														fields: [
															{
																type: 'form/inputfield',
																name: 'wsTopLaunchbarHeight',
																options: {
																	type: 'text',
																	label: 'Height'
																}
															}
														]
													}
												},
												{
													type: 'form/fieldgroup',
													name: 'wsLeftLaunchbarEnabled',
													options:{
														label: 'Left',
														checkLabel: true,
														fields: [
															{
																type: 'form/inputfield',
																name: 'wsLeftLaunchbarWidth',
																options: {
																	type: 'text',
																	label: 'Width'
																}
															}
														]
													}
												},
												{
													type: 'form/fieldgroup',
													name: 'wsRightLaunchbarEnabled',
													options:{
														label: 'Right',
														checkLabel: true,
														fields: [
															{
																type: 'form/inputfield',
																name: 'wsRightLaunchbarHeight',
																options: {
																	type: 'text',
																	label: 'Width'
																}
															}
														]
													}
												},
												{
													type: 'form/fieldgroup',
													name: 'wsBottomLaunchbarEnabled',
													options:{
														label: 'Bottom',
														checkLabel: true,
														fields: [
															{
																type: 'form/inputfield',
																name: 'wsBottomLaunchbarHeight',
																options: {
																	type: 'text',
																	label: 'Height'
																}
															}
														]
													}
												}
											] 
										}
									}
								]
							}
						}
					]
				},
				function(dlg){
					dlg.show();
				}
			);
		},
		wsEditor_onWorkspaceSave: function(message, rawMessage){
			
		}
	}
	
	return wsEditorMixin;
});
