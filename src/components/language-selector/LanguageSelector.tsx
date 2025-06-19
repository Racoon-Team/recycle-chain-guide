import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select value={i18n.language} onChange={handleChange} className="form-select">
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelector;
