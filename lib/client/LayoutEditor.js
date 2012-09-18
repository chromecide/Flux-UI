var mixinFunctions = {
	init: function(){
		var thisNode = this;
		thisNode.LayoutEditor_Settings = {
			editingActive: false
		};
		
		thisNode.LayoutEditor_SetupComponents();
		thisNode.LayoutEditor_SetupDashboardEditing();
	},
	LayoutEditor_SetupComponents: function(){
		var thisNode = this;
		//Update the Main Flux Singularity Menu
		var FluxMenuItems = uki('#FluxSingularityMainMenuItems').data();
		if(!FluxMenuItems){
			uki('#FluxSingularityMainMenuItems').data(["Edit Layout"]);
		}else{
			var data = uki('#FluxSingularityMainMenuItems').data();
			data.push('Edit Layout');
			var menuHeight = uki('#FluxSingularityMainMenuItems')[0]._list._background._height*data.length;
			uki('#FluxSingularityMainMenu').height(menuHeight);
			uki('#FluxSingularityMainMenuItems').height(menuHeight);
			uki('#FluxSingularityMainMenuItems').data(data);
			
			uki('#FluxSingularityMainMenuItems').click(function(){
				var thisList = this;
				switch(thisList.data()[this.selectedIndex()]){
			    	case 'Edit Layout':
			    		thisNode.LayoutEditor_EnableEditing();
			    		
			    		//toggle the menu
			    		var menuData = thisList.data();
			    		menuData[this.selectedIndex()] = 'Exit Layout Editor';
			    		thisList.data(menuData);			    		
			    		break;
			    		break;
			    	case 'Exit Layout Editor':
			    		thisNode.LayoutEditor_DisableEditing();
			    		//toggle the menu
			    		var menuData = thisList.data();
			    		menuData[this.selectedIndex()] = 'Edit Layout';
			    		thisList.data(menuData);			    		
			    		break;
			    }
			});
			
			//add the layout button to the Toolbar bar
			var bt = uki('#FluxSingularityToolbar')[0]._createButton({
				id: 'layout-button',
				text: 'Layout Editor'
			});
			
			var buttons = uki('#FluxSingularityToolbar')[0].buttons();
			buttons.push(bt);
			uki('#FluxSingularityToolbar')[0].buttons(buttons);
			
			//build the layout menu and attach associated events
			uki({
				id: 'layout-menu',
				view: 'Popup',
				rect: '200 300',
				anchors: 'left top',
				relativeTo: uki('#layout-button')[0],
				childViews: [
					{
						view: 'ScrollableList',
						id: 'layout-menu-items',
						anchors: 'left top right bottom',
						rect: '200 300',
						draggable: true,
						textSelectable: false, 
						multiselect: false,
						data:[
							'HSplitPane',
							'VSplitPane',
							'Button',
							'Panel'
						]
					}
				]
			})[0].hide();
			
			uki('#layout-button').click(function() {
			    var button = this;
			    // find relative popup and toggle it
			    if(thisNode.LayoutEditor_Settings.editingActive===true){
			    	uki('#layout-menu').show();	
			    }
			}).visible(false);
			
			uki('#layout-menu-items').dragstart(function(e) {
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
		}
	},
	//loop through any dashboards and add the ability to drop items onto them for layout editing
	LayoutEditor_SetupDashboardEditing: function(){
		var self = this;
		
		
	},
	LayoutEditor_EnableEditing: function(refresh){
		var thisNode = this;
		thisNode.LayoutEditor_Settings.editingActive=true;
		thisNode.emit('LayoutEditor.Start', thisNode, {});
		uki('#layout-button').visible(true).parent().layout();
		if(thisNode.LayoutEditor_Settings.editingActive){
			uki('Dashboard').each(function(i, it){
				//if editing layout or controls is still active for this dashboard
				if(thisNode.DashboardCanAcceptLayout(it) || thisNode.DashboardCanAcceptControls(it)){
    				uki(it).dragover(function(e){
	    				return thisNode.LayoutEditor_DashboardOnOver(it, e);
	    			}).dragenter(function(e){
	    				return thisNode.LayoutEditor_DashboardOnEnter(it, e);
	    			}).dragleave(function(e){
	    				return thisNode.LayoutEditor_DashboardOnLeave(it, e);
	    			}).drop(function(e){
	    				console.log('dropped');
	    				return thisNode.LayoutEditor_DashboardOnDrop(it, e);
	    			}).style({border: '1px dashed #898989'});
	    		}
			});
		}
	},
	LayoutEditor_RefreshEditing: function(){
		console.log('refreshing');
		var thisNode = this;
		if(thisNode.LayoutEditor_Settings.editingActive){
			console.log('Processing Dashboards: '+uki('Dashboard').length)
			uki('Dashboard').each(function(i, it){
				var item = uki(it);
				//if editing layout or controls is still active for this dashboard
				if(thisNode.DashboardCanAcceptLayout(it) || thisNode.DashboardCanAcceptControls(it)){
					//make sure we don't already have the events
					uki(it).unbind('dragover').unbind('dragenter').unbind('dragleave').unbind('drop');
    				
					uki(it).dragover(function(e){
	    				return thisNode.LayoutEditor_DashboardOnOver(it, e);
	    			}).dragenter(function(e){
	    				return thisNode.LayoutEditor_DashboardOnEnter(it, e);
	    			}).dragleave(function(e){
	    				return thisNode.LayoutEditor_DashboardOnLeave(it, e);
	    			}).drop(function(e){
	    				console.log('dropped');
	    				return thisNode.LayoutEditor_DashboardOnDrop(it, e);
	    			}).style({border: '1px dashed #898989'});
	    		}else{
					//remove the listeners we added earlier
					uki(it).unbind('dragover').unbind('dragenter').unbind('dragleave').unbind('drop');
					item.style({border: 'none'});
	    		}
			});
		}
	},
	LayoutEditor_DisableEditing: function(){
		var thisNode = this;
		
		thisNode.LayoutEditor_Settings.editingActive=false;
		uki('#layout-button').visible(false).parent().layout();
		thisNode.emit('LayoutEditor.Stop', {});
		
		uki('Dashboard').each(function(i, it){
			//clear the items drag observers
			var item = uki(it);
			
			//remove the listeners we added earlier
			if(item[0]._observers){
				delete uki(it)[0]._observers['dragover'];
    			delete uki(it)[0]._observers['dragenter'];
    			delete uki(it)[0]._observers['dragleave'];
    			delete uki(it)[0]._observers['drop'];	
			}
			
			item.style({border: 'none'});
		});
		
	},
	
	/*
	 * Dashboard Drag and Drop Events
	 */
	LayoutEditor_DashboardOnOver: function(dashboard, e){
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	},
	LayoutEditor_DashboardOnEnter: function(dashboard, e){
		var self = uki(dashboard);
		//if(self.editingLayout===true){
			switch(e.dataTransfer.getData('text/plain')){
		        case 'HSplitPane':
		        case 'VSplitPane':
		    		//if(self.allowDrop_Layout){
		    			dashboard.style({backgroundColor: '#fff'});
		    		//}    
		        	break;
		        default:
		        	if(self.allowDrop_Module){
		    			dashboard.style({backgroundColor: '#fff'});
		    		}
		        	break;
		    }
		//}
	},
	LayoutEditor_DashboardOnLeave: function(dashboard, e){
		var self = this;
		//if(self.editingLayout===true){
       		dashboard.style({backgroundColor: 'transparent'});
    	//}
	},
	LayoutEditor_DashboardOnDrop: function(dashboard, e){
		e.preventDefault();
    	dashboard.style({backgroundColor: 'transparent'});
    	var thisDashboard = dashboard;
        switch(e.dataTransfer.getData('text/plain')){
        	case 'HSplitPane':
        		if(this.DashboardCanAcceptLayout(thisDashboard)){
	        		var parentHeight = thisDashboard.height();
	        		var parentWidth = thisDashboard.width();
	        		
	        		var itemWidth = (parentWidth-15)/2;
	        		
	        		var newSplit = uki({
	        			id: 'hsplit-1',
	        			view: 'HSplitPane',
	        			rect: '0 0 '+parentWidth+' '+parentHeight,
	        			anchors: 'left top right bottom', 
	        			handleWidth: 15, 
						handlePosition: itemWidth, 
						leftMin: 50, 
						rightMin: 50,
	        			style: {
	        				backgroundColor: 'transparent'
	        			},
	        			leftChildViews:[{
							view: 'Dashboard',
							rect: '0 0 '+itemWidth+' '+parentHeight, 
							anchors: 'left top right bottom',
							editing:true,
							style:{
								border: '1px dashed #898989'
							}
						}],
	        			rightChildViews:{
							view: 'Dashboard',
							rect: '0 0 '+itemWidth+' '+parentHeight, 
							anchors: 'left top right bottom',
							editing:true,
							style:{
								border: '1px dashed #898989'
							}
						}
	        		}).appendTo(dashboard).layout();
        		}
        		break;
        	case 'VSplitPane':
        		if(this.DashboardCanAcceptLayout(thisDashboard)){
	        		var parentHeight = dashboard.height();
	        		var parentWidth = dashboard.width();
	        		var itemHeight = (parentHeight-15)/2;
	        		
	        		var newSplit = uki({
	        			id: 'vsplit-1',
	        			view: 'VSplitPane',
	        			rect: '0 0 '+parentWidth+' '+parentHeight,
	        			anchors: 'left top right bottom', 
	        			handleWidth: 15, 
						handlePosition: itemHeight,
						topMin: 50, 
						bottomMin: 50,
						draggable:false,
	        			style: {
	        				backgroundColor: 'transparent'
	        			},
	        			topChildViews:[{
							draggable:false,
							view: 'Dashboard',
							id: 'main-dash-2',
							rect: '0 0 '+parentWidth+' '+itemHeight, 
							anchors: 'left top right bottom',
							editingLayout:true,
							style:{
								border: '1px dashed #898989'
							}
						}],
	        			bottomChildViews:{
							draggable:false,
							view: 'Dashboard',
							id: 'main-dash-3',
							rect: '0 0 '+parentWidth+' '+itemHeight, 
							anchors: 'left top right bottom',
							editingLayout:true,
							style:{
								border: '1px dashed #898989'
							}
						}
	        		}).appendTo(dashboard).layout();
        		}
        		break;
        	case 'Button':
        		if(this.DashboardCanAcceptControls(thisDashboard)){
	        		uki({
	        			view: 'Button',
	        			text:'Hello World',
	        			draggable:true,
	        			anchors: 'left right top',
	        			rect: '0 '+(dashboard.contentsHeight()+3)+' '+(dashboard.width()-4)+' 23'
	        		}).appendTo(dashboard).layout();
        		}
        		break;
        	default:
	        	if(this.DashboardCanAcceptControls(thisDashboard)){
	        		var componentName = e.dataTransfer.getData('text/plain');
	        		console.log('loading: '+componentName);
	        		var self = dashboard;
	        		require(['./components/'+componentName+'.js'], function(compObj){
	        			uki({
	        				view: componentName,
	        				rect: '1000 1000',
	        				anchors: 'left top bottom right',
	        				text: 'Panel',
	        				style: {
	        					backgroundColor: '#fff'
	        				}
	        			}).appendTo(dashboard).layout();
	        		});
        		}
        		break;
        }
        this.LayoutEditor_RefreshEditing();
	},
	//A Dashboard can only accept layout items if it does not already contain children
	DashboardCanAcceptLayout: function(dashboard){
		var childViews = uki(dashboard).childViews();
		var allowEdit = true; 
		if(childViews.length>0){
			allowEdit = false;
		}
		
		return allowEdit;
	},
	//A Dashboard can only accept controls if the other child views are not part of the layout group
	DashboardCanAcceptControls: function(dashboard){
		var childViews = uki(dashboard).childViews();
		var allowEdit = true;
		
		if(childViews.length>0){
			uki.each(childViews, function(idx, it){
				switch(uki(it).typeName()){
					case 'uki.view.HSplitPane':
					case 'uki.view.VSplitPane':
						allowEdit = false;
						break;
					default:
				}
			});
		}
		
		return allowEdit;
	}
}

if (typeof define === 'function' && define.amd) {
	define(mixinFunctions);
} else {
	module.exports = mixinFunctions;
}
	
