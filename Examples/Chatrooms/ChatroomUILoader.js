var err = false;
var mainWindow;
var loginWindow;
var roomListWindow;
var joinRoomWindow;
var registerNickWindow;

var currentNick;

var chatFluxNode;
require(['./lib/uki.js'], function(){
//require(['http://static.ukijs.org/pkg/0.3.8/uki.js'], function(){
	require(['./themes/wave.js', './Components/Window.js'], function(){
		mainWindow = uki({
			id: 'fn-chatrooms-main-window',
			view: 'Window',
			rect: '0 0 1000 500',
			childViews: [
				{
					view: 'Toolbar',
					id: 'ChatroomsToolbar',
					rect: '0 0 1000 24',
					anchors: 'left top right',
					background: 'theme(toolbar-normal)',
					buttons:[
						{
							view:'Button',
							id: 'FluxSingularityMainButton',
							text: 'FluxNode - Chatrooms',
							textSelectable: false,
							style: {
								fontWeight: 'bold'
							}
						},
						{
							view:'Button',
							id: 'ChatroomsToolbar-ListRooms',
							text: 'List Rooms',
							textSelectable: false,
							style: {
								fontWeight: 'normal',
								whiteSpace: 'no-wrap'
							}
						},
						{
							view:'Button',
							id: 'ChatroomsToolbar-JoinRoom',
							text: 'Join Room',
							textSelectable: false
						},
						{
							view:'Button',
							id: 'ChatroomsToolbar-RegisterNick',
							text: 'Register Nick',
							textSelectable: false
						},
						{
							view:'Button',
							id: 'ChatroomsToolbar-Logout',
							text: 'Logout',
							textSelectable: false
						}
					]
				},
			]
		})[0];
		
		mainWindow.hide();
		//chat toolbar event handlers
		
		//Register Nick Button
		uki('#ChatroomsToolbar-RegisterNick').click(function(){
			var nickLabel = uki('#ChatroomsRegisterNick-NickLabel').text(currentNick);
			registerNickWindow.show();
		});
		
		//List Rooms Button
		uki('#ChatroomsToolbar-ListRooms').click(function(message, rawMessage){
			var searchTerm = '';
			
			chatFluxNode.on('Chatrooms.RoomList', function(message){
				var roomListComp = uki('#Chatrooms-room-list-list');
				var roomListData = [];
				
				for(var roomName in message){
					var roomData = message[roomName];
					
					roomListData.push(['<b>'+roomName+': </b>'+roomData.topic, roomName, roomData]);
				}
				
				if(roomListData.length==0){
					roomListData.push(['No Rooms Found', '', {}]);
				}
				roomListComp.data(roomListData);
			});
			
			chatFluxNode.sendEvent(chatFluxNode.ChatroomsServerID, 'Chatrooms.ListRooms', {
				searchTerm: searchTerm
			});
			
			roomListWindow.show();
		});
		
		//logout button
		uki('#ChatroomsToolbar-Logout').click(function(){
			chatFluxNode.sendEvent(chatFluxNode.ChatroomsServerID, 'Chatrooms.Quit', {});
			if(mainWindow.visible()){
				mainWindow.close();
			}
			
			loginWindow.show();
		});
		
		//RegisterNick Window
		registerNickWindow = uki({
			id: 'fn-chatrooms-registernick-window',
			view: 'Window',
			rect: '300 150',
			childViews: [
				{
					view: 'Container',
					rect: '0 0 300 125',
					childViews: [
						{
							view: 'Label',
							rect: '10 10 60 24',
							text: 'Nick'
						},
						{
							view: 'Label',
							id: 'ChatroomsRegisterNick-NickLabel',
							rect: '70 10 220 24',
							text: currentNick
						},
						{
							view: 'Label',
							id: 'ChatroomsRegister_PassLabel',
							rect: '10 50 60 24',
							text: 'Password'
						},
						{
							view: 'PasswordTextField',
							id: 'ChatroomsRegister_PassField',
							rect: '70 50 220 24'
						}
					]
				},
				{
					view: 'Container',
					rect: '0 125 '+(document.body.width)+' 24',
					anchors: 'left top right',
					background: 'theme(toolbar-normal)',
					childViews:[
						{
							view:'Button',
							id: 'ChatroomsCancelRegisterNickButton',
							text: 'Cancel',
							rect: '80 0 100 24',
							textSelectable: false
						},
						{
							view:'Button',
							id: 'ChatroomsRegisterNickButton',
							text: 'Register Nick',
							rect: '190 0 100 24',
							textSelectable: false
						}
					]
				}
			]
			
		})[0];
		registerNickWindow.hide();
		//register Nick functions
		
		uki('#ChatroomsCancelRegisterNickButton').click(function(){
			var passField = uki('#ChatroomsRegister_PassField')[0];
			passField.value('');
			
			registerNickWindow.close();
		});
		
		uki('#ChatroomsRegisterNickButton').click(function(){
			console.log('registering');
			var passField = uki('#ChatroomsRegister_PassField')[0];
			var pass = passField.value();
			
			var successFunc = function(message, rawMessage){
				regiterNickWindow.close();	
			}
			
			var failFunc = function(message, rawMessage){
				registerNickWindow.close();
			}
			
			chatFluxNode.on('Chatrooms.NickReserved', successFunc);
			
			chatFluxNode.sendEvent(chatFluxNode.ChatroomsServerID, 'Chatrooms.RegisterNick', {
				authtoken: pass
			});
		});
		
		//login Window
		loginWindow = uki({
			id: 'fn-chatrooms-login-window',
			view: 'Window',
			rect: '300 150',
			childViews: [
				{
					view: 'Container',
					rect: '0 0 300 125',
					childViews: [
						{
							view: 'Label',
							rect: '10 10 60 24',
							text: 'Nick'
						},
						{
							view: 'TextField',
							id: 'ChatroomsLogin_NickField',
							rect: '70 10 220 24'
						},
						{
							view: 'Label',
							id: 'ChatroomsLogin_PassLabel',
							rect: '10 50 60 24',
							text: 'Password',
							visible: false
						},
						{
							view: 'PasswordTextField',
							id: 'ChatroomsLogin_PassField',
							rect: '70 50 220 24',
							visible: false
						}
					]
				},
				{
					view: 'Container',
					rect: '0 125 '+(document.body.width)+' 24',
					anchors: 'left top right',
					background: 'theme(toolbar-normal)',
					childViews:[
						{
							view:'Button',
							id: 'ChatroomsConnectButton',
							text: 'Connect',
							rect: '190 0 100 24',
							textSelectable: false
						}
					]
				}
			]
			
		})[0];
		
		var T = '';
		
		//Room List Window
		roomListWindow = uki({
			id: 'fn-chatrooms-roomlist-window',
			view: 'Window',
			rect: '300 300',
			childViews: [
				{
					view: 'ScrollableList',
					id: 'Chatrooms-room-list-list',
					rect: '0 0 300 274',
					render: {
					    template: [
		                    '<div style="height:35px;text-align:left;font-size:12px;margin:4px 0 4px 39px;position:relative">', T, '</div>'
		                ],
					    render: function(data, rect, i) {
					        return uki.extend(this.template, data[0]).join('');
					    },
					    setSelected: function(container, data, state, focus) {
					        container.style.backgroundColor = state && focus ? '#E0E8A4' : state ? '#CCC' : '';
					    }
					},
					data:[
						['Loading...']
					]
				},
				{
					view: 'Container',
					rect: '0 275 '+(document.body.width)+' 24',
					anchors: 'left top right',
					background: 'theme(toolbar-normal)',
					childViews:[
						{
							view:'Button',
							id: 'ChatroomsListJoinRoomButton',
							text: 'Join Room',
							rect: '80 0 100 24',
							textSelectable: false
						},
						{
							view:'Button',
							id: 'ChatroomsCloseRoomListButton',
							text: 'Close',
							rect: '190 0 100 24',
							textSelectable: false
						}
					]
				}	
			]
			
		})[0];
		roomListWindow.hide();
		
		uki('#ChatroomsListJoinRoomButton').click(function(){
			var listComp = uki('#Chatrooms-room-list-list')[0];
			var selectedRec = listComp.selectedRow(); 
			var roomName = selectedRec[1];
			console.log('connecting to room: '+roomName);
			chatFluxNode.sendEvent(chatFluxNode.ChatroomsServerID, 'Chatrooms.JoinRoom', {room: roomName});
			roomListWindow.hide();	
		});
		
		uki('#ChatroomsCloseRoomListButton').click(function(){
			roomListWindow.hide();	
		});
		
		require(['./lib/FluxSingularity/lib/FluxNode.js'], function(FluxNode){
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
				chatFluxNode = nd;
				//we'll only recieve this once, when the websocket tunnel is ready, 
				//the destinationID when that fires will be the only destination we need to send to for this application
				chatFluxNode.on('tunnelready', function(destination, tunnel){
					chatFluxNode.ChatroomsServerID = destination;
					uki('#ChatroomsConnectButton').click(function(){
						var nickField = uki('#ChatroomsLogin_NickField')[0];
						var passField = uki('#ChatroomsLogin_PassField')[0];
						var passLabel = uki('#ChatroomsLogin_PassLabel')[0];
						 
						var nick = nickField.value();
						var pass=  passField.value();
						
						if(pass==''){ //initial connection
							
							//create the connect and connectFailed functions here so we can remove the opposite one
							var connectedFunc = function(message, rawMessage){
								console.log('connected');
								loginWindow.close();
								mainWindow.show();
								currentNick = nick;
								console.log(currentNick);
								chatFluxNode.off('Chatrooms.ConnectFailed', failedConnectFunc);
								chatFluxNode.off('Chatrooms.Connected', connectedFunc);
								nickField.value('');
								passField.value('').visible(false);
								passLabel.visible(false);
							}
							var failedConnectFunc = function(message, rawMessage){
								console.log('connect failed');
								if(message.error_id==2){//reserved nick need to identify
									alert('This is a Reserved Nick. You will need to identify within 30 seconds before being allowed to continue');
									uki('#ChatroomsLogin_PassLabel').visible(true);
									uki('#ChatroomsLogin_PassField').visible(true).parent().layout();
								}else{
									console.log(message);
								}
							}
							
							chatFluxNode.once('Chatrooms.Connected', connectedFunc);
							
							chatFluxNode.once('Chatrooms.ConnectFailed', failedConnectFunc);
							
							chatFluxNode.sendEvent(destination, 'Chatrooms.Connect',{
								nick: nick
							});
						}else{ //identifying
							chatFluxNode.sendEvent(destination, 'Chatrooms.Identify', {
								authtoken: pass
							});
						}
					});
					
					chatFluxNode.on('Chatrooms.RoomMessage', function(message, rawMessage){
						console.log(arguments);
					});
					
					loginWindow.show();
				});
			});
		});
	})
});
