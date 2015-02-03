const   express 	= require('express')
		, sockets 	= require('socket.io')
		, http 		= require('http')
		, config 	= require('./config.json');

const datasoure = require('./core/mongo.js');
datasoure.list();
let tmp = datasoure.proxy.dfgdfgdfg;

const app = express();
const server = http.Server(app)

const io = sockets(server);


app.use('/', express.static(__dirname));
app.use('/', express.static(__dirname + '/views'));

io.on('connection', function(socket){

	socket.on('message', function(data){
		socket.to(data.group).emit('message', data.message);
	});

	socket.on('join', function(data){
		socket.emit('message', {sender: '.', text: 'joined'});
		socket.join(data.group);
	});

	socket.on('leave', function(data){
		socket.leave(data.group);
	});
});


server.listen(config.port, function(){
    console.log('Express server listening on port ' + config.port);
});