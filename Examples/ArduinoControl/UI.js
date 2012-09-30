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
				},
				{
					view:'Button',
					id: 'FluxSingularityLEDButton',
					text: 'Toggle LED',
					textSelectable: false
				}
			]
		},
		{
			view: 'Container',
			rect: '0 25 '+(document.body.width)+' '+(document.body.height),
			anchors: 'left top right bottom',
			childViews:[
				
			]
		}
	]
}).attachTo(window,  (document.body.width)+' '+(document.body.height));

uki('#FluxSingularityToolbar')[0]._flow.hidePartlyVisible(false); //this is needed to fix a bug when adding toolbar items

