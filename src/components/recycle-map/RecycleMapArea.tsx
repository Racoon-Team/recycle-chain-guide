import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import Swal from 'sweetalert2';
import '../../components/recycle-map/RecycleMapArea.css';
import { FirebaseDB } from '../../firebase/config';
import { reverseGeocode } from './reverseGeocode';

import 'leaflet/dist/leaflet.css';
// import latas from '../../../public/assets/img/lata.png';
// import papelCarton from '../../../public/assets/img/papel.png';
// import plasticoDuro from '../../../public/assets/img/plasticoDuro.png';
// import plasticoPet from '../../../public/assets/img/plasticoPet.png';
// import tetraPack from '../../../public/assets/img/tetraPack.png';
// import vidrio from '../../../public/assets/img/vidrio.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

type RecyclePoint = {
  id: string;
  placeName: string;
  street: string;
  tipo: string | string[];
  registerBy: string;
  url: string;
  lat: number;
  lng: number;
};

const materialOptions = [
  'materialsOptions.paper',
  'materialsOptions.plasticPet',
  'materialsOptions.hardPlastic',
  'materialsOptions.tetrapak',
  'materialsOptions.glass',
  'materialsOptions.cans',
];

const tipoIcons: Record<string, string> = {
  'materialsOptions.paper': '/assets/img/papel.png',
  'materialsOptions.plasticPet': '/assets/img/plasticoPet.png',
  'materialsOptions.hardPlastic': '/assets/img/plasticoDuro.png',
  'materialsOptions.tetrapak': '/assets/img/tetraPack.png',
  'materialsOptions.glass': '/assets/img/vidrio.png',
  'materialsOptions.cans': '/assets/img/lata.png',
};

const center = { lat: -17.37899629294373, lng: -66.16085892881684 };
const AdjusMapToResults = ({ points }: { points: RecyclePoint[] }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length === 1) {
      const point = points[0];
      map.setView([point.lat, point.lng], 17);
    } else if (points.length > 1) {
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [points, map]);
  return null;
};

export const RecycleMapArea = () => {
  const { t } = useTranslation();

  const [selectedPoint, setSelectedPoint] = useState<{ id: string; lat: number; lng: number } | null>(null);
  const [selectedPoint2, setSelectedPoint2] = useState<RecyclePoint | null>(null);

  const [points, setPoints] = useState<RecyclePoint[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newPointPos, setNewPointPos] = useState<{ lat: number; lng: number } | null>(null);
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const [formData, setFormData] = useState({
    placeName: '',
    street: '',
    tipo: [] as string[],
    url: '',
  });

  const [, setIsAuthenticated] = useState(false);

  const handleCardClick = (id: string, lat: number, lng: number) => {
    setSelectedPoint({ id, lat, lng });
  };
  const [loading, setLoading] = useState(true);
  const MapFlyTo = ({ id, lat, lng }: { id: string; lat: number; lng: number }) => {
    const map = useMap();

    useEffect(() => {
      map.flyTo([lat, lng], 18, { animate: true });

      const marker = markerRefs.current[id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 500);
      }
    }, [id, lat, lng, map]);

    return null;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPoints, setFilteredPoints] = useState<RecyclePoint[]>([]);

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
            placeName: data.placeName || '',
            street: data.street || 'Sin nombre de calle',
            tipo: data.tipo || 'Desconocido',
            registerBy: data.registerBy || 'Anónimo',
            url: data.url || '',
            lat: data.lat,
            lng: data.lng,
          });
        }
      });
      setPoints(pointsData);
      setLoading(false);
      setFilteredPoints(pointsData);
    };

    loadPoints();

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = points.filter(
      (point) =>
        point.placeName.toLowerCase().includes(lower) ||
        point.street.toLowerCase().includes(lower) ||
        point.tipo.toLowerCase().includes(lower)
    );
    setFilteredPoints(filtered);
  }, [searchTerm, points]);

  const [fullAddress, setFullAddress] = useState('');

  const MapEvents = () => {
    useMapEvents({
      click: async (e) => {
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
        setSelectedPoint(null);

        const { address } = await reverseGeocode(lat, lng);
        setFormData((prev) => ({ ...prev, street: address }));
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
      placeName: formData.placeName,
      street: formData.street,
      tipo: formData.tipo,
      url: formData.url,
      lat: newPointPos.lat,
      lng: newPointPos.lng,
      registerBy: displayName,
    });

    const newPoint: RecyclePoint = {
      id: docRef.id,
      placeName: formData.placeName,
      street: formData.street,
      tipo: formData.tipo,
      url: formData.url,
      lat: newPointPos.lat,
      lng: newPointPos.lng,
      registerBy: displayName,
    };

    setPoints([...points, newPoint]);
    setShowForm(false);
    setFormData({ placeName: '', street: '', tipo: [], url: '' });
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
        <MapContainer center={center} zoom={15.5} scrollWheelZoom={true} className="mapContainer">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {points.map((point) => (
            <Marker
              key={point.id}
              position={{ lat: point.lat, lng: point.lng }}
              eventHandlers={{ click: () => setSelectedPoint2(point) }}
            />
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
          {selectedPoint && <MapFlyTo id={selectedPoint.id} lat={selectedPoint.lat} lng={selectedPoint.lng} />}
        </MapContainer>

        {selectedPoint2 && (
          <div className="custom-popup-backdrop" onClick={() => setSelectedPoint2(null)}>
            <div className="custom-popup" onClick={(e) => e.stopPropagation()}>
              <h5 className="place-name-header">{selectedPoint2.placeName}</h5>

              <div className="recycle-card-icons">
                {(typeof selectedPoint2.tipo === 'string'
                  ? selectedPoint2.tipo.split(',').map((t) => t.trim())
                  : selectedPoint2.tipo
                ).map((tipoKey) => {
                  const iconPath = tipoIcons[tipoKey];
                  const tipoTraducido = t(tipoKey);

                  return (
                    <div key={tipoKey} className="icon-with-label-modal">
                      {iconPath ? (
                        <img src={iconPath} alt={tipoTraducido} className="recycle-icon-modal" />
                      ) : (
                        <span className="recycle-icon-placeholder">{tipoTraducido}</span>
                      )}
                      <span className="icon-label">{tipoTraducido}</span>
                    </div>
                  );
                })}
              </div>
              <br />

              <p className="type-text-modal">
                <strong>{t('availableType')}</strong> <br />
                {Array.isArray(selectedPoint2.tipo)
                  ? selectedPoint2.tipo.map((key) => t(key)).join(', ')
                  : t(selectedPoint2.tipo)}
              </p>
              <p className="street-text-modal">
                <strong>{t('address')}</strong> <br /> {selectedPoint2.street}
              </p>
              <br />

              {selectedPoint2.url && (
                <a href={selectedPoint2.url} target="_blank" rel="noopener noreferrer">
                  {t('moreInfo')}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="placeListArea">
        <h4>{t('recycling.recyclingPlaces')}</h4>
        <div>
          {loading ? (
            <div className="spinner-container">
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : points.length === 0 ? (
            <div className="centered-container">
              <p>{t('recycling.noPlacesRegistered')}</p>
            </div>
          ) : null}
        </div>
        {points.map((recyclePoint, index) => (
          <div
            key={recyclePoint.id}
            className="card mb-3 clickable-card"
            onClick={() => handleCardClick(recyclePoint.id, recyclePoint.lat, recyclePoint.lng)}>
            <div className="recycle-card-header">
              {index + 1}. {recyclePoint.placeName}
            </div>

            <div className="card-body">
              <div className="card-title">
                <div className="recycle-card-icons">
                  {(typeof recyclePoint.tipo === 'string'
                    ? recyclePoint.tipo.split(',').map((t) => t.trim())
                    : recyclePoint.tipo
                  ).map((tipoKey) => {
                    const iconPath = tipoIcons[tipoKey];
                    const tipoTraducido = t(tipoKey);

                    return (
                      <div key={tipoKey} className="icon-with-label">
                        {iconPath ? (
                          <img src={iconPath} alt={tipoTraducido} className="recycle-icon" />
                        ) : (
                          <span className="recycle-icon-placeholder">{tipoTraducido}</span>
                        )}
                        <span className="icon-label">{tipoTraducido}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="street-text">
                <strong>{t('address')}</strong> {recyclePoint.street.split(',').slice(0, 3).join(',')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showForm && newPointPos && (
        <div className="formContainer">
          <h3 className="formTitle">{t('addPlace')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label className="formLabel">{t('placeName')}:</label>
              <input
                type="text"
                name="placeName"
                value={formData.placeName}
                onChange={handleInputChange}
                required
                className="formInput"
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">{t('streetName')}:</label>
              <input
                type="text"
                name="street"
                value={formData.street}
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
                      {t(material)}
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

            <div className="buttonGroup">
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
