import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getBeneficiario, updateBeneficiario } from '../services/api'

export default function EdicaoBeneficiario() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    getBeneficiario(id)
      .then((res) => setForm(res.data))
      .catch(() => setErro('Erro ao carregar beneficiário.'))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro(null)
    setSalvando(true)

    const payload = { ...form, cpf: form.cpf.replace(/\D/g, '') }

    updateBeneficiario(id, payload)
      .then(() => navigate('/beneficiarios'))
      .catch((err) => {
        const msg = err.response?.data?.message || 'Erro ao atualizar beneficiário.'
        setErro(msg)
      })
      .finally(() => setSalvando(false))
  }

  if (!form && !erro) {
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
        <h2 className="mb-0">Editar Beneficiário</h2>
      </div>

      <div className="br-card">
        <div className="card-content">
          {erro && (
            <div className="br-message danger mb-4" role="alert">
              <div className="icon"><i className="fas fa-times-circle fa-lg" aria-hidden="true"></i></div>
              <div className="content">{erro}</div>
            </div>
          )}

          {form && (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="br-input">
                    <label htmlFor="nome">Nome completo <span className="text-danger">*</span></label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      value={form.nome}
                      onChange={handleChange}
                      required
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="col-sm-12 col-md-6">
                  <div className="br-input">
                    <label htmlFor="cpf">CPF <span className="text-danger">*</span></label>
                    <input
                      id="cpf"
                      name="cpf"
                      type="text"
                      value={form.cpf}
                      onChange={handleChange}
                      required
                      maxLength={14}
                    />
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 mt-3">
                  <div className="br-input">
                    <label htmlFor="dataNascimento">Data de Nascimento <span className="text-danger">*</span></label>
                    <input
                      id="dataNascimento"
                      name="dataNascimento"
                      type="date"
                      value={form.dataNascimento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 mt-3">
                  <div className="br-select">
                    <label htmlFor="situacao">Situação <span className="text-danger">*</span></label>
                    <select
                      id="situacao"
                      name="situacao"
                      value={form.situacao}
                      onChange={handleChange}
                      required
                    >
                      <option value="ATIVO">ATIVO</option>
                      <option value="INATIVO">INATIVO</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <Link to="/beneficiarios" className="br-button secondary mr-2">
                  Cancelar
                </Link>
                <button type="submit" className="br-button primary" disabled={salvando}>
                  {salvando ? 'Salvando...' : 'Salvar alterações'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
