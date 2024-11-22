import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AttendantsCard from "../AttendantsCard/AttendantsCard";
import { Col, Row } from "react-bootstrap";
const API_URL = import.meta.env.VITE_APP_API_URL;

const AttendantsList = () => {
    const [attendants, setAttendants] = useState([]);
    const { eventId } = useParams();

    useEffect(() => {
        fetchAttendants();
    }, []);

    const fetchAttendants = () => {
        axios
            .get(`${API_URL}/attendants?eventId=${eventId}`)
            .then(response => setAttendants(response.data))
            .catch(err => console.log(err));
    };

    const handleDeleteAttendant = (attendantId) => {
        axios
            .delete(`${API_URL}/attendants/${attendantId}`)
            .then(() => {
                fetchAttendants()
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="AttendantsList">
            <Row>
                {
                    attendants.map(elm => (
                        <Col xs="3" key={elm.id}>
                            <AttendantsCard {...elm} onDelete={() => handleDeleteAttendant(elm.id)} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
};

export default AttendantsList;
