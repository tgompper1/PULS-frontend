import React from "react";
import '../styles/home.css'
import './twelve_column_grid.css'


export default function Home() {
 return (
    <div>

        <div className="image">
            <img src="images\montreal.jpg" alt="montreal" className='cropped-image none-image position-60-50'></img>
            <figcaption className="title">PHYSIOLOGY <br></br>UNDERGRADUATE <br></br>LEAGUE OF <br></br> STUDENTS</figcaption>
        </div>

        <div className="col-3"></div>
        <div className="col-4 col-s-12">
            <h1 className='page-title'>Welcome home.</h1>
            <p>Since its inception, the Physiology Undergraduate League of Students
                has been the elected student society at the service of undergraduate 
                students in the Physiology Department at McGill University.
            </p>
        </div>
        <div className="col-5"></div>

    </div>
 );
}