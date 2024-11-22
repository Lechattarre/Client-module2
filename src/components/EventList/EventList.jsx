import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import { Button, Col, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import './EventList.css'

const API_URL = import.meta.env.VITE_APP_API_URL;

const EventsList = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
    };

    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);


    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios
            .get(`${API_URL}/events`)
            .then(response => {
                setEvents(response.data);
                setFilteredEvents(response.data);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    };

    const handleFilterChange = (genres) => {
        if (genres === "all") {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter(event => event.genres === genres);
            setFilteredEvents(filtered);
        }
    };

    return (
        <div className="EventsList">
            <div className="filter-buttons" style={{ marginBottom: 20 }}>
                <Button onClick={() => handleFilterChange("all")}>Todos</Button>
                <Button onClick={() => handleFilterChange("regueton")}>Reguetón</Button>
                <Button onClick={() => handleFilterChange("pop")}>Pop</Button>
                <Button onClick={() => handleFilterChange("techno")}>Techno</Button>
                <Button onClick={() => handleFilterChange("electronic")}>Electrónica</Button>
            </div>

            {isLoading ? (
                <h1>CARGANDO</h1>
            ) : (
                <Row>
                    {filteredEvents.map((elm) => {
                        return (
                            <Col style={{ marginBottom: 20 }} md={{ span: 4 }} key={elm.id}>
                                <motion.div
                                    className="content"
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.2 }}
                                    transition={{ duration: 1 }}
                                >
                                    <EventCard {...elm} />
                                </motion.div>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>
    );
};

export default EventsList;
