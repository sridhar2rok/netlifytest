import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getspecsQuery } from '../queries/queries';

// components
import SpecDetails from './SpecDetails';

class SpecList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    displaySpecs(){
      //console.log(this.state.selected);
      var data = this.props.data;
            if(data.loading){
          return( <div>Loading books...</div> );
      }
      else {
       return data.specs.map(spec => {
           return(
                 <li key={ spec.id } onClick={ (e) => this.setState({ selected: spec.id }) }>{ spec.data_element}</li>
           );
       })
      }
    }

    render(){
        return(
               <div>
            {/*  <ul id="book-list">
                 { this.displaySpecs() }
               </ul>
               <SpecDetails bookId={ this.state.selected } />
            */}  </div>
        );
    }
}

export default graphql(getspecsQuery)(SpecList);
