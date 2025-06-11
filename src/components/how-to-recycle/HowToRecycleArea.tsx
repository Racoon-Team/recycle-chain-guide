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
        <h4 className="text-center">Papel y Cartón</h4>
        <div className="text-center ">
          <img src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoPapelFinal.webp" className="rounded" />
        </div>
        <br />
        <p>
          Se pueden reciclar hojas blancas usadas, hojas de cuaderno, fotocopias, cartas, periódicos, revistas,
          folletos, cartón corrugado, cartulinas, cajas de embalaje, cilindros de papel.
        </p>

        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>Recuerda</h5>
              Deben estar limpios y secos para facilitar su reciclaje adecuado
            </div>
          </div>

          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>No reciclamos</h5>
              Papel higiénico, papel toalla, servilletas, papel térmico.
            </div>
          </div>
        </div>
      </>
    ),
    pet: (
      <>
        <h4 className="text-center">Plástico PET</h4>
        <div className="text-center ">
          <img
            src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoPlsticoFinal.webp"
            className="rounded"
          />
        </div>
        <br />
        <p>
          Se pueden reciclar botellas desechables de bebidas, aguas, jugos, yogurts, productos de higiene personal y
          limpieza (transparentes y de color), bandejas de frutas y domos de torta.
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>Recuerda</h5>
              Deben estar limpios, secos y compactados para su reciclaje.
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>No reciclamos</h5>
              Envases de aceite deben estar limpios, secos y sin residuos.
            </div>
          </div>
        </div>
      </>
    ),
    duro: (
      <>
        <h4 className="text-center">Plástico Duro</h4>
        <div className="text-center ">
          <img
            src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoPlastico2Final.webp"
            className="rounded"
          />
        </div>
        <br />
        <p>
          Se pueden reciclar tapas de botellas, bidones, botellas de shampoo, cremas y de cosméticos, así como envases
          de detergente, de productos lácteos, de mantequilla y margarina.
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>Recuerda</h5>
              Que deben estar limpios, secos y compactados.
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>No reciclamos</h5>
              Envases de poliestireno, bolsas de plástico ni de alimentos.
            </div>
          </div>
        </div>
      </>
    ),
    tetra: (
      <>
        <h4 className="text-center">Tetra Pak</h4>
        <div className="text-center ">
          <img src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoTetraFinal.webp" className="rounded" />
        </div>
        <br />
        <p>
          Se pueden reciclar envases de cartón como los de leche, jugos, vino y cremas, conocidos como Tetra Pak. Es
          importante enjuagarlos y llevarlos a puntos de acopio adecuados para facilitar su reciclaje.
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>Recuerda</h5>
              Deben estar enjuagados, secos, desarmados y aplastados.
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>No reciclamos</h5>
              Cartones plastificados ni vasos de papel para bebidas calientes.
            </div>
          </div>
        </div>
      </>
    ),
    vidrio: (
      <>
        <h4 className="text-center">Vidrio</h4>
        <div className="text-center ">
          <img
            src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoBotellaFinal.webp"
            className="rounded"
          />
        </div>
        <br />
        <p>
          Se pueden reciclar botellas de cerveza, jugos, vino, leche y yogurt, además de envases de vidrio para
          conservas. Es clave enjuagarlos y depositarlos en contenedores específicos para vidrio.
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>Recuerda</h5>
              Deben estar limpios, secos y sin residuos para reciclar.
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>No reciclamos</h5>
              Espejos, cristales, focos, ni vidrios de automóviles.
            </div>
          </div>
        </div>
      </>
    ),
    latas: (
      <>
        <h4 className="text-center">Latas</h4>
        <div className="text-center ">
          <img src="https://reciclaconsciente.pe/wp-content/uploads/2025/05/IconoLataFinal.webp" className="rounded" />
        </div>
        <br />
        <p>
          Se pueden reciclar latas de aluminio de cerveza, gaseosas, bebidas energizantes, leche, conservas, jugos y
          aerosoles. Además se pueden reciclar envases de hojalata de leche, bebidas y café.
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-success">
              <h5>Recuerda</h5>
              Deben estar limpios, secos y sin etiquetas.
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-danger">
              <h5>No reciclamos</h5>
              Latas de pintura y químicos deben estar vacías y limpias.
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
              <h2>¿Cómo reciclar correctamente?</h2>
              <br />
              <p className="max-w616">
                Selecciona el tipo de material que quieres reciclar para conocer las mejores prácticas.
              </p>
              <p className="mt-4">
                Es importante seguir los lineamientos para asegurar que los materiales puedan ser reciclados sin
                contaminar otros recursos. Mantén siempre los residuos limpios y secos antes de entregarlos.
              </p>
            </div>
          </div>

          {/* <div className="col-lg-5"> */}
          <div className="lonyo-contact-box box2" data-aos="fade-up" data-aos-duration="700">
            <h4>Tipos de materiales reciclables</h4>

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
