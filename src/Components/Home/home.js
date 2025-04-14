import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './home.css'

const Home = () => {

    const [processId, setProcessId] = useState("");
    const [email, setEmail] = useState("");
    const [inputError, setInputErr] = useState({
        processIdErrMsg: 'hide-err-msg',
        processIdErrInput: '',
        emailErrMsg: 'hide-err-msg',
        emailErrInput: ''
    });
    const navigate = useNavigate();


    const onChangeProcessId = (e) => {
        setProcessId(e.target.value);
        setInputErr({
            ...inputError,
            processIdErrMsg: 'hide-err-msg',
            processIdErrInput: ''
        });
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setInputErr({
            ...inputError,
            emailErrMsg: 'hide-err-msg',
            emailErrInput: ''
        });
    }

    const onSubmitButton = async (e, processId, email) => {
        e.preventDefault();

        // Initialize error messages
        let {processIdErrMsg, processIdErrInput, emailErrMsg, emailErrInput} = inputError;

        // Validate fields
        processIdErrMsg = processId === '' ? 'error-message' : 'hide-err-msg';
        emailErrMsg = email === '' ? 'error-message' : 'hide-err-msg'

        processIdErrInput = processId === '' ? 'error-input': '';
        emailErrInput = email === '' ? 'error-input': '';

        // If any field is empty, set the error state and return
        if (processId === '' || email === '') {
            setInputErr({processIdErrMsg, processIdErrInput, emailErrMsg, emailErrInput});
            return;
        }

        const requestBody = {
            processComponentId: processId,
            email: email
          };

          try {
            const response = await fetch('https://c02-usa-east-et.integrate-test.boomi.com/ws/rest/data/v1/getData/;boomi_auth=aGF0aG9yaXR5Mi1BNzhIUjQuNzNCNkZROmIxYTJjMTE4LTE5MDMtNGU1OC04MmE1LWRhOTc0NmQ5MGRkYQ==', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
              //mode: 'no-cors', //Ensure CORS is enabled
            });
            const data = await response.text();
            localStorage.setItem("documents", data);
            localStorage.setItem("requestBody", requestBody.processComponentId);
            console.log(data)
            if (response.ok) {
                
                alert('Flow chart created successfully!');
                navigate("/Bhoomi_Flow_Craft/flow_chart");
                
            } else {
                alert('Failed to create flow chart. Please try again.');
                navigate("/Bhoomi_Flow_Craft/flow_chart");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
            
        }
    }

    const {processIdErrMsg, processIdErrInput, emailErrMsg, emailErrInput} = inputError;

    return(
        <>
            <div className="hero-section">
                <h1>Boomi Flow Craft</h1>
                <p>Created by Hathority</p>
            </div>

            <div className="flow-chart-create-sec">
                <form className="flow-chart-create-form" onSubmit = {(e) => {onSubmitButton(e, processId, email)}} >
                    <h1>Create Flow Chart</h1>
                    <div className="inputs-section">
                        <div className="input-container">
                            <label>Process Component ID </label>
                            <input 
                                type="text" 
                                placeholder="Enter Process ID"
                                onChange={onChangeProcessId}
                                className={processIdErrInput}
                            />
                            <p className={processIdErrMsg}>*Required</p>
                        </div>
                        <div className="input-container">
                            <label>Email </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email Address" 
                                onChange={onChangeEmail}
                                className={emailErrInput}
                            />
                            <p className={emailErrMsg}>*Required</p>
                        </div>
                    </div> 
                    <div className="create-btn">
                        <button type="submit">Create Flow Chart</button>
                    </div>
                </form>
            </div>
        </>
        
    )
}

export default Home