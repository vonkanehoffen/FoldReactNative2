import gql from 'graphql-tag'

export default gql`
  mutation deleteFold($id: ID!) {
    deleteFold(id: $id) {
      id
    }
  }
`