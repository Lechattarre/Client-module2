import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventCard = ({ cover, title, id, liked }) => {


    return (
        <div className="EventCard">
            <Card className="bg-dark text-white">
                <Card.Img src={cover} alt="Card image" />
                <Link to={`/eventos/detalles/${id}`} style={{ textDecoration: 'none' }}>
                    <Card.ImgOverlay className="d-flex justify-content-center align-items-start">
                        <Card.Title className="event-title text-center w-100">{title}</Card.Title >
                    </Card.ImgOverlay>
                </Link>
            </Card>
        </div>
    );

}
export default EventCard;
