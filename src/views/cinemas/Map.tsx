import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api";

import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles';

import { Theater } from "src/@core/layouts/types"

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;


export default function Map({ cinemaData }: { cinemaData: Theater[] }) {

    const theme = useTheme();
    var mapRef = useRef<GoogleMap>()
    const center = useMemo<LatLngLiteral>(() => ({ lat: 52.5, lng: 21.5 }), [])
    const options = useMemo<MapOptions>(() => ({
        mapId: theme.palette.mode === "light"? "b56236acd485ce65":"4ffc7dd2f7414b26",
        disableDafaultUI: true,
        clickableIcons: false,
    }), [theme.palette.mode])
    const onLoad = useCallback(map => (mapRef.current = map), [theme.palette.mode])

    return (
        <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <GoogleMap zoom={8}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}>
                {cinemaData.map((singleCinema) => {
                    const {id: id, latitude: latitude, longitude: longitude, name: name } = singleCinema
                    const location: LatLngLiteral = { lat: latitude, lng: longitude}
                    return (
                        <Marker key={id} position={location} label={name} />)
                }
                )}
            </GoogleMap>
        </Paper>
    )
}
