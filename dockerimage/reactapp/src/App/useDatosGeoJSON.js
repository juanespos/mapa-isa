import React from 'react';

const useDatosGeoJSON = () => {

    const IP = "18.117.160.54"

    const torresJSON = `http://${IP}:8080/geoserver/dronesky/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dronesky%3ACentroide_Torres&outputFormat=application%2Fjson`;

    const replanteoJSON = `http://${IP}:8080/geoserver/dronesky/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dronesky%3Alineas&outputFormat=application%2Fjson`;

    const traerDatosJSON = async (url) => {
        const response = await (await fetch(url)).json();
        return (response);
    }


    const datoGeoJSON = (datos) => 
    {traerDatosJSON(datos).then(
        (data) => {

            const devolver = data.features;
            localStorage.setItem('torres', JSON.stringify(devolver))
            
        }
    ) }


  return {
    IP,
    torresJSON,
    replanteoJSON,
    traerDatosJSON,
    datoGeoJSON,
  }
}

export {useDatosGeoJSON}