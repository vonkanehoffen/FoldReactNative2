import gql from 'graphql-tag'

export default gql`
  mutation createFold($uri: String!, $title: String!, $content: String, $tags: [String]) {
    createFold(uri: $uri, title: $title, content: $content, tags: $tags) {
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
`