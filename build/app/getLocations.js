import { ringApi } from './modules/ringApiHelper.js'
import { jmespath } from "./modules/jmespath.js"

const locations = await ringApi.getLocations()
var locationData = jmespath.search(locations, "[].locationDetails.{id: location_id, name: name, address: address.address1}")
console.log(locationData)

process.exit(0);
