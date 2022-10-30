import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api";

import Paper from '@mui/material/Paper'

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;


export default function Map() {

    const [office, setOffice] = useState<LatLngLiteral>()
    const mapRef = useRef<GoogleMap>()
    const center = useMemo<LatLngLiteral>(() => ({ lat: 52.5, lng: 21.5 }), [])
    const options = useMemo<MapOptions>(() => ({
        mapId: "4ffc7dd2f7414b26",
        disableDafaultUI: true,
        clickableIcons: false,
    }), [])
    const onLoad = useCallback(map => (mapRef.current = map), [])
    useEffect(() => {
        setOffice({ lat: 52.5, lng: 21.5 })
    }, []);

    return (
        <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <div className="container">
                <div className="map">
                    <GoogleMap zoom={8}
                        center={center}
                        mapContainerClassName="map-container"
                        options={options}
                        onLoad={onLoad}>
                        {office && <Marker position={office} label="test" />}
                    </GoogleMap>
                </div>
            </div>
        </Paper>
    )
}
