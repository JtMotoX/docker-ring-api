// ALLOW US TO USE REQUIRE IN OUR MODULE
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var Pushover = require('node-pushover');

var PUSHOVER_RING_TOKEN = process.env.PUSHOVER_RING_TOKEN
var PUSHOVER_RING_USER = process.env.PUSHOVER_RING_USER

if (PUSHOVER_RING_TOKEN && PUSHOVER_RING_USER) {
	var push = new Pushover({
		token: PUSHOVER_RING_TOKEN,
		user: PUSHOVER_RING_USER
	});
}

export function pushover(subject, message) {
	if (PUSHOVER_RING_TOKEN && PUSHOVER_RING_USER) {
		push.send(subject, message, function (err, res){
			if(err) return console.log(err);
			console.log("Sent notification");
		});
	}
}