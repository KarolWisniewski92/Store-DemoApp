import React from "react";
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (<div className="wd-100 h100 bcg-lightgray p-10 flex-row">
            <div className="wd-25 bcg-yellow">Logo</div>
            <div className="wd-50 bcg-yellow mlr-10">Menu Content</div>
            <div className="wd-25 bcg-yellow flex-center">
                <Link to="/logIn"><button className="btn btn-blue">Zaloguj</button></Link>
                <Link to="/createAccount"><button className="btn btn-blue">Zarejestruj</button></Link>
            </div>
        </div>)
    }
}

export default Header;