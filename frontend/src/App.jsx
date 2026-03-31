import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ListaBeneficiarios from './pages/ListaBeneficiarios'
import CadastroBeneficiario from './pages/CadastroBeneficiario'
import EdicaoBeneficiario from './pages/EdicaoBeneficiario'
import VisualizacaoBeneficiario from './pages/VisualizacaoBeneficiario'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/beneficiarios" replace />} />
        <Route path="/beneficiarios" element={<ListaBeneficiarios />} />
        <Route path="/beneficiarios/novo" element={<CadastroBeneficiario />} />
        <Route path="/beneficiarios/:id/editar" element={<EdicaoBeneficiario />} />
        <Route path="/beneficiarios/:id" element={<VisualizacaoBeneficiario />} />
      </Routes>
    </Layout>
  )
}
