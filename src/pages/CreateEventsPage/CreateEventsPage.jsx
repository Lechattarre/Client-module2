import EventForm from "../../components/CreateEventForm/CreateEventForm"
import './CreateEventsPage.css'
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Navigate } from "react-router-dom"


const CreateEventPage = () => {

    const { loggedUser } = useContext(AuthContext)
    if (!loggedUser) {
        return <Navigate to={'/fish'} />
    }

    return (
        <div className="CreateEventPage">

            <h1>Sientete libre de crear tu evento</h1>
            <h2>Disfruta compartiendo tus gustos!</h2>

            <EventForm />

        </div>

    )
}

export default CreateEventPage