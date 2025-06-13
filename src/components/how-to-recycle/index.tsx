import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../common/Breadcrumb';
import HeaderOne from '../../layouts/headers/HeaderOne';
import HowToRecycleArea from './HowToRecycleArea';

const HowToRecycle = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderOne />
      <Breadcrumb title={t('breadcrumb_howtorecycle')} subtitle={t('breadcrumb_howtorecycle')} />
      <HowToRecycleArea />
    </>
  );
};

export default HowToRecycle;
