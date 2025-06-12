import { addDoc, collection, getDocs } from 'firebase/firestore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { FirebaseDB } from '../../firebase/config';

import { getAuth } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
    <div style={{ display: 'flex', height: '82vh', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <MapContainer center={center} zoom={15.5} scrollWheelZoom={false} style={{ height: '80%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {points.map((point) => (
            <Marker key={point.id} position={{ lat: point.lat, lng: point.lng }}>
              <Popup>
                <strong>{point.name}</strong>
                <br />
                {t('type')}: {point.tipo}
                <br />
                {t('registeredBy')}: {point.registerBy}
                <br />
                {point.url && (
                  <a href={point.url} target="_blank" rel="noopener noreferrer">
                    {t('moreInfo')}
                  </a>
                )}
              </Popup>
            </Marker>
          ))}

          <MapEvents />
        </MapContainer>
      </div>

      {showForm && newPointPos && (
        <div
          style={{
            height: '630px',
            width: '320px',
            backgroundColor: 'white',
            padding: '1.5rem',
            borderLeft: '1px solid #ccc',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}>
          <h3 style={{ marginBottom: '1rem' }}>{t('addPlace')}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.1rem' }}>{t('placeName')}:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {t('materialType')}:
              </label>
              <input
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {t('optionalUrl')}:
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#2e7d32',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}>
                {t('save')}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#c62828',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}>
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
