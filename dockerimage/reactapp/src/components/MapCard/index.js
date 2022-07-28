import * as React from 'react';
import { Autocomplete, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, Button } from '@mui/material';
import { Webmap } from '../Webmap';
import { useState } from 'react';
import SelectR from 'react-select';
import L, { map } from 'leaflet';
import { useRef } from 'react';
import { useEffect } from 'react';
import { TerrainProfile } from '../TerrainProfile';


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

    // Definicion de rasters

    const rasters = [
        {
        "label": "DroneSkyOrtofoto Enero",
        "value": "dronesky:Ortofoto_10_cm_1"
    }, {
        "label": "DroneSkyOrtofoto Febrero",
        "value": "dronesky:Ortofoto_10_cm_2"
    }
]
    
    
    const [imgDrone, setImgDrone] = useState(rasters[0].value);
    
    
    const eleccionDrone = [];

    rasters.map((drone, x) => {
        eleccionDrone.push({label: drone.label, value: drone.value, index: x});
        
        return eleccionDrone;
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
                //layers: "dronesky:ORTOFOTO_ISA_10KM_FL04_10cm",
                layers: imgDrone,
                format: "image/png",
                transparent: true,
                version: '1.1.0',
                tiled: false,
                maxZoom: 20,
                detectRetina: true,
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


    const changeImage = (event) => {
        //setImgDrone(event.imagenElegida)
        const newDroneImage = event.value;
        
        setImgDrone(newDroneImage);
        
    }

    return (
        <Container maxWidth="100%" sx={{ mt: 1, mb: 1, px: 0 }}>
            <Grid container spacing={1}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={8}>
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
                <Grid item xs={12} md={4} lg={4}>
                    <Paper elevation={1}
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 450,

                        }}
                    >

                        <Typography component="h2" variant="h5">
                            Consultar torres eléctricas
                        </Typography>

                        <br />

                        <Typography>
                            Para ir hacia una torre eléctrica seleccione la torre de su preferencia e inmediatamente el mapa lo llevará hacia la torre en cuestión.
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

                        <br />

                        <Divider light />

                        <br />

                        <Typography component="h2" variant="h5">
                            Consultar imagenes Drone
                        </Typography>

                        <br />

                        <Typography>
                            Para consultar la imagen de Drone requerida seleccione la opción y la imagen cambiará automáticamente.
                        </Typography>

                        <br />

                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <SelectR
                                name='select-img'
                                options = {eleccionDrone}
                                onChange = {changeImage}
                                //placeholder = 'Seleccione la fotografía aerea'
                                placeholder = {rasters[0].label}
                            >
                            </SelectR>
                            <br />
                            {/* <Button 
                                variant="contained"
                                style={{width: '60%'}}
                                onClick = {cambiarImagenBoton}
                                disableElevation
                            >
                                Consultar imagen
                            </Button> */}
                        </FormControl>


                    </Paper>
                    <br />
                    <Paper 
                        elevation={1}
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 400,

                        }}
                    >
                        <Typography component="h2" variant="h5">
                            Perfil topográfico entre torres
                        </Typography>
                        <TerrainProfile />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export { MapCard }