import gql from 'graphql-tag'

export default gql`
  query listMyFolds {
    listMyFolds {
      items {
        id
        ownerId
        uri
        title
        content
        tags
        createdAt
        updatedAt
      }
    }
  }`