import React from 'react';
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import Shopcart from './dashboard/Shopcart';
import MyData from './dashboard/MyData';
import MyAdres from './dashboard/MyAdres';
import MyHistory from './dashboard/MyHistory';
import { firebaseApp, fbase } from '../fbase';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            showState: {
                showShopcart: true,
                showMyData: false,
                showMyAdres: false,
                showMyHistory: false
            },
            userData: {
                uid: "",  //z konta firebase
                email: "", //z konta firebase
                name: "",
                surname: "",
                phone: ""
            }

        }
    }

    handleChange = (event) => {
        this.setState({
            userData: {
                ...this.state.userData,
                [event.target.name]: event.target.value
            }

        })
    }

    checkUserData = () => {
        let user = firebaseApp.auth().currentUser;
        if (user !== null) {
            console.log(user);
            if (user.phoneNumber === null) {
                Object.defineProperty(user, 'phoneNumber', { value: "" })
            }

            // user.phoneNumber = "";
            this.setState({
                userData: {
                    uid: user.uid,
                    email: user.email,
                }
            })
        }



    }

    componentDidMount() {
        this.checkUserData();
    }


    showAction = (event) => {
        // console.log(event.target.getAttribute('name'));
        if (event.target.getAttribute('name') === null) { return; } else {
            this.setState({
                showState: {
                    [event.target.getAttribute('name')]: 'true'
                }
            })
        }

    }
    render() {

        return (<div>
            <Header />
            <Slider />
            <div className="bcg-lightgray pbt-30">
                <div className="wrapper-50 bcg-white p-30 h500">
                    <h3 className="text-center mb-30">Panel użytkownika:</h3>
                    <div className="flex-row">
                        <div className="wd-20 p-10 bcg-pink" onClick={this.showAction} >
                            <p className="mb-20" name="showShopcart">Koszyk:</p>
                            <p className="mb-20" name="showMyData">Moje dane:</p>
                            <p className="mb-20" name="showMyAdres">Moje adresy:</p>
                            <p className="mb-20" name="showMyHistory">Historia zakupów:</p>
                        </div>
                        <div className="wd-80 bcg-pink p-10 ml-30">
                            {this.state.showState.showShopcart &&
                                <Shopcart />}

                            {this.state.showState.showMyData &&
                                <MyData user={this.state.userData} handleChange={this.handleChange} />}

                            {this.state.showState.showMyAdres &&
                                <MyAdres />}

                            {this.state.showState.showMyHistory &&
                                <MyHistory />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>)
    }
}

export default Dashboard;