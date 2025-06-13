import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../common/Breadcrumb';
import HeaderOne from '../../layouts/headers/HeaderOne';
import { RecycleMapArea } from './RecycleMapArea';

const RecycleMap = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderOne />
      <Breadcrumb title={t('breadcrumb_recyclemap')} subtitle={t('breadcrumb_recyclemap')} />
      <RecycleMapArea />
    </>
  );
};

export default RecycleMap;
