import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { motion } from "framer-motion";
import './EventDetailsPage.css';
import AttendantsList from "../../components/AttendantsList/AttendantsList";
import CommentsList from "../../components/CommentsList/CommentsList";
import { EMPTYHEART, FULLHEART } from "../../consts/image-paths";
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context";
import MyPie from "../../components/MyPie/Mypie";
const API_URL = import.meta.env.VITE_APP_API_URL;


const EventDetailsPage = () => {

    const { loggedUser } = useContext(AuthContext)
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([])
    useEffect(() => fetchEventDetails(), []);

    const fetchEventDetails = () => {
        axios
            .get(`${API_URL}/events/${eventId}`)
            .then(response => {
                setEvent(response.data);
                setLiked(response.data.liked);
                setIsLoading(false);
            })
            .catch(err => console.error("Error al obtener detalles del evento:", err));
    };

    const handleLike = () => {
        const updatedEvent = { ...event, liked: !liked };
        axios
            .put(`${API_URL}/events/${eventId}`, updatedEvent)
            .then(() => setLiked(!liked))
            .catch(err => console.error("Error al actualizar evento:", err));
    };

    const deleteEvent = () => {
        axios
            .delete(`${API_URL}/events/${eventId}`)
            .then(() => navigate("/eventos"))
            .catch(err => console.error("Error al eliminar evento:", err));
    };

    const toggleModal = () => setShowModal(!showModal);

    if (!loggedUser) {
        return <Navigate to='/fish' />
    }

    if (isLoading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );
    }



    return (

        <div className="EventDetailsPage">
            <Container>
                <Row>
                    <Col>
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <h1>{event.title}</h1>
                            <h3>{event.genres}</h3>
                            <p>{event.description}</p>
                            <ul>
                                <li><span>Dirección:</span> {event.location.street}</li>
                                <li><span>Ciudad:</span> {event.location.city}</li>
                                <li><span>Código Postal:</span> {event.location.zipcode}</li>
                            </ul>
                        </motion.div>
                        <Row>
                            <Col>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h3>Entrada normal</h3>
                                    <h5>{event.price.regular} €</h5>
                                </motion.div>
                            </Col>
                            <Col>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h3>Entrada anticipada</h3>
                                    <h5>{event.price.early} €</h5>
                                </motion.div>
                            </Col>
                        </Row>

                        <div className="event-details-page">
                            <h1 className="event-details">DETALLES DEL EVENTO</h1>
                            <div className="pie-chart-container">
                                <MyPie capacity={event.capacity} assistants={event.assistants} />
                            </div>


                        </div>
                    </Col>
                    <Col>
                        <motion.div
                            initial={{ x: 200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <div className="image-container">
                                {event.cover ? (
                                    <img src={event.cover} alt={event.title} />
                                ) : (
                                    <div className="placeholder">Imagen no disponible</div>
                                )}
                                <img
                                    className="Hearts"
                                    onClick={handleLike}
                                    src={liked ? FULLHEART : EMPTYHEART}
                                    alt="heart"
                                />
                            </div>
                        </motion.div>


                        <Row>
                            <Button variant="danger" className="btn btn-outline-light" onClick={toggleModal}>Eliminar evento</Button>
                            <Link
                                to={`/evento/${event.id}/editar`}
                                className="btn btn-outline-light"
                                style={{ marginLeft: '10px' }}
                            >
                                Editar evento
                            </Link>

                        </Row>


                    </Col>
                </Row>
                <hr />
                <br />


                <Button variant="dark">
                    <Link to={`/evento/${event.id}/registro`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        QUIERO ASISTIR A ESTE EVENTO
                    </Link>
                </Button>

                <motion.div
                    key="attendants"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1 }}
                >
                    <h1>Participantes</h1>
                    <AttendantsList />
                </motion.div>

                <hr />

                <motion.div
                    key="comments"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.2 }}
                >
                    <h1>Comentarios</h1>
                    <CommentsList />
                </motion.div>

                <Modal show={showModal} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>¡Cuidado!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Está seguro de que desea eliminar este evento?</Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-outline-light" onClick={deleteEvent}>Sí</Button>
                        <Button className="btn btn-outline-light" onClick={toggleModal}>No</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>

    );
};

export default EventDetailsPage;
