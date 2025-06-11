import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type TabItem = {
  key: string;
  label: string;
};

const HowToRecycleArea = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('papel');

  const tabItems: TabItem[] = [
    { key: 'papel', label: t('materials.papel.label') },
    { key: 'pet', label: t('materials.pet.label') },
    { key: 'duro', label: t('materials.duro.label') },
    { key: 'tetra', label: t('materials.tetra.label') },
    { key: 'vidrio', label: t('materials.vidrio.label') },
    { key: 'latas', label: t('materials.latas.label') },
  ];

  const content: Record<string, ReactNode> = {
    papel: (
      <>
        <h4 className="text-center">{t('materials.papel.title')}</h4>
        <div className="text-center ">
          <img src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoPapelFinal.webp" className="rounded" />
        </div>
        <br />
        <p>{t('materials.papel.description')}</p>

        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>{t('remember')}</h5>
              {t('materials.papel.remember')}
            </div>
          </div>

          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.papel.no_recycle')}
            </div>
          </div>
        </div>
      </>
    ),
    pet: (
      <>
        <h4 className="text-center">{t('materials.pet.title')}</h4>
        <div className="text-center ">
          <img
            src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoPlsticoFinal.webp"
            className="rounded"
          />
        </div>
        <br />
        <p>{t('materials.pet.description')}</p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>{t('remember')}</h5>
              {t('materials.pet.remember')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.pet.no_recycle')}
            </div>
          </div>
        </div>
      </>
    ),
    duro: (
      <>
        <h4 className="text-center">{t('materials.duro.title')}</h4>
        <div className="text-center ">
          <img
            src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoPlastico2Final.webp"
            className="rounded"
          />
        </div>
        <br />
        <p>{t('materials.duro.description')}</p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>{t('remember')}</h5>
              {t('materials.duro.remember')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.duro.no_recycle')}
            </div>
          </div>
        </div>
      </>
    ),
    tetra: (
      <>
        <h4 className="text-center">{t('materials.tetra.title')}</h4>
        <div className="text-center ">
          <img src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoTetraFinal.webp" className="rounded" />
        </div>
        <br />
        <p>{t('materials.tetra.description')}</p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>{t('remember')}</h5>
              {t('materials.tetra.remember')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.tetra.no_recycle')}
            </div>
          </div>
        </div>
      </>
    ),
    vidrio: (
      <>
        <h4 className="text-center">{t('materials.vidrio.title')}</h4>
        <div className="text-center ">
          <img
            src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoBotellaFinal.webp"
            className="rounded"
          />
        </div>
        <br />
        <p>{t('materials.vidrio.description')}</p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>{t('remember')}</h5>
              {t('materials.vidrio.remember')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.vidrio.no_recycle')}
            </div>
          </div>
        </div>
      </>
    ),
    latas: (
      <>
        <h4 className="text-center">{t('materials.latas.title')}</h4>
        <div className="text-center ">
          <img src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoLataFinal.webp" className="rounded" />
        </div>
        <br />
        <p>{t('materials.latas.description')}</p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>{t('remember')}</h5>
              {t('materials.latas.remember')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.latas.no_recycle')}
            </div>
          </div>
        </div>
      </>
    ),
  };

  return (
    <div className="lonyo-section-padding">
      <div className="container">
        <div className="row justify-content-center">
          {/* Text Info */}
          <div className="col-lg-7">
            <div className="lonyo-section-title center">
              <h2>{t('title')}</h2>
              <br />
              <p className="max-w616">{t('intro')}</p>
              <p className="mt-4">{t('explanation')}</p>
            </div>
          </div>

          {/* <div className="col-lg-5"> */}
          <div className="lonyo-contact-box box2" data-aos="fade-up" data-aos-duration="700">
            <h4>{t('types_title')}</h4>

            <div className="d-flex flex-wrap justify-content-start gap-4 my-3">
              {tabItems.map((item) => (
                <div
                  key={item.key}
                  className={`tab-button px-4  rounded ${
                    activeTab === item.key ? 'bg-success text-white ' : 'bg-light '
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveTab(item.key)}>
                  {item.label}
                </div>
              ))}
            </div>

            <div className="bg-light p-3 rounded shadow-sm">{content[activeTab]}</div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default HowToRecycleArea;
