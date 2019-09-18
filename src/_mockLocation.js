import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            // Echigo-Yuzawa
            longitude: 138.8408505648172 + increment * tenMetersWithDegrees,
            latitude: 36.928694060994886 + increment * tenMetersWithDegrees
        }
    };
};

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    });
    counter++;
}, 1000);
/*
Once every second, we event an event directly into the Location library. 
We essentially simulate the changing user location in the real world.

location() will have our fake location that changes once every second.
Once every second, we get a changed longitude and latitude by 10 meters.

This will allow us to test out our tracking code.
*/
