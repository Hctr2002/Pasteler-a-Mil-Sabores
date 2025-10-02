import '../styles/theme.css';

function PrincipalPage() {
  return (
    <section className="home-content">
      <div className="screen">
        <h2>Bienvenido a Mil Sabores</h2>
        <p>
          Descubre nuestros deliciosos pasteles y postres artesanales. ¡Estamos aquí para satisfacer tus antojos!
        </p>
      </div>

      <div className="screen">
        <h2>Sobre nosotros</h2>
        <p>
          Pastelería 1000 Sabores celebra su 50 aniversario como un referente en la repostería chilena. Famosa por su participación en un récord Guinness en 1995, cuando colaboró en la creación de la torta más grande del mundo, la pastelería busca renovar su sistema de ventas online para ofrecer una experiencia de compra moderna y accesible para sus clientes.
        </p>
      </div>

      <div className="screen">
        <h2>Nuestra Misión</h2>
        <p>
          Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces históricas y fomentamos la creatividad en la repostería.
        </p>
      </div>
    </section>
  );
}

export default PrincipalPage;