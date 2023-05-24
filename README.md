# Blog Site GraphQL API

This project is a GraphQL API built with NestJS and TypeScript. It provides a backend for a blog site, allowing users to register, create and manage blog posts, manage categories, and create pages. It also supports authentication using JWT tokens.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Features

- Register and create a new blog
- Login
- Get all posts + pagination + filter/search
- Get all pages + pagination + filter/search
- Get all categories + pagination + filter/search
- Get all posts in a category + pagination + filter/search
- Create a new post
- Create a new page
- Create a new category
- Edit a post
- Edit a page
- Edit a category

## Installation

Clone the repository:

```bash
git clone https://github.com/BaseMax/BlogSiteGraphQLAPI
```

Install dependencies:

```bash
cd BlogSiteGraphQLAPI
npm install
```

Set up environment variables:

Create a `.env` file in the project root.

Add the following variables to the .env file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blogsite
JWT_SECRET=yoursecretkey
```

Make sure to replace yoursecretkey with your desired JWT secret key.

## Usage

Start the server:

```bash
npm run start
```

Open your browser and navigate to http://localhost:3000/graphql to access the GraphQL playground.

Register a new user:

Send a POST request to `/auth/register` with the following JSON payload:

```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

Replace yourusername and yourpassword with your desired username and password.

Login and generate a JWT token:

Send a POST request to `/auth/login` with the following JSON payload:

```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

Replace yourusername and yourpassword with your registered username and password.

The response will include a JWT token that you can use for authentication in subsequent requests.

Explore the GraphQL API:

Use the GraphQL playground to execute queries and mutations. Here are some examples:

Query to get all categories:

```graphql
query {
  categories {
    id
    name
  }
}
```

Query to get all posts:

```graphql
query {
  posts {
    id
    title
    content
    category {
      id
      name
    }
  }
}
```

Mutation to create a new post:

```graphql
mutation {
  createPost(
    input: {
      title: "My First Post"
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      categoryId: "categoryid"
    }
  ) {
    id
    title
    content
  }
}
```

Mutation to edit an existing post:

```graphql
mutation {
  editPost(
    id: "postid"
    input: {
      title: "Updated Post"
      content: "New content for the post."
      categoryId: "categoryid"
    }
  ) {
    id
    title
    content
  }
}
```

Mutation to delete a post:

```graphql
mutation {
  deletePost(id: "postid") {
    id
    title
  }
}
```

Query to search for posts by title or content:

```graphql
query {
  searchPosts(query: "searchterm") {
    id
    title
    content
  }
}
```

Query to get paginated posts within a category:

```graphql
query {
  category(id: "categoryid") {
    id
    name
    posts(page: 1, limit: 10) {
      totalCount
      totalPages
      currentPage
      posts {
        id
        title
        content
      }
    }
  }
}
```

Mutation to create a new page:

```graphql
mutation {
  createPage(
    input: {
      title: "About Us"
      content: "This is the About Us page."
    }
  ) {
    id
    title
    content
  }
}
```

Mutation to edit an existing page:

```graphql
mutation {
  editPage(
    id: "pageid"
    input: {
      title: "Updated About Us"
      content: "New content for the About Us page."
    }
  ) {
    id
    title
    content
  }
}
```

Query to get all pages:

```graphql
query {
  pages {
    id
    title
    content
  }
}
```

Structure:

```graphql
type Query {
  register(username: String!, password: String!): User
  login(username: String!, password: String!): Token
}

type Mutation {
  createPost(input: CreatePostInput!): Post
}

type User {
  id: ID!
  username: String!
}

type Token {
  accessToken: String!
}

type Post {
  id: ID!
  title: String!
  content: String!
  category: Category!
}

type Category {
  id: ID!
  name: String!
}

input CreatePostInput {
  title: String!
  content: String!
  categoryId: ID!
}
```

Register a new user:

```graphql
mutation {
  register(username: "yourusername", password: "yourpassword") {
    id
    username
  }
}
```

Login and generate a JWT token:

```graphql
query {
  login(username: "yourusername", password: "yourpassword") {
    accessToken
  }
}
```

## License

This project is licensed under the GPL-3.0 License.
