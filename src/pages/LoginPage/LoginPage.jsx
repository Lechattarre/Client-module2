import { Container, Col, Row, Button } from "react-bootstrap"
import EventsList from "../../components/EventList/EventList"
import { motion } from "framer-motion"
import LogInForm from "../../components/LogInForm/LogInForm"

import "./LoginPage.css"



const LoginPage = () => {
    return (
        <div className="LoginPage">
            <Container>
                <Row>
                    <Col xs="5">
                        <div><EventsList /></div>
                    </Col>

                    <Col style={{
                        backgroundColor: '#1c040468',
                        boxShadow: ' 5px 6px rgba(0, 0, 0, 0.1)',
                        border: '1px rgb(87, 18, 18) solid'
                    }}>

                        <motion.div className="DescriptionDIV"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="LoginForm">
                                <h1>Inicio de sesión</h1>
                                <p>Inicia sesion para poder ver los mejores eventos del momento</p>
                                <br />
                                <LogInForm />
                            </div>


                        </motion.div>

                    </Col>


                </Row>

            </Container>        </div >
    )
}

export default LoginPage