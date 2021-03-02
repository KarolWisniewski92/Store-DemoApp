import React from 'react';
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import Shopcart from './dashboard/Shopcart';
import MyData from './dashboard/MyData';
import MyAdres from './dashboard/MyAdres';
import MyHistory from './dashboard/MyHistory';
import { firebaseApp, fbase } from '../fbase';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddNewItemForm from './dashboard/AddNewItemForm';

class DashboardComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            activeClass: true,
            showState: {
                showShopcart: false,
                showMyData: true,
                showMyAdres: false,
                showMyHistory: false,
                showAddItemForm: false
            },
            userData: {
            }

        }
    }

    toggle = () => {
        this.setState({
            activeClass: !this.state.activeClass
        })

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
            this.setState({
                userData: { path: `users/${user.uid}` }
            })

            let path = `users/${user.uid}`
            fbase.listenTo(path, {
                context: this,
                then(data) {
                    this.setState({
                        userData: {
                            ...data,
                            path: path
                        }
                    })

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
            {
                let leftBar = document.querySelector('.leftBar')
                leftBar = Array.from(leftBar.children);
                for (let i = 0; i < leftBar.length; i++) {
                    leftBar[i].classList.remove('active')
                }

                let activeElement = Array.from(document.getElementsByName(`${event.target.getAttribute('name')}`));
                activeElement[0].classList.add('active');
                // console.log(activeElement);
            }
        }

    }

    render() {

        return (<div>
            <Header />
            <Slider />
            {this.props.logIn &&

                <div className="bcg-lightgray pbt-30">
                    <div className="wrapper-50 bcg-white p-30 h500">
                        <h3 className="text-center mb-30">Panel użytkownika:</h3>
                        <div className="flex-row">

                            <div className="wd-25 p-10 leftBar" onClick={this.showAction} >
                                <p className="mb-20" name="showShopcart">Koszyk:</p>
                                <p className="mb-20 active" name="showMyData" id="test">Moje dane: </p>
                                <p className="mb-20" name="showMyAdres">Moje adresy:</p>
                                <p className="mb-20" name="showMyHistory">Historia zakupów:</p>
                                {this.state.userData.isAdmin &&
                                    <p className="mb-20" name="showAddItemForm">Dodaj nowy przedmiot:</p>
                                }
                            </div>
                            <div className="wd-75 p-10 ml-30">
                                {this.state.showState.showShopcart &&
                                    <Shopcart />}

                                {this.state.showState.showMyData &&
                                    <MyData user={this.state.userData} handleChange={this.handleChange} />}

                                {this.state.showState.showMyAdres &&
                                    <MyAdres />}

                                {this.state.showState.showMyHistory &&
                                    <MyHistory />}
                                {this.state.showState.showAddItemForm &&
                                    <AddNewItemForm />}

                            </div>
                        </div>
                    </div>
                </div>
            }
            {!this.props.logIn &&
                this.props.history.push("/logIn")
            }
            <Footer />
        </div >)
    }
}


const mapStateToProps = state => {
    return {
        logIn: state.logIn
    }
}

const Dashboard = connect(mapStateToProps)(DashboardComponent)

export default withRouter(Dashboard);