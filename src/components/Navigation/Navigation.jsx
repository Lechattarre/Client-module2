import "./Navigation.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import EventsGlobalFilter from "../EventsGlobalFilter/EventsGlobalFilter";
import { ICONIMG } from "../../consts/image-paths";
import { LiaDrupal, LiaCampgroundSolid, LiaBinocularsSolid, } from "react-icons/lia";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";


const Navigation = () => {

    const { loggedUser, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }
    return (
        <div className="Navigation">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <Navbar className="bg-body-tertiary" expand="lg">

                    <Container>

                        <Navbar.Brand as={Link} to={`/home`}>
                            <img src={ICONIMG} alt="icon" />
                        </Navbar.Brand>

                        <EventsGlobalFilter />

                        <Navbar.Toggle aria-controls="navbar-nav" />

                        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                            <Nav.Link as={Link} to={`/home`}>Home  <LiaCampgroundSolid /></Nav.Link>
                            <Nav.Link as={Link} to={`/eventos`}>Events  <LiaBinocularsSolid /></Nav.Link>

                            {loggedUser ? (

                                <Nav.Link as={Link} to={`/`} onClick={handleLogout}>Cerrar Sesión  <LiaDrupal /></Nav.Link>
                            ) : (
                                <Nav.Link as={Link} to={`/perfil`}>Profile  <LiaDrupal /></Nav.Link>
                            )
                            }
                        </Navbar.Collapse>


                    </Container>

                </Navbar>
            </motion.div>
        </div>
    );
};

export default Navigation;
