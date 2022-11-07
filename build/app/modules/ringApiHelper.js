import fs from 'fs';

import { configs, configfile } from './configHelper.js'

import { RingApi } from 'ring-client-api'
import { readFile, writeFile } from 'fs'
import { promisify } from 'util'

const ringApi = new RingApi({
	refreshToken: configs.RING_REFRESHTOKEN
});

ringApi.onRefreshTokenUpdated.subscribe(
    async ({ newRefreshToken, oldRefreshToken }) => {
        // console.log('Refresh Token Updated: ', newRefreshToken)
        if (!oldRefreshToken) {
            return
        }
        const currentConfig = await promisify(readFile)(configfile),
            updatedConfig = currentConfig
                .toString()
                .replace(oldRefreshToken, newRefreshToken)
        await promisify(writeFile)(configfile, updatedConfig)
    }
)

try {
    await ringApi.getLocations()
} catch(e) {
    if(e.toString().indexOf("Unable to authenticate") >= 0) {
        configs.RING_REFRESHTOKEN = ""
        fs.writeFileSync(configfile, JSON.stringify(configs, null, 2))
        throw new Error("ERROR: Auth token is invalid or expired")
    } else {
        throw e
    }
}

export { ringApi }
