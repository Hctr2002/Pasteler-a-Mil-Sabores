import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/theme.css";

export default function AppNavbar() {
    return (
        <Navbar expand="lg" className="custom-navbar" aria-label="Navegación principal" sticky="top">
            <Container>
                <div className="brand">
                    <Navbar.Brand as={Link} to="/" className="p-0 m-0">
                        <h1 aria-label="MilSabores">🎂 Mil Sabores</h1>
                    </Navbar.Brand>
                    <p className="tagline">Tu Pastelería favorita donde tenemos justo lo que deseas</p>
                </div>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="custom-link">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/blogs" className="custom-link">Blogs y noticias</Nav.Link>
                        <Nav.Link as={Link} to="/catalogo" className="custom-link">Catálogo</Nav.Link>
                        <Nav.Link as={Link} to="/carrito" className="custom-link">Carrito</Nav.Link>
                        <Nav.Link as={Link} to="/login" className="custom-link">Ingresar</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
