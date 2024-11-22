import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Form, Button, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./CommentsList.css"

const API_URL = import.meta.env.VITE_APP_API_URL;

const CommentsList = () => {
    const [comments, setComments] = useState([]);
    const { eventId } = useParams();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchComments();
    }, [eventId]);

    const fetchComments = () => {
        axios
            .get(`${API_URL}/comments?eventId=${eventId}`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            eventId: eventId,
            name: name,
            message: message,
        };

        axios
            .post(`${API_URL}/comments`, newComment)
            .then((response) => {
                setComments([...comments, response.data]);
                setName("");
                setMessage("");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="Comments">
            <div className="comment-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tu nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label>Comentarios</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Escribe tu comentario"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button className="btn btn-outline-light" variant="primary" type="submit">
                        Enviar Comentario
                    </Button>
                </Form>
            </div>

            <h2>Comentarios</h2>
            <Row className="comment-list">
                {comments.map((comment) => (
                    <Col key={comment.id} xs={12} md={6} lg={4} className="mb-4">
                        <div className="comment-card">
                            <div className="avatar">
                                <img src="https://static-00.iconduck.com/assets.00/profile-default-icon-1024x1023-4u5mrj2v.png" alt="avatar" />
                            </div>
                            <div className="comment-content">
                                <strong>{comment.name}</strong>
                                <p>{comment.message}</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default CommentsList;
