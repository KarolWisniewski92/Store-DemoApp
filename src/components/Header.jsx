import React from "react";
import { Link } from 'react-router-dom';
import { firebaseApp } from '../fbase';
import { connect } from 'react-redux';
import SearchBar from "./SearchBar";
import { withRouter } from 'react-router-dom';

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
                this.props.history.push("/")

            }).catch((error) => {
                console.log(error);
            });
    }



    render() {

        // this.checkLogged()
        // console.log(this.checkLogged());
        return (
            <div className="wd-100 h75 bcg-lightgray p-10 flex-row" >
                <div className="wd-25 flex-center"><Link to="/" className="text-no-decoration tempLogo">My<span className="logoDecoration">Store</span>App - Demo</Link></div>
                <div className="wd-50 mlr-10 flex-center">
                    <SearchBar />
                </div>
                <div className="wd-25 flex-center">
                    {console.log(this.props.logIn)}

                    {!this.props.logIn &&
                        <React.Fragment>
                            <Link to="/logIn"><button className="btn-2 btn-white">Zaloguj</button></Link>
                            <Link to="/createAccount"><button className="btn-2 btn-white">Zarejestruj</button></Link>
                        </React.Fragment>

                    }

                    {this.props.logIn &&
                        <React.Fragment>
                            <Link to="/dashboard"><button className="btn-2 btn-white">Moje konto</button></Link>
                            <button className="btn-2 btn-white" onClick={this.logOut}>Wyloguj</button>
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
export default withRouter(Header);