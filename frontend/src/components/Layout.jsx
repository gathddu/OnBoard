import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div>

      {/* header */}
      <header className="br-header" id="header">
        <div className="container-lg">
          <div className="header-top">
            <div className="header-logo">
              <img
                src="https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png"
                alt="Governo Federal"
                style={{ height: '40px' }}
              />
              <span className="br-divider vertical mx-half mx-sm-1"></span>
              <div className="header-sign">DATAPREV</div>
            </div>
          </div>
          <div className="header-bottom">
            <div className="header-menu">
              <div className="header-menu-trigger">
                <span className="br-tag text-down-01 text-basetitle text-uppercase font-weight-bold">
                  Gestão de Beneficiários
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* breadcrumb */}
      <div className="container-lg mt-3">
        <nav aria-label="Você está em:" className="br-breadcrumb">
          <ol className="br-list" role="list">
            <li className="crumb home">
              <Link to="/beneficiarios" className="br-button circle">
                <i className="fas fa-home" aria-hidden="true"></i>
                <span className="sr-only">Página inicial</span>
              </Link>
            </li>
            <li className="crumb" data-active="true">
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
              <span>Beneficiários</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* main */}
      <main className="container-lg mt-4 mb-5">
        {children}
      </main>

      {/* footer */}
      <footer className="br-footer">
        <div className="container-lg">
          <div className="footer-bottom">
            <div className="footer-info">
              <div className="text-down-01 text-medium pb-3">
                © {new Date( ).getFullYear()} DATAPREV — Empresa de Tecnologia e Informações da Previdência Social
              </div>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  )
}
