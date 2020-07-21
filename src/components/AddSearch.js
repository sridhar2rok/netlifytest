import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getmachinesQuery, getspecsQuery,getspecQuery } from '../queries/queries';

import SpecDetails from './SpecDetails';

class AddSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
          search: '',
          authorId: '',
          selected: null
        };
    }
    displayAuthors(){
        var data = this.props.getmachinesQuery;
        //console.log(data);
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
        // use the addspecMutatio
        }

    displaySpecs(){
      var item  = this.state.search.toLowerCase();
      console.log(item);
      var spec = this.props.getspecsQuery;
      console.log(spec.specs);
      if(spec.loading){
        return( <div> Loading books...</div> );
      }
      else {
            return spec.specs.map(spec => {
                return(spec.data_element.toLowerCase().includes(item) &&
                      <li key={ spec.item } onClick={ (e) => this.setState({ selected: spec.item }) }><b>{ spec.data_element}</b> - <small> {spec.author.machine} - {spec.author.reporttype} </small> {console.log(spec.data_element)}</li>
                  )
          })
        }

      }

    render(){
        return(

          <div id="book" onSubmit={ this.submitForm.bind(this) } >
                <div className="searchBox">
                    <input class="searchInput" type="text" placeholder="Search" onChange={ (e) => this.setState({ search: e.target.value }) } />
                    <button class="searchButton" href="#">
                <i class="material-icons">
                    search
                </i>
                    </button>
                </div>
                {/*<div className="field1">
                    <label>Select Machine:</label>
                    <select onChange={ (e) => this.setState({ authorId: e.target.value }) } >
                        <option>Select report</option>
                        { this.displayAuthors() }
                    </select>
                </div>*/}
                {/*<button>Search</button>*/}
                <ul id="book-list">
                {this.displaySpecs()}
                </ul>
                <SpecDetails bookId={ this.state.selected } />
          </div>



        );
    }
}

export default compose(
    graphql(getmachinesQuery, { name: "getmachinesQuery" }),
    graphql(getspecsQuery, { name: "getspecsQuery" }),
    graphql(getspecQuery, { name: "getspecQuery" })
)(AddSearch);
