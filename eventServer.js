var FluxNode = require('./lib/FluxSingularity/lib/FluxNode_0.0.1.js').FluxNode;

var basePath = process.env.PWD;
var myNode = new FluxNode({
	mixins: [
		{
			name: basePath+'/lib/server/LayoutEditorMixin.js'
		},
		{
			name: 'Websockets',
			options: {
				host: 'localhost',
				port: 8080
			}
		},
		{
			name: 'pop3',
			options:{
				debug:true,
				autonomous:true,
				Accounts: {
					'Pop3AccountName': {
						host: 'my.mail.hose',
						port: 995,
						username: 'myemail@mydomain.com',
						password: 'mypass',
						poll: true
					}
				}
			}
		}
	]
});
