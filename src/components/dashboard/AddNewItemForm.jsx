import React from 'react';
import ParametrList from './ParametrList';
import { fbase } from '../../fbase';

class AddNewItemForm extends React.Component {

    constructor() {
        super();
        this.state = {
            newItem: {
                name: "",
                description: "",
                price: "",
                onStock: "",
                photo: ""

            },
            newParametr: {
                newParametrName: '',
                newParametrValue: ''
            }
        }
    }
    handleChange = (event) => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [event.target.name]: event.target.value
            }

        })
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




        fbase.post(`inventory/${this.state.newItem.id}`, {
            data: { ...this.state.newItem }
        }).then(() => {

        }).catch(err => {
            // handle error
        });
    }

    addNewParametr = (event) => {
        event.preventDefault();
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
                newParametrName: '',
                newParametrValue: ''
            }
        })
    }
    componentDidMount() {
        const createID = () => {
            return Math.random().toString(36).substr(2, 9);
        };
        let ID = createID();
        this.setState({
            newItem: {
                ...this.state.newItem,
                id: ID
            }
        })
    }

    deleteParametr = (event) => {
        let newParametrList = this.state.newItem.parametr.filter((el) => {
            let newList;
            if (el.newParametrName !== event.target.closest('tr').firstChild.innerHTML) {
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

    render() {

        let parametrList = <tr><td>Nie podano żadnych parametrów</td></tr>;
        if (Array.isArray(this.state.newItem.parametr))

            parametrList = this.state.newItem.parametr.map((el) => {
                return (<ParametrList el={el} key={el.newParametrName} deleteParametr={this.deleteParametr} />)
            })


        return (<div>
            <h3 className="text-center">DODAJ NOWY PRODUKT:</h3>
            <form onSubmit={this.addNewItem} className="flex-column">
                <input className="mb-20 mt-10" type="text" placeholder="Nazwa produktu" name="name" onChange={this.handleChange} value={this.state.newItem.name} />
                <input className="mb-20" type="number" placeholder="Cena" name="price" onChange={this.handleChange} value={this.state.newItem.price} />

                <textarea className="h250-min p-5" type="text" placeholder="Opis produktu" name="description" onChange={this.handleChange} value={this.state.newItem.description} />

                <div className="mbt-10">
                    <input type="text" placeholder="Nazwa parametru" name="newParametrName" onChange={this.newParametrHandleChange} value={this.state.newParametr.newParametrName} />
                    <input className="ml-5" type="text" placeholder="Wartość" name="newParametrValue" onChange={this.newParametrHandleChange} value={this.state.newParametr.newParametrValue} />
                    <button type="submit" className="btn-2 btn-green" onClick={this.addNewParametr}>Dodaj parametr</button>
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