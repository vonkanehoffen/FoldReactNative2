import gql from 'graphql-tag'

export default gql`
  query listAll {
    listFolds{
      items {
        __typename
        title
      }
    }
  }
`