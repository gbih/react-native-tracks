import { useState, useEffect } from 'react';
import {
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync
} from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);
    //const [subscriber, setSubscriber] = useState(null);

    // tricky to get right!
    useEffect(() => {
        let subscriber;
        // helper function defined inside here
        const startWatching = async () => {
            try {
                await requestPermissionsAsync();
                subscriber = await watchPositionAsync(
                    {
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 10
                    },
                    // passed in as props
                    callback
                );
            } catch (e) {
                // there's a bug in IOS where rejecting permissions will not throw an error!
                setErr(e);
            }
        };

        if (shouldTrack) {
            startWatching();
        } else {
            // stop watching
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }

        // clean up
        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
        // if we referenced any props in the above helper function, must add here!
    }, [shouldTrack, callback]);

    // convention to return properties inside an array
    return [err];
};
