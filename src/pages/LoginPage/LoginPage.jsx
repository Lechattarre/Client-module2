import { Container, Col, Row, Button } from "react-bootstrap"
import EventsList from "../../components/EventList/EventList"
import { motion } from "framer-motion"
import LogInForm from "../../components/LogInForm/LogInForm"

import "./LoginPage.css"



const LoginPage = () => {
    return (
        <div className="LoginPage">
            <Container fluid className="LoginPage">
                <Row className="justify-content-center">
                    <Col
                        xs={12}
                        sm={10}
                        md={8}
                        lg={6}
                        className="p-4"
                        style={{
                            backgroundColor: "#1c040468",
                            boxShadow: "5px 6px rgba(0, 0, 0, 0.1)",
                            border: "1px rgb(87, 18, 18) solid",
                            borderRadius: "8px",
                        }}
                    >
                        <motion.div
                            className="DescriptionDIV"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="LoginForm">
                                <h1>Inicio de sesión</h1>
                                <br />
                                <p>Inicia sesion para poder ver los mejores eventos del momento</p>
                                <LogInForm />
                            </div>
                        </motion.div>
                        <EventsList />
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default LoginPage