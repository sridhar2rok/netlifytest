import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getspecQuery } from '../queries/queries';

class SpecDetails extends Component {
    displaySpecDetails(){
        const { spec } = this.props.data;
        if(spec){
            return(
                <div>
                    <h2>Data element: { spec.data_element }</h2>
                    <p>Tree_name: { spec.Tree_name }</p>
                    <p>Description: { spec.Description }</p>
                    <p>length: { spec.length }</p>
                    <p>format: { spec.format }</p>
                    <p>example: { spec.example }</p>
                    <p><h3>All Data elements contained in this {spec.author.machine} {spec.author.reporttype} below:</h3> </p>
                    <ul className="other-books">
                        { spec.author.books.map(item => {
                            return <li key={item.id}> <h3>Data element: {item.data_element}</h3> <p>Description: { item.Description }</p> <p>example: { item.example },   length: { item.length },   format: { item.format } </p> <p>Tree_name: { item.Tree_name } </p> </li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return( <div>No data element selected...</div> );
        }
    }
    render(){
        return(
            <div id="Specification-details">
                { this.displaySpecDetails() }
            </div>
        );
    }
}

export default graphql(getspecQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(SpecDetails);
