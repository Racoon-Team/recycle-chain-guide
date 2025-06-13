export const reverseGeocode = async (lat: number, lon: number): Promise<{ name: string; address: string }> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return {
      name: data.name || data.display_name || 'lugar sin nombre',
      address: data.display_name || 'dirección no disponible',
    };
  } catch (error) {
    console.error('error al querer la dirección:', error);
    return {
      name: 'lugar sin nombre',
      address: 'dirección no esta disponible',
    };
  }
};
