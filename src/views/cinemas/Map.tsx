import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api";

import Paper from '@mui/material/Paper'

import { Cinema } from "src/@core/layouts/types"

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;


export default function Map({ cinemaData }: { cinemaData: Cinema[] }) {

    const mapRef = useRef<GoogleMap>()
    const center = useMemo<LatLngLiteral>(() => ({ lat: 52.5, lng: 21.5 }), [])
    const options = useMemo<MapOptions>(() => ({
        mapId: "4ffc7dd2f7414b26",
        disableDafaultUI: true,
        clickableIcons: false,
    }), [])
    const onLoad = useCallback(map => (mapRef.current = map), [])

    return (
        <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <div className="container">
                <div className="map">
                    <GoogleMap zoom={8}
                        center={center}
                        mapContainerClassName="map-container"
                        options={options}
                        onLoad={onLoad}>
                        {cinemaData.map((singleMeal) => {
                            const { location: location, name: name } = singleMeal
                            return (
                                <Marker position={location} label={name} />)
                        }
                        )}
                    </GoogleMap>
                </div>
            </div>
        </Paper>
    )
}
