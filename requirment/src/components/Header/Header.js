import './Header.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
function Header() {

    return (
        <>
            <nav className="" >
                <div className="logo" >
                    <a style={{ textDecoration: 'none', color: 'black' }}
                    href="https://jamtara.nic.in/" title="Go to home" class="emblem" rel="home">
                        <img class="site_logo" 
                        height="80" id="logo" 
                        src="https://cdn.s3waas.gov.in/s313f320e7b5ead1024ac95c3b208610db/uploads/2020/09/2020091221.jpg"
                         alt=""/>

                            <p>
                                <strong>जिला जामताड़ा </strong>
                                <br></br>
                                <strong>DISTRICT JAMTARA</strong>
                            </p>
                    </a>
                    <p>
                    <strong>Help Desk no-: XXXXXXXXX | XXXXXXXXX (10 AM to 6 PM)
                    </strong>
                    <br></br>
                    <strong>Help Desk Email -: XXXXXXXXXXX@gmail.com</strong>
                    </p>
                </div>    
            </nav>
            <hr></hr>

        </>
    );
}
export default Header;
