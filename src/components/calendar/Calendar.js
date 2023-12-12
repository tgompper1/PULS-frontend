import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/calendar.css';
import "../twelve_column_grid.css"
import AutoplayCarousel from "../imageCarousel/autoplayCarousel";

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

export default function EventsCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        // get all events froom DB to display
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
            <div className="row">
                <div className="col-12 col-s-12 centered-div">
                    <h1>PULS Events Calendar</h1>
                    <Calendar   localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="start"
                                style={{ height: 500, margin: "50px" }}
                                views={['month']}
                    />
                </div>
            </div>
            <div className="row" >
                <div className="col-12 col-s-12"> 
                    <AutoplayCarousel></AutoplayCarousel>
                </div>
            </div>
            <div className="row"><div className="col-12 col-s-12"> </div></div>
        </div>
    );
}
