import { useState } from "react"
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const AttendantsForm = () => {

    const [attendantData, setAttendantData] = useState({
        id: '',
        eventid: '',
        name: '',
        lastName: '',
        favouriteMusicGenre: [''],
        birth: '',
        email: '',
        premium: '',
        dni: '',
        avatar: '',
        gender: ''
    })

    const addNewGenre = () => {
        const genresCopy = [...attendantData.favouriteMusicGenre]
        genresCopy.push('')
        setAttendantData({ ...attendantData, favouriteMusicGenre: genresCopy })
    }

    const handleMusicGenreChange = (event, id) => {
        const { value } = event.target
        const genresCopy = [...attendantData.favouriteMusicGenre]
        genresCopy[id] = value
        setAttendantData({ ...attendantData, favouriteMusicGenre: genresCopy })
    }

    const handleAttendantChange = e => {
        const { name, value } = e.target;
        setAttendantData({ ...attendantData, [name]: value });
    }
    return (
        <div className="AttendantsForm">
            <Container />
            <Form>
                <Row className="mb-2">

                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={attendantData.name} onChange={handleAttendantChange} name="name" ></Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>LastName</Form.Label>
                        <Form.Control type="name" value={attendantData.lastName} onChange={handleAttendantChange} name="lastName" ></Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGenreField">
                        <Form.Label>Género/s musicales favoritos</Form.Label>
                        {
                            attendantData.favouriteMusicGenre.map((eachFavourite, id) => {
                                return (
                                    <Form.Control className="mb-3"
                                        type="text" onChange={event => handleMusicGenreChange(event, id)}
                                        value={eachFavourite} key={id} >
                                    </Form.Control>
                                )
                            })
                        }
                        <Button size='sm' variant='dark' onClick={addNewGenre}>Añadir nuevo</Button>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={attendantData.email} onChange={handleAttendantChange} name="text" ></Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control type="text" value={attendantData.birth} onChange={handleAttendantChange} name="text" ></Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Número de telefono</Form.Label>
                        <Form.Control type="number" value={attendantData.phone} onChange={handleAttendantChange} name="phone" ></Form.Control>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Género</Form.Label>
                        <Form.Select
                            placeholder="Género"
                            value={attendantData.gender}
                            onChange={handleAttendantChange}
                            name={'gender'}
                        >
                            <option value="">Seleccionar género</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Hombre">Hombre</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out if you are premium" />
                    </Form.Group>

                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}
export default AttendantsForm