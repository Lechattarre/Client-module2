import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import "./CreateEventForm.css"
import { useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_APP_API_URL

const EventForm = () => {

    const navigate = useNavigate()

    const [eventData, setEventDate] = useState({
        title: '',
        genres: '',
        capacity: 0,
        date: '',
        vip: false,
        description: '',
        minAge: '',
        available: true,

    });

    const [location, setLocation] = useState({
        street: '',
        city: '',
        zipcode: ''
    })

    const [price, setPrice] = useState({
        regular: 0,
        early: 0
    })

    const handleLocationChange = e => {
        const { name, value } = e.target;
        setLocation({ ...location, [name]: value });
    };

    const handlePriceChange = e => {
        const { name, value } = e.target;
        setPrice({ ...price, [name]: value });
    };

    const handleEventChange = e => {
        const { name, value } = e.target;
        setEventDate({ ...eventData, [name]: value });
    };

    const handleEventSubmit = (e) => {

        e.preventDefault();

        const reqPayload = {
            ...eventData,
            location: location,
            price: price,
            cover: "https://cdn.pixabay.com/photo/2019/10/15/03/16/black-and-white-4550471_960_720.jpg"
        }

        axios
            .post(`${API_URL}/events`, reqPayload)
            .then(response => {
                navigate(`/eventos/detalles/${response.data.id}`);
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="EventForm">
            <Container>
                <Form onSubmit={handleEventSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={8} controlId="formEventName">
                            <Form.Label>Nombre del evento</Form.Label>
                            <Form.Control type="text" value={eventData.title} onChange={handleEventChange} name="title" />
                        </Form.Group>

                        <Form.Group as={Col} xs={2} controlId="formEventCapacity">
                            <Form.Label>Aforo</Form.Label>
                            <Form.Control type="number" min={1} value={eventData.capacity} onChange={handleEventChange} name="capacity" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} xs={2} controlId="formEventPriceRegular">
                                <Form.Label>Precio Regular</Form.Label>
                                <Form.Control type="number" value={price.regular} onChange={handlePriceChange} name="regular" />
                            </Form.Group>

                            <Form.Group as={Col} xs={2} controlId="formEventPriceEarly">
                                <Form.Label>Precio Anticipado</Form.Label>
                                <Form.Control type="number" value={price.early} onChange={handlePriceChange} name="early" />
                            </Form.Group>
                        </Row>
                    </Row>



                    <Row className="mb-3">
                        <Form.Group as={Col} xs={8} controlId="formEventAgeRequirement">
                            <Form.Label>Requerimiento de Edad</Form.Label>
                            <Form.Control type="number" placeholder="Edad mínima (e.g., 18)" value={eventData.minAge} onChange={handleEventChange} name="minAge" />
                        </Form.Group>

                        <Form.Group as={Col} xs={4} controlId="formEventVipReserved">
                            <Form.Label>Reservados VIP</Form.Label>
                            <Form.Select
                                name="vip"
                                value={eventData.vip ? "Disponible" : "No Disponible"}
                                onChange={(e) =>
                                    setEventDate({ ...eventData, vip: e.target.value === "Disponible" })
                                }
                            >
                                <option value="No Disponible">No Disponible</option>
                                <option value="Disponible">Disponible</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group controlId="formEventDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} value={eventData.description} onChange={handleEventChange} name="description" />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formEventLocation">
                        <Form.Label>Direccion del Evento</Form.Label>
                        <Form.Control placeholder="1234 Calle Principal" value={eventData.street} onChange={handleLocationChange} name="street" />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formEventDate">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" value={eventData.date} onChange={handleEventChange} name="date" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formEventCity">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control value={eventData.city} onChange={handleLocationChange} name="city" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formEventZip">
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control value={eventData.zipcode} onChange={handleLocationChange} name="zipcode" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formEventGenre">
                            <Form.Label>Género</Form.Label>
                            <Form.Select
                                name="genres"
                                value={eventData.genres}
                                onChange={handleEventChange}
                            >
                                <option value="">Selecciona un género</option>
                                <option value="Techno">Techno</option>
                                <option value="Reguetón">Reguetón</option>
                                <option value="Electrónica">Electrónica</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Col>
                        <Button variant="dark" className="btn btn-outline-light" type="submit">
                            Crear Evento
                        </Button>
                    </Col>

                </Form>


            </Container>
        </div>
    );
};

export default EventForm;


