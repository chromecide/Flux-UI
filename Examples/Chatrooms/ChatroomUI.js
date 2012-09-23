uki({
	view: 'Box',
	rect: '0 0 '+(document.body.width)+' '+(document.body.height), 
	anchors: 'left top right bottom',
	childViews:[
		{
			view: 'Toolbar',
			id: 'FluxSingularityToolbar',
			rect: '0 0 '+(document.body.width)+' 24',
			anchors: 'left top right',
			background: 'theme(toolbar-normal)',
			buttons:[
				{
					view:'Button',
					id: 'FluxSingularityMainButton',
					text: 'Flux Singularity',
					textSelectable: false
				}
			]
		},
		{
			view: 'Container',
			rect: '0 25 '+(document.body.width)+' '+(document.body.height),
			anchors: 'left top right bottom',
			childViews:[
				{
					view: 'HSplitPane',
        			rect: '0 0 '+(document.body.width)+' '+(document.body.height),
        			anchors: 'left top right bottom', 
        			handleWidth: 15, 
					handlePosition: 200,
					leftMin: 50, 
					rightMin: 50,
					leftChildViews:[
						{
							view: 'ScrollableList',
							id: 'POP3_MailList',
							anchors: 'left top right bottom',
							rect: '0 0 300 '+(document.body.height),
							draggable: true,
							textSelectable: false, 
							multiselect: false,
							data:[]
						}
					],
					rightChildViews: [
					
					]
				}
			]
		}
	]
}).attachTo(window,  (document.body.width)+' '+(document.body.height));

uki('#FluxSingularityToolbar')[0]._flow.hidePartlyVisible(false); //this is needed to fix a bug when adding toolbar items

uki({
	id: 'FluxSingularityMainMenu',
	view: 'Popup',
	rect: '200 300',
	anchors: 'left top',
	relativeTo: uki('#FluxSingularityMainButton')[0],
	childViews: [
		{
			view: 'ScrollableList',
			id: 'FluxSingularityMainMenuItems',
			anchors: 'left top right bottom',
			rect: '200 300',
			draggable: true,
			textSelectable: false, 
			multiselect: false,
			data:[]
		}
	]
})[0].hide();

uki('#FluxSingularityMainMenuItems').click(function(){
	uki('#FluxSingularityMainMenu').hide();
});

uki('#FluxSingularityMainButton').click(function(){
	if(uki('#FluxSingularityMainMenuItems').data().length>0){
		uki('#FluxSingularityMainMenu').show();	
	}
});
