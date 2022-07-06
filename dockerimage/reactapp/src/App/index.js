import { Header } from '../components/Header';
import { MapCard } from '../components/MapCard';
import { Webmap } from '../components/Webmap';
import './App.css';
import { useDatosGeoJSON } from './useDatosGeoJSON';

function App() {

  const {
    IP,
    torresJSON,
    replanteoJSON,
    traerDatosJSON,
    datoGeoJSON,
  } = useDatosGeoJSON();

  return (
    <>
      <Header />
      <MapCard
        IP = {IP}
        torresJSON = {torresJSON}
        replanteoJSON = {replanteoJSON}
        traerDatosJSON = {traerDatosJSON}
        datoGeoJSON = {datoGeoJSON}
      />
    </>
  );
}

export default App;
