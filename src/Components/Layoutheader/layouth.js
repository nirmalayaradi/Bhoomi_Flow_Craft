import Header from '../Header/header';


import './layouth.css'
const Layouth = ({children}) => {
    return(
        <div className="layout">
            <Header/>
            <div className="main-content-container">
                {children}
            </div>
           
        </div>
    );
}

export default Layouth