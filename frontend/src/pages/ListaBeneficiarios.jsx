import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getBeneficiarios, deleteBeneficiario } from '../services/api'

export default function ListaBeneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [busca, setBusca] = useState('')
  const [filtroSituacao, setFiltroSituacao] = useState('')
  const navigate = useNavigate()

  const carregar = () => {
    setLoading(true)
    getBeneficiarios()
      .then((res) => setBeneficiarios(res.data))
      .catch(() => setErro('Erro ao carregar beneficiários.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    carregar()
  }, [])

  const handleDelete = (id) => {
    deleteBeneficiario(id)
      .then(() => {
        setConfirmDelete(null)
        carregar()
      })
      .catch(() => setErro('Erro ao excluir beneficiário.'))
  }

  const filtrados = beneficiarios.filter((b) => {
    const nomeMatch = b.nome.toLowerCase().includes(busca.toLowerCase())
    const cpfMatch = b.cpf.includes(busca.replace(/\D/g, ''))
    const situacaoMatch = filtroSituacao === '' || b.situacao === filtroSituacao
    return (nomeMatch || cpfMatch) && situacaoMatch
  })

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Beneficiários</h2>
        <Link to="/beneficiarios/novo" className="br-button primary">
          <i className="fas fa-plus mr-1" aria-hidden="true"></i>
          Novo Beneficiário
        </Link>
      </div>

      {erro && (
        <div className="br-message danger mb-4" role="alert">
          <div className="icon"><i className="fas fa-times-circle fa-lg" aria-hidden="true"></i></div>
          <div className="content">{erro}</div>
        </div>
      )}

      {/* search and filter bar */}
      <div className="br-card mb-4">
        <div className="card-content" style={{ padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="br-input" style={{ flex: 1, minWidth: '200px' }}>
              <label htmlFor="busca">Buscar por nome ou CPF</label>
              <input
                id="busca"
                type="text"
                placeholder="Digite o nome ou CPF..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <div className="br-select" style={{ minWidth: '160px' }}>
              <label htmlFor="filtroSituacao">Situação</label>
              <select
              style={{ marginLeft: '0.5rem' }}
                id="filtroSituacao"
                value={filtroSituacao}
                onChange={(e) => setFiltroSituacao(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="ATIVO">ATIVO</option>
                <option value="INATIVO">INATIVO</option>
              </select>
            </div>
            {(busca || filtroSituacao) && (
              <button
                className="br-button secondary"
                onClick={() => { setBusca(''); setFiltroSituacao('') }}
              >
                <i className="fas fa-times mr-1" aria-hidden="true"></i>
                Limpar
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="br-loading medium" role="progressbar" aria-label="Carregando..."></div>
        </div>
      ) : filtrados.length === 0 ? (
        <div className="br-message info" role="status">
          <div className="icon"><i className="fas fa-info-circle fa-lg" aria-hidden="true"></i></div>
          <div className="content">
            {beneficiarios.length === 0
              ? 'Nenhum beneficiário cadastrado.'
              : 'Nenhum resultado encontrado para os filtros aplicados.'}
          </div>
        </div>
      ) : (
        <div className="br-card">
          <div className="card-content" style={{ padding: 0 }}>
            <table className="br-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">CPF</th>
                  <th scope="col">Data de Nascimento</th>
                  <th scope="col">Situação</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.nome}</td>
                    <td>{b.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</td>
                    <td>{new Date(b.dataNascimento + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                    <td>
                      <span className={`br-tag ${b.situacao === 'ATIVO' ? 'success' : 'danger'}`}>
                        {b.situacao}
                      </span>
                    </td>
                    <td>
                      <button
                        className="br-button circle small"
                        title="Visualizar"
                        onClick={() => navigate(`/beneficiarios/${b.id}`)}
                        style={{ marginRight: '0.25rem' }}
                      >
                        <i className="fas fa-eye" aria-hidden="true"></i>
                      </button>
                      <button
                        className="br-button circle small"
                        title="Editar"
                        onClick={() => navigate(`/beneficiarios/${b.id}/editar`)}
                        style={{ marginRight: '0.25rem' }}
                      >
                        <i className="fas fa-edit" aria-hidden="true"></i>
                      </button>
                      <button
                        className="br-button circle small danger"
                        title="Excluir"
                        onClick={() => setConfirmDelete(b)}
                      >
                        <i className="fas fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && beneficiarios.length > 0 && (
        <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#555' }}>
          Exibindo {filtrados.length} de {beneficiarios.length} beneficiário(s)
        </p>
      )}

      {/* delete confirmation */}
      {confirmDelete && (
        <div className="br-modal medium">
          <div className="br-card">
            <div className="card-header">
              <div className="card-title">Confirmar exclusão</div>
            </div>
            <div className="card-content">
              <p>
                Deseja excluir o beneficiário <strong>{confirmDelete.nome}</strong>? Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="card-footer justify-content-end">
              <button className="br-button secondary mr-2" onClick={() => setConfirmDelete(null)}>
                Cancelar
              </button>
              <button className="br-button danger" onClick={() => handleDelete(confirmDelete.id)}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
