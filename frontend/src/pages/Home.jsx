import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f8f8' }}>

      <header className="br-header" style={{ backgroundColor: '#fff' }}>
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
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '3rem 0' }}>
        <div className="container-lg">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

            {/* Left */}
            <div>
              <p style={{
                fontSize: '0.8rem', fontWeight: 700, color: '#1351b4',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '0.75rem', marginTop: 0
              }}>
                Sistema Interno — DATAPREV
              </p>
              <h1 style={{
                fontSize: '2.25rem', fontWeight: 800, color: '#071d41',
                lineHeight: 1.2, marginBottom: '1.25rem', marginTop: 0
              }}>
                Gestão de  
Beneficiários
              </h1>
              <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.75, marginBottom: '2rem' }}>
                Plataforma para cadastro, consulta, atualização e exclusão de
                beneficiários da Previdência Social. Dados persistidos em banco
                relacional com validação de CPF.
              </p>
              <button
                onClick={( ) => navigate('/beneficiarios')}
                style={{
                  backgroundColor: '#1351b4', color: '#fff', border: 'none',
                  borderRadius: '4px', padding: '0.85rem 2rem',
                  fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem'
                }}
              >
                <i className="fas fa-arrow-right"></i>
                Acessar o sistema
              </button>
            </div>

            {/* Right: tech stack info */}
            

          </div>
        </div>
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
