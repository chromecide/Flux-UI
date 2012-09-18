var FluxNode = require('../../../lib/FluxSingularity/lib/FluxNode_0.0.1.js').FluxNode;

var mailHost = '';
var mailPort = 995;
var mailUsername = '';
var mailPassword = '';

var basePath = process.env.PWD;
var myNode = new FluxNode({
	mixins: [
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
						host: mailHost,
						port: mailPort,
						username: mailUsername,
						password: mailPassword,
						poll: true
					}
				}
			}
		}
	]
});
