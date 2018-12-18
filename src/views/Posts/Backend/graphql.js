export const CREATE_POST = `
mutation CreatePost(
    $name: String!, 
    $lastname: String!, 
    $caption: String!,
    $imgUrl: String!,
    ) {
    createPost(input: {
        name: $name, 
        lastname: $lastname, 
        caption: $caption,
        imgUrl: $imgUrl
    }) {
      caption
      imgUrl
      lastname
      name
    }
}`;
export const LIST_POSTS = `
query ListPosts(
    $limit: Int
){
    listPosts(limit: $limit){
        items {
            name
            lastname
            username
            caption
            imgUrl
            id
        }
        nextToken
    }
}
`