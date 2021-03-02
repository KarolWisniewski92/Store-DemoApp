import React from 'react';
import ParametrList from './ParametrList';
import { fbase } from '../../fbase';

const createID = () => {
    return Math.random().toString(36).substr(2, 9);
};

const initialStateNewItem = {
    name: "",
    id: "",
    description: "",
    price: "",
    onStock: false,
    photo: "",
    parametr: []
}

class AddNewItemForm extends React.Component {

    constructor() {
        super();
        this.state = {
            newItem: {
                name: "",
                id: createID(),
                description: "",
                price: "",
                onStock: false,
                photo: ""
            },
            newParametr: {
                ParametrName: '',
                ParametrValue: ''
            },
            errorState: {
                inputNameError: "",
                inputPriceError: "",
                inputDescriptionError: "",
                inputImageError: "",
                inputParametrNameError: "",
                inputParametrValueError: ""

            }
        }
    }
    handleChange = (event) => {
        console.log(event.target.name);

        if (event.target.name === 'onStock') {
            this.setState({
                newItem: {
                    ...this.state.newItem,
                    [event.target.name]: event.target.checked
                }
            })

        } else {
            this.setState({
                newItem: {
                    ...this.state.newItem,
                    [event.target.name]: event.target.value
                }
            })
        }

    }

    newParametrHandleChange = (event) => {
        this.setState({
            newParametr: {
                ...this.state.newParametr,
                [event.target.name]: event.target.value
            }
        })
    }

    addNewItem = (event) => {
        event.preventDefault();

        let validate = this.validateForm();
        if (validate) {
            fbase.post(`inventory/${this.state.newItem.id}`, {
                data: { ...this.state.newItem }
            }).then(() => {
                this.setState({
                    newItem: {
                        ...initialStateNewItem,
                        id: createID()
                    }

                })

            }).catch(err => {
                // handle error
            });
        }


    }

    addNewParametr = (event) => {
        event.preventDefault();

        let validate = this.validateAddParametrFrom();

        if (validate) {
            if (this.state.newItem.parametr !== undefined) {
                this.setState({
                    newItem: {
                        ...this.state.newItem,
                        parametr: [
                            ...this.state.newItem.parametr,
                            this.state.newParametr
                        ]
                    }
                })
            } else {
                this.setState({
                    newItem: {
                        ...this.state.newItem,
                        parametr: [
                            this.state.newParametr
                        ]
                    }
                })
            }
            this.setState({
                newParametr: {
                    ParametrName: '',
                    ParametrValue: ''
                },
                errorState: {
                    ...this.state.errorState,
                    inputParametrNameError: "",
                    inputParametrValueError: ""

                }
            })

        }

    }

    deleteParametr = (event) => {
        let newParametrList = this.state.newItem.parametr.filter((el) => {
            let newList;
            if (el.ParametrName !== event.target.closest('tr').firstChild.innerHTML) {
                newList = el
            }
            return newList
        })
        this.setState({
            newItem: {
                ...this.state.newItem,
                parametr: [
                    ...newParametrList
                ]
            }
        })
    }

    validateForm = () => {
        let inputNameError = "";
        let inputPriceError = "";
        let inputDescriptionError = "";
        let inputImageError = "";

        if (this.state.newItem.name === "") {
            inputNameError = `Podaj nazwę produktu!`
        }
        if (this.state.newItem.price === "") {
            inputPriceError = `Podaj cenę!`
        }
        if (this.state.newItem.description === "") {
            inputDescriptionError = `Uzupełnij opis produktu!`
        }
        if (this.state.newItem.photo === "") {
            inputImageError = `Uzupełnij ścieżkę zdjęcia!`
        }

        if (inputNameError || inputPriceError || inputDescriptionError || inputImageError) {
            this.setState({
                errorState: {
                    ...this.state.errorState,
                    inputNameError,
                    inputPriceError,
                    inputDescriptionError,
                    inputImageError
                }
            })
            return false
        } else {
            return true
        }
    }

    validateAddParametrFrom = () => {
        let inputParametrNameError = "";
        let inputParametrValueError = "";

        if (this.state.newParametr.ParametrName === "") {
            inputParametrNameError = `Podaj nazwę!`
        }
        if (this.state.newParametr.ParametrValue === "") {
            inputParametrValueError = `Podaj wartość!`
        }

        if (inputParametrNameError || inputParametrValueError) {
            this.setState({
                errorState: {
                    ...this.state.errorState,
                    inputParametrNameError,
                    inputParametrValueError,
                }
            })
            return false
        } else {
            return true
        }
    }


    render() {

        let parametrList = <tr><td>Nie podano żadnych parametrów</td></tr>;
        if (Array.isArray(this.state.newItem.parametr))

            parametrList = this.state.newItem.parametr.map((el) => {
                return (<ParametrList el={el} key={el.ParametrName} deleteParametr={this.deleteParametr} />)
            })


        return (<div>
            <h3 className="text-center">DODAJ NOWY PRODUKT:</h3>
            <form onSubmit={this.addNewItem} className="flex-column">
                <p name="inputNameError" className="text-red">{this.state.errorState.inputNameError}</p>
                <input
                    className="mb-20 mt-10"
                    type="text"
                    placeholder="Nazwa produktu"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.newItem.name} />

                <p name="inputPriceError" className="text-red">{this.state.errorState.inputPriceError}</p>
                <input
                    className="mb-20"
                    type="number"
                    placeholder="Cena"
                    name="price"
                    onChange={this.handleChange}
                    value={this.state.newItem.price} />

                <p name="inputImageError" className="text-red">{this.state.errorState.inputImageError}</p>
                <input
                    className="mb-20"
                    type="text"
                    placeholder="Ścieżka URL do zdjęcia"
                    name="photo"
                    onChange={this.handleChange}
                    value={this.state.newItem.photo} />
                <div>
                    <input
                        className="mb-20"
                        type="checkbox"
                        name="onStock"
                        id="onStock"
                        onChange={this.handleChange}
                        value={this.state.newItem.onStock} />
                    <label className="ml-5" htmlFor="onStock">Na stanie</label>
                </div>

                <p name="inputDescriptionError" className="text-red">{this.state.errorState.inputDescriptionError}</p>
                <textarea
                    className="h250-min p-5"
                    type="text"
                    placeholder="Opis produktu"
                    name="description"
                    onChange={this.handleChange}
                    value={this.state.newItem.description} />

                <div className="mbt-10">
                    <div className="flex-row">
                        <p name="inputParametrNameError" className="text-red">{this.state.errorState.inputParametrNameError}</p>
                        <p name="inputParametrValueError" className="text-red">{this.state.errorState.inputParametrValueError}</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Nazwa parametru"
                            name="ParametrName"
                            onChange={this.newParametrHandleChange}
                            value={this.state.newParametr.ParametrName} />
                        <input
                            className="ml-5"
                            type="text"
                            placeholder="Wartość"
                            name="ParametrValue"
                            onChange={this.newParametrHandleChange}
                            value={this.state.newParametr.ParametrValue} />
                        <button type="submit" className="btn-2 btn-green" onClick={this.addNewParametr}>Dodaj parametr</button>
                    </div>
                </div>
                <table className="parametrListTable">
                    <tbody>
                        <tr>
                            <td>Parametr:</td>
                            <td>Wartość:</td>
                        </tr>
                        {parametrList}
                    </tbody>
                </table>

                <button type="submit" className="btn-2 btn-blue btnAddNewItem ">Dodaj</button>
            </form>
        </div>)
    }
}
export default AddNewItemForm;