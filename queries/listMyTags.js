import gql from 'graphql-tag'

export default gql`
  query lisyMyTags {
    listMyTags {
      items {
        __typename
        slug
      }
    }
  }
`
