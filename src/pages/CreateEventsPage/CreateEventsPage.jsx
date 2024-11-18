import EventForm from "../../components/CreateEventForm/CreateEventForm"
import './CreateEventPage.css'

const CreateEventPage = () => {
    return (
        <div className="classname">
            <h1>Sientete libre de crear tu evento</h1>
            <h2>Disfruta compartiendo tus gustos!</h2>

            <EventForm />
        </div>

    )
}

export default CreateEventPage