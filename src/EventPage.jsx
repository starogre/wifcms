import { useState, useEffect } from "react";
import "./App.css";

import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

function EventPage() {
    const [name, setName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [location, setLocation] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "events"));
                const eventsArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setEvents(eventsArray);
            } catch (error) {
                console.error("Error fetching events: ", error);
            }
        };

        fetchEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // basic validation to check if any field is empty
        if (
            !name.trim() ||
            !startTime.trim() ||
            !endTime.trim() ||
            !description.trim() ||
            !organizer.trim() ||
            !location.trim()
        ) {
            alert("Please write something for each event field 😊");
            return;
        }

        // submit event object to Firestore
        try {
            const newEvent = {
                name: name,
                startTime: startTime,
                endTime: endTime,
                organizer: organizer,
                location: location,
                description: description,
            };

            const docRef = await addDoc(collection(db, "events"), newEvent);
            console.log("Doc written with ID: ", docRef.id);

            // update state and reset input fields
            setEvents([...events, newEvent]);
            setName("");
            setStartTime("");
            setEndTime("");
            setDescription("");
            setOrganizer("");
            setLocation("");
        } catch (error) {
            console.error("Error adding event: ", error);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="input-container">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label htmlFor="eventName">Event Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="organizer">Organizer:</label>
                            <input
                                type="text"
                                id="organizer"
                                value={organizer}
                                onChange={(e) => setOrganizer(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="startTime">Start Time:</label>
                            <input
                                type="text"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="endTime">End Time:</label>
                            <input
                                type="text"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">Add Event</button>
                    </form>
                </div>

                <div className="list-container">
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>{event.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EventPage;
