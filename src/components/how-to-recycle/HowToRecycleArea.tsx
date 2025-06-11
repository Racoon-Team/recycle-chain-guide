import { useState, type ReactNode } from 'react';

type TabItem = {
  key: string;
  label: string;
};

const HowToRecycleArea = () => {
  const [activeTab, setActiveTab] = useState<string>('papel');

  const tabItems: TabItem[] = [
    { key: 'papel', label: 'Papel y cartón' },
    { key: 'pet', label: 'Plástico PET' },
    { key: 'duro', label: 'Plástico duro' },
    { key: 'tetra', label: 'Tetra Pak' },
    { key: 'vidrio', label: 'Vidrio' },
    { key: 'latas', label: 'Latas' },
  ];

  const content: Record<string, ReactNode> = {
    papel: (
      <>
        <h4>Papel y Cartón</h4>
        <p>
          Se pueden reciclar hojas blancas usadas y sin usar, hojas de cuaderno, fotocopias, fax, cartas, periódicos,
          revistas, folletos, cartón corrugado, cartulinas, cajas de embalaje, kraft, cilindros de papel absorbente e
          higiénico, papel y cartón plastificado o encerado.
        </p>
        <div className="alert alert-success">
          <h5>Recuerda</h5>
          Deben estar limpios y secos.
        </div>
        <div className="alert alert-danger">
          <h5>No reciclamos</h5>
          No reciclamos papel higiénico, papel toalla, servilletas, papel térmico.
        </div>
      </>
    ),
    pet: (
      <>
        <h4>Plástico PET</h4>
        <p>
          Se pueden reciclar botellas desechables de bebidas, aguas, jugos, yogurts, productos de higiene personal y
          limpieza (transparentes y de color), bandejas de frutas y domos de torta. Puedes identificarlos fácilmente
          porque cuentan con este símbolo:
        </p>
        <div className="alert alert-success">
          <h5>Recuerda</h5>
          Que deben estar limpios, secos y compactados.
        </div>
        <div className="alert alert-danger">
          <h5>No reciclamos</h5>
          Envases de aceite.
        </div>
      </>
    ),
    duro: (
      <>
        <h4>Plástico Duro</h4>
        <p>
          Se pueden reciclar tapas de botellas, bidones, botellas de shampoo, cremas y de cosméticos, así como envases
          de detergente, de productos lácteos, de mantequilla y margarina. Puedes identificarlos fácilmente porque
          cuentan con estos símbolos:
        </p>
        <div className="alert alert-success">
          <h5>Recuerda</h5>
          Que deben estar limpios, secos y compactados.
        </div>
        <div className="alert alert-danger">
          <h5>No reciclamos</h5>
          Envases de tecnopor o poliestireno, bolsas de plástico ni de alimentos.
        </div>
      </>
    ),
    tetra: (
      <>
        <h4>Tetra Pak</h4>
        <p>Se pueden reciclar envases de cartón para leches, jugos, vino y cremas.</p>
        <div className="alert alert-success">
          <h5>Recuerda</h5>
          Que deben estar enjuagados, secos, desarmados y aplastados.
        </div>
        <div className="alert alert-danger">
          <h5>No reciclamos</h5>
          Cartones plastificados ni vasos de papel para bebidas calientes.
        </div>
      </>
    ),
    vidrio: (
      <>
        <h4>Vidrio</h4>
        <p>
          Se pueden reciclar botellas de cerveza, jugos, vino, leche y yogurt, así como envases de vidrio para
          conservas.
        </p>
        <div className="alert alert-success">
          <h5>Recuerda</h5>
          Que deben estar limpios y secos.
        </div>
        <div className="alert alert-danger">
          <h5>No reciclamos</h5>
          Espejos, cristales y lozas, tubos fluorescentes, focos ahorradores, ni vidrios de automóviles.
        </div>
      </>
    ),
    latas: (
      <>
        <h4>Latas</h4>
        <p>
          Se pueden reciclar latas de aluminio de cerveza, gaseosas, bebidas energizantes, leche, conservas, jugos y
          aerosoles. Además se pueden reciclar envases de hojalata de leche, bebidas y café.
        </p>
        <div className="alert alert-success">
          <h5>Recuerda</h5>
          Que deben estar limpios, secos y sin etiquetas.
        </div>
        <div className="alert alert-danger">
          <h5>No reciclamos</h5>
          Latas de pintura y químicos.
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
              <h2>¿Cómo reciclar correctamente?</h2>
              <p className="max-w616">
                Selecciona el tipo de material que quieres reciclar para conocer las mejores prácticas.
              </p>
              <p className="mt-3">
                Es importante seguir los lineamientos para asegurar que los materiales puedan ser reciclados sin
                contaminar otros recursos. Mantén siempre los residuos limpios y secos antes de entregarlos.
              </p>
            </div>
          </div>

          {/* <div className="col-lg-5"> */}
          <div className="lonyo-contact-box box2" data-aos="fade-up" data-aos-duration="700">
            <h4>Tipos de materiales reciclables</h4>

            <div className="d-flex flex-wrap justify-content-start gap-2 my-3">
              {tabItems.map((item) => (
                <div
                  key={item.key}
                  className={`tab-button px-3 py-1 rounded ${
                    activeTab === item.key ? 'bg-success text-white fw-bold' : 'bg-light text-dark'
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
