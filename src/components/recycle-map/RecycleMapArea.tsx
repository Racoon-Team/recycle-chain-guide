import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import Swal from 'sweetalert2';
import '../../components/recycle-map/RecycleMapArea.css';
import { FirebaseDB } from '../../firebase/config';
import { reverseGeocode } from './reverseGeocode';

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

const materialOptions = ['Papel y Cartón', 'Plástico PET', 'Plástico Duro', 'Tetra Pak', 'Vidrio', 'Latas'];

const center = { lat: -17.37899629294373, lng: -66.16085892881684 };

export const RecycleMapArea = () => {
  const { t } = useTranslation();

  const [points, setPoints] = useState<RecyclePoint[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newPointPos, setNewPointPos] = useState<{ lat: number; lng: number } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    tipo: [] as string[],
    url: '',
  });

  const [, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    const loadPoints = async () => {
      const snapshot = await getDocs(collection(FirebaseDB, 'recyclingPoints'));
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

    return () => unsubscribe();
  }, []);

  const [fullAddress, setFullAddress] = useState('');

  const MapEvents = () => {
    useMapEvents({
      contextmenu: async (e) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          Swal.fire({
            icon: 'warning',
            title: t('accessDenied'),
            text: t('mustBeLoggedIn'),
            confirmButtonText: t('accept'),
          });
          return null;
        }

        const { lat, lng } = e.latlng;
        setNewPointPos({ lat, lng });
        setShowForm(true);

        const { name, address } = await reverseGeocode(lat, lng);
        setFormData((prev) => ({ ...prev, name }));
        setFullAddress(address);
      },
    });
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, options } = e.target as HTMLSelectElement;

    const newValue =
      type === 'select-multiple'
        ? Array.from(options)
            .filter((o) => o.selected)
            .map((o) => o.value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const [tipoError, setTipoError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPointPos) return;

    if (formData.tipo.length === 0) {
      setTipoError(t('selectMaterialType'));
      return;
    }

    setTipoError('');

    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user?.displayName || 'Anónimo';

    const docRef = await addDoc(collection(FirebaseDB, 'recyclingPoints'), {
      name: formData.name,
      tipo: formData.tipo.join(', '),
      url: formData.url,
      lat: newPointPos.lat,
      lng: newPointPos.lng,
      registerBy: displayName,
    });

    const newPoint: RecyclePoint = {
      id: docRef.id,
      name: formData.name,
      tipo: formData.tipo.join(', '),
      url: formData.url,
      lat: newPointPos.lat,
      lng: newPointPos.lng,
      registerBy: displayName,
    };

    setPoints([...points, newPoint]);
    setShowForm(false);
    setFormData({ name: '', tipo: [], url: '' });
    setNewPointPos(null);

    Swal.fire({
      icon: 'success',
      title: t('registered'),
      text: t('successMessage'),
      confirmButtonText: t('accept'),
    });
  };

  return (
    <div className="containerPrimary">
      <div className="mapArea">
        <MapContainer center={center} zoom={15.5} scrollWheelZoom={false} className="mapContainer">
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
          {newPointPos && (
            <Marker
              position={newPointPos}
              icon={L.icon({
                iconUrl:
                  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
              })}
            />
          )}
          <MapEvents />
        </MapContainer>
      </div>

      {showForm && newPointPos && (
        <div className="formContainer">
          <h3 className="formTitle">{t('addPlace')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label className="formLabel">{t('placeName')}:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="formInput"
              />
              {fullAddress && <p className="formAddress">{fullAddress}</p>}
            </div>

            <div className="formGroup">
              <label className="formLabel">{t('materialType')}:</label>
              <div className="checkboxGroup">
                {materialOptions.map((material) => {
                  const isChecked = formData.tipo.includes(material);
                  return (
                    <label key={material} className="checkboxLabel">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          const updatedTipo = isChecked
                            ? formData.tipo.filter((m) => m !== material)
                            : [...formData.tipo, material];

                          setFormData((prev) => ({ ...prev, tipo: updatedTipo }));

                          if (!isChecked && tipoError) {
                            setTipoError('');
                          }
                        }}
                      />
                      {material}
                    </label>
                  );
                })}
              </div>
              {tipoError && <p className="validation">{tipoError}</p>}
            </div>

            <div className="formGroup">
              <label className="formLabel">{t('optionalUrl')}:</label>
              <input className="formInput" type="url" name="url" value={formData.url} onChange={handleInputChange} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit" className="btnSave">
                {t('save')}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btnCancel">
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
