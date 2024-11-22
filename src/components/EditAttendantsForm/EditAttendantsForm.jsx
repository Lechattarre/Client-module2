import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./EditAttendantForm.css"

const API_URL = import.meta.env.VITE_APP_API_URL;

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
                console.log("Datos recibidos:", response.data);
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

    const handleAttendantChange = e => {
        const { name, value } = e.target;
        setAttendantData({ ...attendantData, [name]: value });
    }

    const hasFavouriteGenre = (genre) => {
        return attendantData.favouriteMusicGenre.includes(genre);
    }

    const handleMusicGenreChange = (genre) => {
        if (hasFavouriteGenre(genre)) {
            const newFavouriteMusicGenre = attendantData.favouriteMusicGenre.filter(genre => genre !== genre);

            const reqPayload = {
                ...attendantData,
                favouriteMusicGenre: newFavouriteMusicGenre
            }

            setAttendantData(reqPayload);
        } else {
            const reqPayload = {
                ...attendantData,
                favouriteMusicGenre: [...attendantData.favouriteMusicGenre, genre]
            }

            setAttendantData(reqPayload);


        }
    }

    return (
        <div className="EditAttendantsForm">
            {
                isLoading ? <h1>CARGHANDO</h1> :

                    <Form onSubmit={handleAttendantSubmit} >

                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="formGridName" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={attendantData.name} name="name" onChange={handleAttendantChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>LastName</Form.Label>
                                <Form.Control type="text" value={attendantData.lastName} name="lastName" onChange={handleAttendantChange} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={attendantData.email} name="email" onChange={handleAttendantChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>edad</Form.Label>
                                <Form.Control type="text" value={attendantData.birth} name="birth" onChange={handleAttendantChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Número de telefono</Form.Label>
                                <Form.Control type="number" value={attendantData.phone} name="phone" onChange={handleAttendantChange} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} xs={6} controlId="formGridState" style={{ marginTop: '10px' }} >
                                <Form.Label>Género</Form.Label>
                                <Form.Select
                                    placeholder="Género"
                                    value={attendantData.gender}
                                    name="gender"
                                    onChange={handleAttendantChange}
                                >
                                    <option value="">Seleccionar género</option>
                                    <option value="Mujer">Mujer</option>
                                    <option value="Hombre">Hombre</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} xs={6} id="formGridCheckbox" className="d-flex align-items-center mt-3" style={{ gap: '10px' }}>
                                <Form.Check
                                    type="checkbox"
                                    label="hardcore"
                                    value="hardcore"
                                    checked={() => hasFavouriteGenre("hardcore")}
                                    onChange={() => handleMusicGenreChange("hardcore")}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="techno house"
                                    value="techno house"
                                    checked={hasFavouriteGenre("techno house")}
                                    onChange={() => handleMusicGenreChange("techno house")}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="techno"
                                    value="techno"
                                    checked={hasFavouriteGenre("techno")}
                                    onChange={() => handleMusicGenreChange("techno")}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="reggueton"
                                    value="reggueton"
                                    checked={hasFavouriteGenre("reggueton")}
                                    onChange={() => handleMusicGenreChange("reggueton")}
                                />
                            </Form.Group>
                        </Row>
                        <Col style={{ marginTop: '20px' }}>
                            <Button variant="dark" className="btn btn-outline-light AttendantsButton" type="submit">
                                Actualizar perfil
                            </Button>
                        </Col>
                    </Form>
            }
        </div>
    )
}
export default EditAttendantsForm