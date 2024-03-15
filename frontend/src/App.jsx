import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { Header, Footer } from './components'

const App = () => {
  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Outlet></Outlet>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App