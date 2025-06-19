import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select value={i18n.language} onChange={handleChange} className="form-select">
      <option value="es">{t('languages.es')}</option>
      <option value="en">{t('languages.en')}</option>
    </select>
  );
};

export default LanguageSelector;
