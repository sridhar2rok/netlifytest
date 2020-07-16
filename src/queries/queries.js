import { gql } from 'apollo-boost';

const getmachinesQuery = gql`
    {
        machines {
            machine
            id
            reporttype
        }
    }
`;

const getspecsQuery = gql`
    {
        specs {
            data_element
            id
            author{
              machine
              reporttype
            }
        }
    }
`;

const addspecMutation = gql`
    mutation AddBook($Tree_name: String!, $data_element: String!, $Description: String!, $format: String!, $length: String!, $example: String!, $authorId: ID!){
        addBook(Tree_name: $Tree_name, data_element: $data_element, Description: $Description, format: $format, length: $length, example: $example, authorId: $authorId){
            data_element
            id
        }
    }
`;

const getspecQuery = gql`
    query GetBook($id: ID){
        spec(id: $id) {
            id
            data_element
            Tree_name
            Description
            format
            length
            example
            author {
                id
                machine
                reporttype
                books {
                    data_element
                    id
                    Tree_name
                    Description
                    example
                    length
                    format
                }
            }
        }
    }
`;

export { getmachinesQuery, getspecsQuery, addspecMutation, getspecQuery };
