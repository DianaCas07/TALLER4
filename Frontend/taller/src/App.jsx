import { useEffect, useState } from 'react'
import {
  Alert,
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Spinner,
  Table,
} from 'reactstrap'
import './App.css'

function Health() {
  const [estado, setEstado] = useState({ cargando: true, ok: false, mensaje: '' })

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setEstado({ cargando: false, ok: true, mensaje: data.message }))
      .catch(() =>
        setEstado({
          cargando: false,
          ok: false,
          mensaje: 'No se pudo conectar con el API.',
        }),
      )
  }, [])

  const clase = estado.cargando ? '' : estado.ok ? 'ok' : 'error'

  return (
    <section className="health-section">
      <div className={`health-box ${clase}`}>
        <h4>Estado del API</h4>
        <p>
          {estado.cargando
            ? 'Verificando...'
            : estado.ok
              ? `El API está funcionando: ${estado.mensaje}`
              : `${estado.mensaje}`}
        </p>
      </div>
    </section>
  )
}

function Info() {
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/info')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setInfo)
      .catch(() => setError(true))
  }, [])

  return (
    <section className="info-section">
      <Card className="shadow-sm">
        <CardHeader className="bg-primary text-white">
          <CardTitle tag="h5" className="mb-0">
            Información de los integrantes
          </CardTitle>
        </CardHeader>
        <CardBody>
          {error && (
            <Alert color="danger" className="mb-0">
              No se pudo obtener la información del API.
            </Alert>
          )}
          {!error && !info && (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          )}
          {info && (
            <>
              <Alert color="success">
                {info.message} — Integrantes:{' '}
                <Badge color="success">{info.total_integrantes}</Badge>
              </Alert>
              <Table responsive striped bordered hover className="mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Carnet</th>
                    <th>Ciudad de origen</th>
                    <th>Carrera</th>
                    <th>Proyectos realizados</th>
                  </tr>
                </thead>
                <tbody>
                  {info.integrantes.map((i) => (
                    <tr key={i.carnet}>
                      <td>{i.nombre}</td>
                      <td>{i.carnet}</td>
                      <td>{i.ciudad_de_origen}</td>
                      <td>{i.carrera}</td>
                      <td>
                        <Badge color="primary" pill>
                          {i.cantidad_proyectos}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </CardBody>
      </Card>
    </section>
  )
}

function App() {
  return (
    <Container>
      <h1 className="titulo">Taller IV</h1>
      <Health />
      <Info />
    </Container>
  )
}

export default App
