import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getBeneficiarios, deleteBeneficiario } from '../services/api'

export default function ListaBeneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
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
        <div className="br-message danger" role="alert">
          <div className="icon"><i className="fas fa-times-circle fa-lg" aria-hidden="true"></i></div>
          <div className="content">{erro}</div>
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="br-loading medium" role="progressbar" aria-label="Carregando..."></div>
        </div>
      ) : beneficiarios.length === 0 ? (
        <div className="br-message info">
          <div className="icon"><i className="fas fa-info-circle fa-lg" aria-hidden="true"></i></div>
          <div className="content">Nenhum beneficiário cadastrado.</div>
        </div>
      ) : (
        <div className="br-table">
          <table>
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
              {beneficiarios.map((b) => (
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
                    >
                      <i className="fas fa-eye" aria-hidden="true"></i>
                    </button>
                    <button
                      className="br-button circle small"
                      title="Editar"
                      onClick={() => navigate(`/beneficiarios/${b.id}/editar`)}
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
      )}

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
