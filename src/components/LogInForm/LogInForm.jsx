import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';

const LogInForm = () => {

    const navigate = useNavigate();
    const { loggedUser, login, logout } = useContext(AuthContext);
    const [logInData, setLogInData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setLogInData({ ...logInData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (logInData.email === "Admin@gmail.com" && logInData.password === "contraseña") {
            logInAdmin();

            navigate('/home');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    const logInAdmin = () => {
        const admin = {
            id: 1,
            email: "Admin@gmail.com",
            password: "contraseña"
        };
        login(admin);
    };


    return (
        <div className="className">
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={10}>Correo electrónico</Form.Label>
                    <Col sm={20}>
                        <Form.Control
                            type="email"
                            placeholder="Correo electrónico"
                            value={logInData.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={10}>Contraseña</Form.Label>
                    <Col sm={20}>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            value={logInData.password}
                            onChange={handleInputChange}
                            name="password"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 1 }}>
                        <Button
                            type="submit"
                            style={{ width: '100%' }}
                            variant="btn btn-outline-light"
                        >
                            Iniciar sesión
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default LogInForm;
