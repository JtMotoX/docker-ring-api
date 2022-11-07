import { pushover } from './modules/pushover.js';
import { ringApi } from './modules/ringApiHelper.js'
import { asyncExit } from './modules/asyncExit.js'

try {
  const locations = await ringApi.getLocations()
  const location = locations[0]
  // console.log("Ring Location Name: '" + location.locationDetails.name + "'")
  var alarmMode = await location.getAlarmMode()
} catch(e) {
  pushover("ring_api", "Error Connecting to Ring");
  console.log(e)
  await asyncExit();
}

if(alarmMode === "all" || alarmMode === "some") {
  console.log('Ring is armed');
} else {
  console.log('Ring is not armed');
  pushover("ring_api", "Ring is not armed");
}

await asyncExit();
