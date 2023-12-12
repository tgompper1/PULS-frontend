import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import '../../styles/calendar.css';
import "../twelve_column_grid.css";
import AutoplayCarousel from "../imageCarousel/autoplayCarousel";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


const locales = {
    "en-CA": require("date-fns/locale/en-CA"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const URL = "https://pulse.adaptable.app/"


export default function AdminEventsCalendar() {  
  const { user } = useAuthContext();
  const navigate = useNavigate();
  if(user == null)
  {
    navigate("/");
  }



  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    title: '',
    start: '',
    end: ''
  });

  const handleAddEvent = (e) => {
    e.preventDefault();

    // create an event and post to DB
    axios
      .post(URL+'api/events', event)
      .then((res) => {
        setEvent({
          title: '',
          start: '',
          end: '',
        });
        alert("Event created, please refresh page.")
      })
      .catch((err) => {
        console.log('Error in CreateEvent');
      });
  };


  const handleDeleteEvent = async (id) => {
    const r = window.confirm("Would you like to delete this event?")
    if(r === true){
      try{
        // delete event and remove from DB
        const url = (URL+"api/events/" + id);
        const res = await axios.delete(url);
        alert("Event deleted, please refresh page.")
    }
    catch(err){
        console.error(err);
    }
     }
  }

  useEffect(()=>{
    // get all events from DB to display
    axios
      .get(URL+'api/events')
      .then((res) => {
        setEvents([...res.data]);
      })
      .catch((err) => {
        console.log('Error from ShowEventList');
      });
  }, []);


  return (
    
    <div>
      <div className='row'>
        <div className="col-12 col-s-12 centered-div">
          <h1>PULS Events Calendar</h1>
          <div className="add-event-calendar">
            <input  type="text"
                    placeholder="Event time and title"
                    style={{ width: "20%", margin: "10px" }}
                    name='title'
                    value={event.title}
                    onChange={(e) => setEvent({ ...event, title: e.target.value})}
            />
            <DatePicker placeholderText="Start Date" 
                        selected={event.start}
                        style={{ width: "100px", margin: "10px" }}
                        name='start'
                        onChange={(start) => setEvent({ ...event, start })}
            />
          </div>
          <div>
           <button className='button-add' onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-s-12 centered-div">
          <p className="deletion-message"><i>Click an event to delete it.</i></p><br></br>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-s-12">
          <Calendar localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="start"
                    style={{ height: 500, margin: "50px" }}
                    views={['month']}
                    onSelectEvent = {event => handleDeleteEvent(event._id)}
          />
        </div>
      </div>
      <div className="row">
                <div className="col-12 col-s-12"> 
                    <AutoplayCarousel></AutoplayCarousel>
                </div>
            </div>
            <div className="row"><div className="col-12 col-s-12"> </div></div>
    </div>
  );
}

