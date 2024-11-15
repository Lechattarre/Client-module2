import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaTrashAlt } from 'react-icons/fa';
import { RxMagicWand } from "react-icons/rx";
import { Link } from 'react-router-dom';
import "./AttendantsCard.css"
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


const AttendantsCard = ({ id, name, lastName, favouriteMusicGenre, genre, premium, avatar, onDelete }) => {
    const [showModal, setshowModal] = useState(false)
    const handleDeleteEvent = () => {
        onDelete();
        setshowModal(false);
    }
    const handleCancelButton = () => {
        setshowModal(false);
    }
    return (
        <div className="AttendantsCard">
            <Container className='CardA'>
                <>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={avatar} alt={`${name} ${lastName}`} />
                        <Card.Body>
                            <Card.Title>{name} {lastName}</Card.Title>
                            <Button variant="danger" onClick={() => setshowModal(true)} style={{ marginLeft: '10px' }}>
                                <FaTrashAlt />
                            </Button>
                            <Link to={`/editar/asistente/${id}`}>
                                <Button variant="danger" style={{ marginLeft: '10px' }}>
                                    <RxMagicWand />
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </>
                <Modal show={showModal} onHide={() => setshowModal(false)} >
                    <Modal.Header closeButton>
                        <Modal.Title>¡Cuidado!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Esta seguro de que desea eliminar el atsitente??</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteEvent} >
                            Si
                        </Button>
                        <Button variant="primary" onClick={handleCancelButton} >
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default AttendantsCard;
