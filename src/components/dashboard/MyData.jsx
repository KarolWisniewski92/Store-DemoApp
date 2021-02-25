import React from 'react';
import { firebaseApp } from '../../fbase';

class MyData extends React.Component {

    updateUser = (event) => {
        event.preventDefault();
        let user = firebaseApp.auth().currentUser;

        user.updateProfile({
            displayName: `${this.props.user.name} ${this.props.user.surname}`,
            email: this.props.user.email


        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            console.log(error.message);
        });
    }


    render() {
        return (<div>
            <h3 className="text-center mb-20">MOJE DANE:</h3>
            <form className="flex-column" onSubmit={this.updateUser}>
                <div className="flex-row">
                    <div className="wd-50 flex-column mr-5">
                        <input className="mb-10" placeholder="Imię" type="text" name="name" value={this.props.user.name} onChange={this.props.handleChange} />
                        <input className="mb-10" placeholder="Nazwisko" type="text" name="surname" value={this.props.user.surname} onChange={this.props.handleChange} /></div>
                    <div className="wd-50 flex-column ml-5">
                        <input className="mb-10" placeholder="Email" type="text" name="email" value={this.props.user.email} onChange={this.props.handleChange} />
                        <input className="mb-10" placeholder="Telefon" type="text" name="phone" value={this.props.user.phone} onChange={this.props.handleChange} />
                    </div>
                </div>
                <button className="btn-2 sendBtnDashboard">Zaktualizuj dane</button>



            </form>
        </div >)
    }
}

export default MyData;