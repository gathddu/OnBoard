import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getBeneficiario } from '../services/api'

export default function VisualizacaoBeneficiario() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [beneficiario, setBeneficiario] = useState(null)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    getBeneficiario(id)
      .then((res) => setBeneficiario(res.data))
      .catch(() => setErro('Beneficiário não encontrado.'))
  }, [id])

  if (!beneficiario && !erro) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="br-loading medium" role="progressbar" aria-label="Carregando..."></div>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <Link to="/beneficiarios" className="br-button circle mr-2" title="Voltar">
          <i className="fas fa-arrow-left" aria-hidden="true"></i>
        </Link>
        <h2 className="mb-0">Dados do Beneficiário</h2>
      </div>

      {erro && (
        <div className="br-message danger" role="alert">
          <div className="icon"><i className="fas fa-times-circle fa-lg" aria-hidden="true"></i></div>
          <div className="content">{erro}</div>
        </div>
      )}

      {beneficiario && (
        <div className="br-card">
          <div className="card-content">
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <p className="text-down-01 text-medium mb-1">ID</p>
                <p className="text-up-01">{beneficiario.id}</p>
              </div>

              <div className="col-sm-12 col-md-6 mb-3">
                <p className="text-down-01 text-medium mb-1">Situação</p>
                <span className={`br-tag ${beneficiario.situacao === 'ATIVO' ? 'success' : 'danger'}`}>
                  {beneficiario.situacao}
                </span>
              </div>

              <div className="col-sm-12 col-md-6 mb-3">
                <p className="text-down-01 text-medium mb-1">Nome completo</p>
                <p className="text-up-01">{beneficiario.nome}</p>
              </div>

              <div className="col-sm-12 col-md-6 mb-3">
                <p className="text-down-01 text-medium mb-1">CPF</p>
                <p className="text-up-01">
                  {beneficiario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                </p>
              </div>

              <div className="col-sm-12 col-md-6 mb-3">
                <p className="text-down-01 text-medium mb-1">Data de Nascimento</p>
                <p className="text-up-01">
                  {new Date(beneficiario.dataNascimento + 'T00:00:00').toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="br-divider my-3"></div>

            <div className="d-flex justify-content-end">
              <Link to="/beneficiarios" className="br-button secondary mr-2">
                Voltar
              </Link>
              <button
                className="br-button primary"
                onClick={() => navigate(`/beneficiarios/${id}/editar`)}
              >
                <i className="fas fa-edit mr-1" aria-hidden="true"></i>
                Editar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
