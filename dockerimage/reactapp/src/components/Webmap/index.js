import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import './Mapa.css';
import "leaflet/dist/leaflet.css";

export const Webmap = ({
    mapRef,
    initialPosition,
    zoomMap,
}) => {
    
    return (
        <>

            <MapContainer
                ref={mapRef}
                center={initialPosition}
                zoom={zoomMap}
                zoomControl={false}
            >

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

                    maxZoom={20}
                />

                <ZoomControl
                    position="topleft"
                />
            </MapContainer>


        </>
    )
}
