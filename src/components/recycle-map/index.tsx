import Breadcrumb from '../../common/Breadcrumb';
import HeaderOne from '../../layouts/headers/HeaderOne';
import { RecycleMapArea } from './RecycleMapArea';

const RecycleMap = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Recycle Map" subtitle="Recycle Map" />
      <RecycleMapArea />
    </>
  );
};

export default RecycleMap;
