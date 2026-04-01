import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ListaBeneficiarios from './pages/ListaBeneficiarios'
import CadastroBeneficiario from './pages/CadastroBeneficiario'
import EdicaoBeneficiario from './pages/EdicaoBeneficiario'
import VisualizacaoBeneficiario from './pages/VisualizacaoBeneficiario'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/beneficiarios"
        element={
          <Layout>
            <ListaBeneficiarios />
          </Layout>
        }
      />
      <Route
        path="/beneficiarios/novo"
        element={
          <Layout>
            <CadastroBeneficiario />
          </Layout>
        }
      />
      <Route
        path="/beneficiarios/:id/editar"
        element={
          <Layout>
            <EdicaoBeneficiario />
          </Layout>
        }
      />
      <Route
        path="/beneficiarios/:id"
        element={
          <Layout>
            <VisualizacaoBeneficiario />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
