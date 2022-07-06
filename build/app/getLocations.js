// ALLOW US TO USE REQUIRE IN OUR MODULE
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { RingApi } from 'ring-client-api'

const ringApi = new RingApi({
  refreshToken: process.env.RING_REFRESHTOKEN
});

const locations = await ringApi.getLocations()

var jmespath = require('jmespath');
var locationData = jmespath.search(locations, "[].locationDetails.{id: location_id, name: name, address: address.address1}")
console.log(locationData)
process.exit(0);
