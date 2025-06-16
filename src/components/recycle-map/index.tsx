import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../common/Breadcrumb';
import HeaderOne from '../../layouts/headers/HeaderOne';
import { RecycleMapArea } from './RecycleMapArea';

const RecycleMap = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderOne />
      <Breadcrumb title={t('breadcrumbRecyclemap')} subtitle={t('breadcrumbRecyclemap')} />
      <RecycleMapArea />
    </>
  );
};

export default RecycleMap;
