import Header from '../Header/header';
import Footer from '../Footer/footer';

import './layout.css'
const Layout = ({children}) => {
    return(
        <div className="layout">
            <Header/>
            <div className="main-content-container">
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default Layout