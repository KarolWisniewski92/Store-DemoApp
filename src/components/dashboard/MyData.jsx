import React from 'react';
import { fbase } from '../../fbase';

class MyData extends React.Component {

    updateUser = (event) => {
        event.preventDefault();
        console.log(this.props.user.path);
        fbase.post(this.props.user.path, {

            data: {
                ...this.props.user
            }
        }
        )

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
                        <input className="mb-10" placeholder="Email" type="text" name="email" value={this.props.user.email} onChange={this.props.handleChange} disabled="disabled" />
                        <input className="mb-10" placeholder="Telefon" type="text" name="phone" value={this.props.user.phone} onChange={this.props.handleChange} />
                    </div>
                </div>
                <button className="btn-2 sendBtnDashboard">Zaktualizuj dane</button>
                <p className="text-right mt-10">* adres email nie może zostać zmieniony!</p>



            </form>
        </div >)
    }
}

export default MyData;