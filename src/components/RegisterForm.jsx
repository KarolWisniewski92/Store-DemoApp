import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp, fbase } from '../fbase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class RegisterFormComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            repeatPassword: ""
        }
    }

    hadleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createNewUser = (event) => {
        event.preventDefault();
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in 
                let user = userCredential.user;

                fbase.post(`users/${user.uid}`, {
                    data: {
                        id: user.uid,
                        email: this.state.email,
                    }
                })
                    .then(() => {
                        console.log(`Poprawnie założono użytkownika i utworzono go w bazie danych!`);
                        this.props.updateLogIn(true);
                        this.props.history.push("/dashboard")
                    })

            })
            .catch((error) => {
                let user = firebaseApp.auth().currentUser;
                if (user !== null) {
                    user.delete().then(function () {
                        console.log(`Nie udało się stworzyć bazy danych! Użytkownik został poprawnie usunięty.`);
                    }).catch(function (error) {
                        console.log(`Nie udało się stworzyć bazy danych! Użytkownik nie został poprawnie usunięty.`);
                    });
                }
                console.log(error.message);

            });
    }

    

    render() {
        return (
            <div className="flex-center vh100 bcg-lightgray">
                <div className="loginForm">
                    <h3 className="text-center">Zarejestruj się:</h3>
                    <form className="flex-column" onSubmit={this.createNewUser}>

                        <input type="text" placeholder="email" name="email" onChange={this.hadleChange} value={this.state.email} />
                        <input type="password" placeholder="hasło" name="password" onChange={this.hadleChange} value={this.state.password} />
                        <input type="password" placeholder="powtórz hasło" name="repeatPassword" onChange={this.hadleChange} value={this.state.repeatPassword} />
                        <button>UTWÓRZ KONTO</button>
                        <p className="text-right">Masz już konto? <Link to="/logIn"><span>Zaloguj się tutaj</span></Link></p>


                    </form>
                    <Link className="text-no-decoration" to="/"><i className="fas fa-chevron-left mr-5 mt-30"></i> Wróć do strony głównej </Link>
                </div>
            </div >)

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

const RegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterFormComponent)

export default withRouter(RegisterForm);