import { Link } from 'react-router-dom';

import './displayResponse.css'

const DisplayResponse = () => {
    return(
        <div className='display-response'>
            <div>Flow Chart Ctreated</div>
            <Link to="/Bhoomi_Flow_Craft/home">
                <button className='back-to-home-btn'>Back to home</button>
            </Link>
        </div>
        
    )
}

export default DisplayResponse