import { RingApi } from 'ring-client-api'
import { pushover } from './pushover.js';

const ringApi = new RingApi({
  refreshToken: process.env.RING_REFRESHTOKEN
});

async function exit() {
  await new Promise(resolve => setTimeout(resolve, 5000));
  process.exit(0);
}

try {
  const locations = await ringApi.getLocations()
  const location = locations[0]
  // console.log("Ring Location Name: '" + location.locationDetails.name + "'")
  var alarmMode = await location.getAlarmMode()
} catch(e) {
  pushover("ring_api", "Error Connecting to Ring");
  console.log(e)
  await exit();
}

if(alarmMode === "all" || alarmMode === "some") {
  console.log('Ring is armed');
} else {
  console.log('Ring is not armed');
  pushover("ring_api", "Ring is not armed");
}

await exit();
