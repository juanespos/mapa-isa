import * as React from 'react';
import { Autocomplete, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { Webmap } from '../Webmap';
import { useState } from 'react';
import SelectR from 'react-select';
import L, { map } from 'leaflet';
import { useRef } from 'react';
import { useEffect } from 'react';


const MapCard = ({
    IP,
    torresJSON,
    replanteoJSON,
    traerDatosJSON,
    datoGeoJSON,
}) => {



    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    const initialPosition = [10.59307551, -75.20810728];

    const zoomMap = 16;

    const mapRef = useRef();


    const torreIcon = new L.divIcon({
        className: 'my-div-icon',
        iconSize: [10, 10]
    });

    datoGeoJSON(torresJSON);

    const datosTorres = JSON.parse(localStorage.getItem("torres"))

    localStorage.removeItem('torres');

    const [torres, setTorres] = useState('');

    const [location, setLocation] = useState([]);

    const ubicacion = [];

    datosTorres.map((torr, x) => {
        ubicacion.push({value: [torr.geometry.coordinates[1], torr.geometry.coordinates[0]], label: `Torre ${torr.properties.Name}`, index: x});

        return ubicacion;
    });

    
    useEffect(() => {
        setTimeout(() => {
            
            const { current: map } = mapRef;
            traerDatosJSON(torresJSON).then(
                (data) => {
                    const torres = new L.GeoJSON(
                        data,
                        {
                            pointToLayer: (feature, latlng) => {
                                return L.marker(latlng, {
                                    icon: torreIcon,
                                });
                            },
                            onEachFeature: (feature = {}, layer) => {
                                const { properties = {} } = feature;
                                const { Name } = properties;
                                if (!Name) return;
                                layer.bindPopup(`<p><b>Torre ${Name}</b></p>`);
                            }
                        }
                    )

                    torres.addTo(map);


                }
            );

            traerDatosJSON(replanteoJSON).then(
                (data) => {
                    const replanteo = new L.GeoJSON(
                        data, {
                        onEachFeature: (feature = {}, layer) => {
                            layer.setStyle({
                                'color': 'black',
                                'weight': 1.9
                            });
                        }
                    }
                    )

                    replanteo.addTo(map);
                }
            )


            const droneImage = L.tileLayer.wms(`http://${IP}:8080/geoserver/dronesky/wms?`, {
                //layers: "dronesky:ORTOFOTO_ISA_10KM_FL04-001",
                layers: "dronesky:ORTOFOTO_ISA_10KM_FL04_10cm",
                format: "image/png",
                transparent: true,
                version: '1.1.0',
                tiled: false,
                maxZoom: 20,
            }).addTo(map);



        }, 1);
    })


    const handleChange = (event) => {

        const { current: map } = mapRef;

        const newLocation = event.value;

        setLocation(newLocation);
        setTorres(event.label);

        console.log(newLocation)

        map.flyTo(newLocation, 17, { duration: 2 })
        
    }

    return (
        <Container maxWidth="100%" sx={{ mt: 1, mb: 1, px: 0 }}>
            <Grid container spacing={1}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper elevation={1}
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 1000,

                        }}
                    >
                        <Webmap
                            mapRef={mapRef}
                            initialPosition={initialPosition}
                            zoomMap={zoomMap}
                        />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper elevation={1}
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 500,

                        }}
                    >

                        <Typography component="h2" variant="h5">
                            Consultar torres eléctricas
                        </Typography>

                        <br />

                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <SelectR
                                name='select-torre'
                                options = {ubicacion}
                                onChange = {handleChange}
                                placeholder = 'Seleccione la torre eléctrica'
                            >
                            </SelectR>
                        </FormControl>


                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export { MapCard }