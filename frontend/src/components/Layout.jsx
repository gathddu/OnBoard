import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function getBreadcrumbs(pathname) {
  if (pathname === '/beneficiarios') return [{ label: 'Beneficiários' }]
  if (pathname === '/beneficiarios/novo') return [
    { label: 'Beneficiários', to: '/beneficiarios' },
    { label: 'Novo' }
  ]
  if (pathname.endsWith('/editar')) return [
    { label: 'Beneficiários', to: '/beneficiarios' },
    { label: 'Editar' }
  ]
  if (/^\/beneficiarios\/\d+$/.test(pathname)) return [
    { label: 'Beneficiários', to: '/beneficiarios' },
    { label: 'Visualizar' }
  ]
  return []
}

export default function Layout({ children }) {
  const location = useLocation()
  const crumbs = getBreadcrumbs(location.pathname)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])


  return (
    <div>
      <header className="br-header">
        <div className="container-lg">

          {/* header */}
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
            <div className="header-actions">
              <div className="header-links dropdown">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  title={darkMode ? 'Modo claro' : 'Modo escuro'}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    color: '#1351b4',
                    padding: '0.4rem',
                    borderRadius: '50%',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <i className="fas fa-adjust" aria-hidden="true"></i>
                </button>

              </div>
            </div>
          </div>

          {/* system name */}
          <div className="header-bottom">
            <div className="header-menu">
              <span style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#071d41',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}>
                Gestão de Beneficiários
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* breadcrumb */}
      <div className="container-lg mt-3">
        <nav aria-label="Você está em:" className="br-breadcrumb">
          <ol className="br-list" role="list" style={{background: '#f8f8f8'}}>
            <li className="crumb home">
              <Link to="/beneficiarios" className="br-button circle">
                <i className="fas fa-home" aria-hidden="true"></i>
                <span className="sr-only">Página inicial</span>
              </Link>
            </li>
            {crumbs.map((crumb, i) => (
              <li key={i} className="crumb" data-active={!crumb.to ? 'true' : undefined}>
                <i className="fas fa-chevron-right" aria-hidden="true"></i>
                {crumb.to
                  ? <a href={crumb.to} style={{ color: ' #333', textDecoration: 'none' }}>{crumb.label}</a>
                  : <span style={{ color: '#1351b4', fontWeight: 600 }}>{crumb.label}</span>
                }
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <main className="container-lg mt-4 mb-5">
        {children}
      </main>

      <footer className="br-footer">
        <div className="container-lg">
          <div className="footer-bottom">
            <div className="footer-info">
              <div className="text-down-01 text-medium pb-3">
                © {new Date().getFullYear()} DATAPREV — Empresa de Tecnologia e Informações da Previdência Social
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
