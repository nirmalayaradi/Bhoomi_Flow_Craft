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
            const response = await fetch('https://c02-usa-east.integrate-test.boomi.com/ws/simple/createData;boomi_auth=dHJhaW5pbmduaXJtYWxheWFyYWRpLURQS0o2VS5ERzJSVU86NjYwNTBiODctNmMwYy00OGJlLWExNzMtMDgxMGI2MmJhOTMy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Flow chart created successfully!');
                
            } else {
                alert('Failed to create flow chart. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
            navigate("/home/flow_chart");
        }
    }

    const {processIdErrMsg, processIdErrInput, emailErrMsg, emailErrInput} = inputError;

    return(
        <>
            <div className="hero-section">
                <h1>Bhoomi Flow Craft</h1>
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