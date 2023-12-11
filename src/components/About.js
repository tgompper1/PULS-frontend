import React, { useState } from "react";
import { useNavigate } from "react-router";
import './twelve_column_grid.css'
import '../styles/about.css'

export default function About() {
  // This following section will display 
 return (
   <div>
      <div className='row'><div className='col-12 col-s-12'></div></div>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-3'>
          <button className="puls-button" >Current Council</button>
        </div>
        <div className='col-3'>
          <button className="puls-button">Past Councils</button>
        </div>
        <div className='col-3'></div>
      </div>
      <div className='row'>
        <div className='col-1'></div>
        <div className='col-10'>
          <h1 className='page-title'>In-Person Office Hours</h1>
          <p>PULS hosts weekly office hours in the PULS office (room 1017 of the McIntyre Building!) 
            Refer to the schedule below and feel free to stop by during our allotted times between 10:30am 
            and 3:30pm from Monday to Friday (Note some times may be subject to closure.) This schedule remains
             the same every week. At least one council member will be available to sell NTCS, clothing orders and 
             answer any questions you may have about PULS or PHGY.
          </p>
          <table>
            office hours table
          </table>
        </div>
        <div className='col-1'></div>
      </div>
   </div>
 );
}