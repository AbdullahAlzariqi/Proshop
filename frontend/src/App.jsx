import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { Header, Footer } from './components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App