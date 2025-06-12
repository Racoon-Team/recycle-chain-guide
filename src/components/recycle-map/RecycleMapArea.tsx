import { addDoc, collection, getDocs } from 'firebase/firestore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { FirebaseDB } from '../../firebase/config';

import { getAuth } from 'firebase/auth';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

type RecyclePoint = {
  id: string;
  name: string;
  tipo: string;
  registerBy: string;
  url: string;
  lat: number;
  lng: number;
};

const center = { lat: -17.3895, lng: -66.1568 };

export const RecycleMapArea = () => {
  const [points, setPoints] = useState<RecyclePoint[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newPointPos, setNewPointPos] = useState<{ lat: number; lng: number } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    tipo: '',
    url: '',
  });

  useEffect(() => {
    const loadPoints = async () => {
      const snapshot = await getDocs(collection(FirebaseDB, 'lugaresReciclaje'));
      const pointsData: RecyclePoint[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.lat && data.lng) {
          pointsData.push({
            id: doc.id,
            name: data.name || 'Sin nombre',
            tipo: data.tipo || 'Desconocido',
            registerBy: data.registerBy || 'Anónimo',
            url: data.url || '',
            lat: data.lat,
            lng: data.lng,
          });
        }
      });

      setPoints(pointsData);
    };

    loadPoints();
  }, []);
  const MapEvents = () => {
    useMapEvents({
      contextmenu(e) {
        setNewPointPos(e.latlng);
        setShowForm(true);
      },
    });
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPointPos) return;

    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user?.displayName || 'Anónimo';

    const docRef = await addDoc(collection(FirebaseDB, 'lugaresReciclaje'), {
      name: formData.name,
      tipo: formData.tipo,
      url: formData.url,
      lat: newPointPos.lat,
      lng: newPointPos.lng,
      registerBy: displayName,
    });

    const newPoint: RecyclePoint = {
      id: docRef.id,
      name: formData.name,
      tipo: formData.tipo,
      url: formData.url,
      lat: newPointPos.lat,
      lng: newPointPos.lng,
      registerBy: displayName,
    };

    setPoints([...points, newPoint]);
    setShowForm(false);
    setFormData({ name: '', tipo: '', url: '' });
    setNewPointPos(null);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={center} zoom={15.5} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((point) => (
          <Marker key={point.id} position={{ lat: point.lat, lng: point.lng }}>
            <Popup>
              <strong>{point.name}</strong>
              <br />
              Tipo: {point.tipo}
              <br />
              Registrado por: {point.registerBy}
              <br />
              {point.url && (
                <a href={point.url} target="_blank" rel="noopener noreferrer">
                  Más información
                </a>
              )}
            </Popup>
          </Marker>
        ))}

        <MapEvents />
      </MapContainer>

      {showForm && newPointPos && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            zIndex: 1000,
            width: '300px',
          }}>
          <h3>Agregar lugar de reciclaje</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre del Lugar:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </label>
            <br />
            <label>
              Tipo de material:
              <input type="text" name="tipo" value={formData.tipo} onChange={handleInputChange} required />
            </label>
            <br />
            <label>
              URL (opcional):
              <input type="url" name="url" value={formData.url} onChange={handleInputChange} />
            </label>
            <br />
            <button type="submit">Guardar</button>{' '}
            <button type="button" onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
