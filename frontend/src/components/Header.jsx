import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice.js';
import userApiSlice from '../slices/usersApiSlice.js';
import { logout } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch((logout()));
            navigate('./login')

        } catch (err) {
            toast.error(err?.data?.message || err.error)
            console.log(err?.data?.message || err.error);
        }
    }

    const itemNum = cartItems.reduce((acc, item) => acc + item.qty, 0)
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand  >
                            <img src={logo} alt="Proshop" />
                            ProShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <LinkContainer to="/cart">
                                <Nav.Link href="/cart"><FaShoppingCart /> Cart{cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                        {itemNum}
                                    </Badge>
                                )}</Nav.Link>

                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>

                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (<LinkContainer to='login'>
                                <Nav.Link href="/login"><FaUser /> Sign In</Nav.Link>
                            </LinkContainer>)}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header