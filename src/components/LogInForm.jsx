import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../fbase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class LogInFormComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    logIn = (event) => {
        event.preventDefault();
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in
                console.log(`Udało się zalogować!`);
                this.props.updateLogIn(true);
                // let user = userCredential.user;
                this.props.history.push("/dashboard")

                // ...
            })
            .catch((err) => {
                console.log(`Nie udało się zalogować! błąd: ${err.message}`);

            })
    }

    render(


    ) {
        return (<div className="flex-center vh100 bcg-lightgray">
            <div className="loginForm">
                <h3 className="text-center">Zaloguj się:</h3>
                <form onSubmit={this.logIn} className="flex-column">
                    <input type="text" placeholder="email" name="email" onChange={this.handleChange} value={this.state.email} />
                    <input type="password" placeholder="hasło" name="password" onChange={this.handleChange} value={this.state.password} />
                    <button>ZALOGUJ SIĘ!</button>
                    <p className="text-right">Nie masz jeszcze konta? <Link to="/createAccount"><span>Zarejestruj się tutaj</span></Link></p>
                    <div>
                        <Link className="text-no-decoration" to="/"><i className="fas fa-chevron-left mr-5 mt-30"></i> Wróć do strony głównej </Link>
                    </div>
                </form>
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

const LogInForm = connect(mapStateToProps, mapDispatchToProps)(LogInFormComponent)

export default withRouter(LogInForm);
// export default LogInForm;