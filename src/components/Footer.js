import React from "react";
import '../styles/footer.css'
import Popup from "./Popup";
import {useState} from 'react'

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";

export default function Footer() {
    const[buttonPopup, setButtonPopup] = useState(false);

    //the user value allows us to check if we're logged in
    const { user } = useAuthContext();
    

    return (
        <div className="col-12 col-s-12 footer">
           <div className='gallery-row'>
                <div className="gallery-column">
                    <h3>SUBSCRIBE</h3>
                        <a href="https://mcgill.us18.list-manage.com/subscribe?u=9660e05bb9b8d04edc9146a87&id=7e4bcdf3e2">U1 Newsletter</a>
                        <br></br>
                        <a href="https://mcgill.us18.list-manage.com/subscribe?u=9660e05bb9b8d04edc9146a87&id=2f8b59479d">U2 Newsletter</a>
                        <br></br>
                        U3 Newsletter
                </div>
                <div className="gallery-column">
                    <h3>FACEBOOK</h3>
                        McGill Physiology
                        <br></br>
                        U1 Physiology
                        <br></br>
                        U2 Physiology
                        <br></br>
                        U3 Physiology
                </div>
                <div className="gallery-column">
                    <h3>LOCATION</h3>
                    <a href="https://www.google.com/maps/place/Department+of+Physiology/@45.5030628,-73.5846709,17z/data=!4m15!1m8!3m7!1s0x4cc91a3ed4e73885:0x9c87bc144d037706!2sMcIntyre+Medical+Bldg,+3655+Promenade+Sir-William-Osler,+Montreal,+QC+H3A+1A3!3b1!8m2!3d45.5030628!4d-73.5824822!16s%2Fm%2F0wxys2f!3m5!1s0x4cc91a3ed380e3dd:0x797758ae0b0a314f!8m2!3d45.5030924!4d-73.5825793!16s%2Fg%2F1hhwn75j1?entry=ttu">McIntyre Medical Building</a>
                    <br></br>Room 1017
                </div>
                <div className="gallery-column">
                    <h3>NTC STATUS</h3>
                    broken link
                </div>
                <div className="gallery-column"> 
                    <h3>CONTACT US</h3>  
                    <a href="mailto: pulsmcgill@gmail.com">pulsmcgill@gmail.com</a><br></br>
                    <a href="https://www.facebook.com/pulsmcgill">PULS McGill</a> 
                </div>
                <div className="gallery-column" style={{visibility: user ? 'hidden' : 'visible' }}>
                    <h3>ADMIN LOGIN</h3>
                    <h4 onClick={() => setButtonPopup(true)}>Login Here</h4>
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <h3>My Popup</h3>
                    </Popup>
                </div>
            </div>
        </div>
        
    );
}