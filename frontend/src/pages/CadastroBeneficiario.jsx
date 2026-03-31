import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createBeneficiario } from '../services/api'

export default function CadastroBeneficiario() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    situacao: 'ATIVO',
  })
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro(null)
    setSalvando(true)

    const payload = { ...form, cpf: form.cpf.replace(/\D/g, '') }

    createBeneficiario(payload)
      .then(() => navigate('/beneficiarios'))
      .catch((err) => {
        const msg = err.response?.data?.message || 'Erro ao cadastrar beneficiário.'
        setErro(msg)
      })
      .finally(() => setSalvando(false))
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <Link to="/beneficiarios" className="br-button circle mr-2" title="Voltar">
          <i className="fas fa-arrow-left" aria-hidden="true"></i>
        </Link>
        <h2 className="mb-0">Novo Beneficiário</h2>
      </div>

      <div className="br-card">
        <div className="card-content">
          {erro && (
            <div className="br-message danger mb-4" role="alert">
              <div className="icon"><i className="fas fa-times-circle fa-lg" aria-hidden="true"></i></div>
              <div className="content">{erro}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="br-input">
                  <label htmlFor="nome">Nome completo <span className="text-danger">*</span></label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Nome completo"
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
                    placeholder="000.000.000-00"
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
                {salvando ? 'Salvando...' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
