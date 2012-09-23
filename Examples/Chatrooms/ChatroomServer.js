var FluxNode = require('../../lib/FluxSingularity/lib/FluxNode.js').FluxNode;

var ChatroomServer = new FluxNode({
	id: '64756fb1-cab9-4213-bba4-2a2fb7c88afb',
	mixins:[
		{
			name: 'Websockets'
		},
		{
			name: 'Chatrooms'
		}
	]
});

console.log(ChatroomServer.id);
