import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import '../../components/how-to-recycle/HowToRecycle.css';

type TabItem = {
  key: string;
  label: string;
};

const HowToRecycleArea = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('papel');

  const tabItems: TabItem[] = [
    { key: 'papel', label: t('materials.papel.title') },
    { key: 'pet', label: t('materials.pet.title') },
    { key: 'duro', label: t('materials.duro.title') },
    { key: 'tetra', label: t('materials.tetra.title') },
    { key: 'vidrio', label: t('materials.vidrio.title') },
    { key: 'latas', label: t('materials.latas.title') },
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
              {t('materials.papel.rememberText')}
            </div>
          </div>

          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.papel.noRecycleText')}
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
              {t('materials.pet.rememberText')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.pet.noRecycleText')}
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
              {t('materials.duro.rememberText')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.duro.noRecycleText')}
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
              {t('materials.tetra.rememberText')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.tetra.noRecycleText')}
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
              {t('materials.vidrio.rememberText')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.vidrio.noRecycleText')}
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
              {t('materials.latas.rememberText')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>{t('no_recycle')}</h5>
              {t('materials.latas.noRecycleText')}
            </div>
          </div>
        </div>
      </>
    ),
  };

  return (
    <div className="lonyo-section-padding">
      <div className="custom-container">
        <div className="lonyo-section-title text-center">
          <h2>{t('title')}</h2>
          <p className="intro-text">{t('intro')}</p>
          <p className="explanation-text">{t('explanation')}</p>
        </div>

        <div className="lonyo-contact-box box2" data-aos="fade-up" data-aos-duration="700">
          <h4>{t('types_title')}</h4>

          <div className="tab-buttons-wrapper">
            {tabItems.map((item) => (
              <div
                key={item.key}
                className={`tab-button ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => setActiveTab(item.key)}>
                {item.label}
              </div>
            ))}
          </div>

          <div className="tab-content">{content[activeTab]}</div>
        </div>
      </div>
    </div>
  );
};

export default HowToRecycleArea;
