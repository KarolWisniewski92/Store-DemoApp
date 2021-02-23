import React from 'react';
import { Link } from 'react-router-dom';

class registerForm extends React.Component {
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
    
    render() {
        return (
            <div className="flex-center vh100 bcg-lightgray">
                <div className="loginForm">
                    <h3 className="text-center">Zarejestruj się:</h3>
                    <form className="flex-column">

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

export default registerForm;