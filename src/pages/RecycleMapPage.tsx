import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



export const RecycleMapPage = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[-17.3895, -66.1568]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-17.3895, -66.1568]}>
          <Popup>
            Cochabamba
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

