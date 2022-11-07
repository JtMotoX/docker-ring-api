import fs from 'fs';

var configfile = "/persist/config.json"

// CREATE CONFIG FILE IF NOT EXISTS
try {
	fs.writeFileSync(configfile, "{}", { flag: 'wx' })
} catch(e) {
	if(e.code != "EEXIST") { throw e; }
}

// GET CONFIGS
const configs = JSON.parse(fs.readFileSync(configfile));
const configsOriginal = JSON.parse(JSON.stringify(configs));

// DEFAULT REFRESH TOKEN
configs.RING_REFRESHTOKEN = configs.RING_REFRESHTOKEN || process.env.RING_REFRESHTOKEN

// UPDATE CONFIGS IF NEEDED
if(JSON.stringify(configs) != JSON.stringify(configsOriginal)) {
	try {
		fs.writeFileSync(configfile, JSON.stringify(configs, null, 2))
	} catch(e) {
		console.log("Error writing file:", e);
	}
}

export { configs, configfile }
