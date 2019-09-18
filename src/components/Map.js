import React, { useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
    const {
        state: { currentLocation, locations }
    } = useContext(LocationContext);

    if (!currentLocation) {
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
    }

    return (
        <View>
            <MapView
                style={styles.map}
                initialRegion={{
                    // Echigo Yuzawa: latitude: 36.92883868885581, longitude: 138.84093308199655,
                    ...currentLocation.coords,
                    // zoom level
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                // automatically update map and re-center/re-zoom
                // region={{
                //     ...currentLocation.coords,
                //     latitudeDelta: 0.01,
                //     longitudeDelta: 0.01
                // }}
            >
                <Circle
                    center={currentLocation.coords}
                    radius={30} // meters
                    strokeColor="rgba(158, 158, 255, 1.0)"
                    fillColor="rgba(158, 158, 255, 0.3)"
                />
                <Polyline coordinates={locations.map(loc => loc.coords)} />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 500
    }
});

export default Map;
