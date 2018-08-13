import gql from 'graphql-tag'

export default gql`
  mutation updateFold($id: ID!, $title: String, $uri: String, $content: String, $tags: [String]) {
    updateFold(id: $id, title: $title, uri: $uri, content: $content, tags: $tags) {
      id
      ownerId
      title
      uri
      tags
      createdAt
      updatedAt
    }
  }
`