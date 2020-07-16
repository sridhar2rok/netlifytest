import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getmachinesQuery, addspecMutation, getspecsQuery } from '../queries/queries';

class AddSpec extends Component {
    constructor(props){
        super(props);
        this.state = {
          Tree_name: '',
          data_element: '',
          Description: '',
          format: '',
          length: '',
          example: '',
          authorId: ''
        };
    }
    displayAuthors(){
        var data = this.props.getmachinesQuery;
        if(data.loading){
            return( <option disabled>Loading Machines</option> );
        } else {
            return data.machines.map(machine => {
                return( <option key={ machine.id } value={machine.id}>{ machine.machine} {machine.reporttype}</option> );
            });
        }
    }
    submitForm(e){
        e.preventDefault()
        // use the addspecMutation
        this.props.addspecMutation({
            variables: {
                Tree_name: this.state.Tree_name,
                data_element: this.state.data_element,
                Description: this.state.Description,
                format: this.state.format,
                length: this.state.length,
                example: this.state.example,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getspecsQuery }]
        });
    }
    render(){
        return(
            <form id="add-book" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                     <label>Tree name:</label>
                    <input type="text" onChange={ (e) => this.setState({ Tree_name: e.target.value }) } />
                </div>
                <div className="field">
                     <label>Data element:</label>
                    <input type="text" onChange={ (e) => this.setState({ data_element: e.target.value }) } />
                </div>
                <div className="field">
                     <label>Description:</label>
                    <input type="text" onChange={ (e) => this.setState({ Description: e.target.value }) } />
                </div>
                <div className="field">
                     <label>format:</label>
                    <input type="text" onChange={ (e) => this.setState({ format: e.target.value }) } />
                </div>
                <div className="field">
                     <label>length:</label>
                    <input type="text" onChange={ (e) => this.setState({ length: e.target.value }) } />
                </div>
                <div className="field">
                    <label>example:</label>
                    <input type="text" onChange={ (e) => this.setState({ example: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Select Machine:</label>
                    <select onChange={ (e) => this.setState({ authorId: e.target.value }) } >
                        <option>Select report</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getmachinesQuery, { name: "getmachinesQuery" }),
    graphql(addspecMutation, { name: "addspecMutation" })
)(AddSpec);
