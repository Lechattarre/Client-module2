import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Button, Col, Row } from 'react-bootstrap';


const API_URL = "http://localhost:5005";

const EditAttendantsForm = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const [attendantData, setAttendantData] = useState();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAttendantData();
    }, [])

    const fetchAttendantData = () => {
        axios
            .get(`${API_URL}/attendants/${id}`)
            .then(response => {
                setAttendantData(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleAttendantSubmit = (e) => {

        e.preventDefault()

        const reqPayload = {
            ...attendantData
        }

        axios
            .put(`${API_URL}/attendants/${id}`, reqPayload)
            .then(response => {
                navigate(`/eventos/detalles/${response.data.eventId}`)

            })
            .catch(err => { console.log(err) })

    }
    const addNewGenre = () => {
        const genresCopy = [...attendantData.favouriteMusicGenre]
        genresCopy.push('')
        setAttendantData({ ...attendantData, favouriteMusicGenre: genresCopy })
    }
    const handleAttendantChange = e => {
        const { name, value } = e.target;
        setAttendantData({ ...attendantData, [name]: value });
    }
    return (
        <div className="EditAttendantsForm">
            {
                isLoading ? <h1>CARGHANDO</h1> :
                    <>
                        <Form onSubmit={handleAttendantSubmit} >
                            <Row className="mb-2">

                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={attendantData.name} name="name" onChange={handleAttendantChange} ></Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastName">
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control type="text" value={attendantData.lastName} name="lastName" onChange={handleAttendantChange} ></Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridGenreField">
                                    <Form.Label>Género/s musicales favoritos</Form.Label>
                                    {/* {
                                attendantData.favouriteMusicGenre.map((eachFavourite, id) => {
                                    return (
                                        <Form.Control className="mb-3"
                                            type="text"
                                            value={eachFavourite} key={id} >
                                        </Form.Control>
                                    )
                                })
                            } */}
                                    <Button size='sm' variant='dark' onClick={addNewGenre}>Añadir nuevo</Button>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" value={attendantData.email} name="email" onChange={handleAttendantChange} ></Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control type="text" value={attendantData.birth} name="birth" onChange={handleAttendantChange}></Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Número de telefono</Form.Label>
                                    <Form.Control type="number" value={attendantData.phone} name="phone" onChange={handleAttendantChange}></Form.Control>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs={6} controlId="formGridState">
                                    <Form.Label>Género</Form.Label>
                                    <Form.Select
                                        placeholder="Género"
                                        value={attendantData.gender}

                                        name={'gender'}
                                        onChange={handleAttendantChange}
                                    >
                                        <option value="">Seleccionar género</option>
                                        <option value="Mujer">Mujer</option>
                                        <option value="Hombre">Hombre</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} xs={6} id="formGridCheckbox" className="d-flex align-items-center mt-3">
                                    <Form.Check type="checkbox" label="Check me out if you are premium" />
                                </Form.Group>

                            </Row>
                            <Col> <Button variant="dark" className="btn btn-outline-light AttendantsButton" type="submit">
                                Actualizar perfil
                            </Button>
                            </Col>
                        </Form>
                    </>
            }
        </div>
    )
}
export default EditAttendantsForm