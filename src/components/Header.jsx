import React from "react";
import { Link } from 'react-router-dom';
import { firebaseApp } from '../fbase';
import { connect } from 'react-redux';

class HeaderComponent extends React.Component {

    checkLogged = () => {
        let isLogin;
        let user = firebaseApp.auth().currentUser;
        // console.log(user);
        if (user === null) {
            isLogin = false
        } else {
            isLogin = true
        }
        return isLogin;
    }

    logOut = () => {
        firebaseApp.auth().signOut()
            .then(() => {
                console.log(`Wylogowano poprawnie`);
                this.props.updateLogIn(false);

            }).catch((error) => {
                console.log(error);
            });
    }



    render() {

        // this.checkLogged()
        // console.log(this.checkLogged());
        return (
            <div className="wd-100 h100 bcg-lightgray p-10 flex-row" >
                <div className="wd-25 bcg-yellow">Logo</div>
                <div className="wd-50 bcg-yellow mlr-10">Menu Content</div>
                <div className="wd-25 bcg-yellow flex-center">
                    {console.log(this.props.logIn)}

                    {!this.props.logIn &&
                        <React.Fragment>
                            <Link to="/logIn"><button className="btn btn-blue">Zaloguj</button></Link>
                            <Link to="/createAccount"><button className="btn btn-blue">Zarejestruj</button></Link>
                        </React.Fragment>

                    }

                    {this.props.logIn &&
                        <React.Fragment>
                            <button className="btn btn-red" onClick={this.logOut}>Wyloguj</button>
                        </React.Fragment>

                    }



                </div>
            </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLogIn: logInState => dispatch({ type: 'CHANGE_LOGIN_STATE', payload: logInState })
    }

}

const mapStateToProps = state => {
    return {
        logIn: state.logIn
    }

}

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
export default Header;