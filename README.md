# BlogSiteGraphQLAPI

This project is a GraphQL API that implements a blog system. Each blog has its own dedicated username and id and has its own posts, categories, and pages. Blogs are completely separated from each other.

The login and registration phases are done using a REST API. The whole authentication mechanism in the GraphQL system is implemented using an Authorization header (with a JWT Bearer token). For the user to use the GraphQL API, they must use a Blogid header, which indicates the blog that is currently in use. If the authentication header's user matches with the blog owner or the user is an admin, they are allowed to run mutations. Register and login parts require two fields as post data: username, password.

## Demo

![BlogSite GraphQL API](https://github.com/BaseMax/BlogSiteGraphQLAPI/assets/51885828/fd4f8f93-0df4-4b69-8588-1b9eb53114ed)
![BlogSite GraphQL API](https://github.com/BaseMax/BlogSiteGraphQLAPI/assets/51885828/e1c17a19-81a4-4223-9c0d-3c2ad4ac4be4)
![BlogSite GraphQL API](https://github.com/BaseMax/BlogSiteGraphQLAPI/assets/51885828/8508a435-1d65-47a3-ad86-41f47cf33f49)

------------

The REST API's endpoints for authentication are:

- POST /auth/login
- POST /auth/register
- GET /auth/me

For the register response, the same structure as login response is used. For /auth/me, we only have a response.

## Authentication

Here are some sample requests with curl:

### Login
```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"ehsan2","password":"Test123!"}' http://localhost:3000/auth/login 
```

Response:
```json
{"user":{"id":"cli1e06i70000ng7ebhvisec8","username":"ehsan2","isAdmin":false},"token":"<token>"}
```

### Register

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"newuser","password":"Test123!"}' http://localhost:3000/auth/register
```

Response:
```json
{"user":{"id":"cli1e06i70000ng7ebhvisec9","username":"newuser","isAdmin":false},"token":"<token>"}
```

### Get User Information

```bash
curl -X GET -H "Authorization: Bearer <token>" http://localhost:3000/auth/me
```

Response:
```json
{"id":"cli1e06i70000ng7ebhvisec8","username":"ehsan2","isAdmin":false}
```

## GraphQL Queries

Here are some sample GraphQL queries for the system:

### Get all posts

```graphql
query {
  posts(input: { limit: 10, skip: 0 }) {
    total
    data {
      id
      title
      content
      category {
        id
        title
      }
    }
  }
}
```

### Get all pages

```graphql
query {
  pages(input: { limit: 10, skip: 0 }) {
    total
    data {
      id
      title
      content
    }
  }
}
```

### Get all categories

```graphql
query {
  categories(input: { limit: 10, skip:0 }) {
    total
    data {
      id
      title
    }
  }
}
```

### Get all posts in a category

```graphql
query {
  category(id: "<category_id>") {
    id
    title
    posts(input: { limit: 10, skip: 0 }) {
      total
      data {
        id
        title
        content
      }
    }
  }
}
```

### Create a new post

```graphql
mutation {
  createPost(input: { title: "New post", content: "This is a new post", categoryId: "<category_id>" }) {
    id
    title
    content
    category {
      id
      title
    }
  }
}
```

## API Documentation

| Query/Mutation | Description |
| -------------- | ----------- |
| `blog` | Returns the blog data for the current user |
| `category(id: String!)` | Returns a category by ID |
| `categories(input: SearchCategoryInput!)` | Returns a list of categories with pagination and search filters |
| `post(id: String!)` | Returns a post by ID |
| `posts(input: SearchPostInput!)` | Returns a list of posts with pagination and search filters |
| `page(id: String!)` | Returns a page by ID |
| `pages(input: SearchPageInput!)` | Returns a list of pages with pagination and search filters |
| `createCategory(input: CreateCategoryInput!)` | Creates a new category |
| `deleteCategory(id: String!)` | Deletes a category by ID |
| `updateCategory(input: UpdateCategoryInput!)` | Updates a category by ID |
| `createPost(input: CreatePostInput!)` | Creates a new post |
| `deletePost(id: String!)` | Deletes a post by ID |
| `updatePost(input: UpdatePostInput!)` | Updates a post by ID |
| `createPage(input: CreatePageInput!)` | Creates a new page |
| `deletePage(id: String!)` | Deletes a page by ID |
| `updatePage(input: UpdatePageInput!)` | Updates a page by ID |

### Query/Mutation arguments

#### SearchCategoryInput
| Argument | Type | Description |
| -------- | ---- | ----------- |
| limit | Int! | The maximum number of categories to return |
| skip | Int! | The number of categories to skip |
| text | String | The text to search for in category titles |

#### SearchPostInput
| Argument | Type | Description |
| -------- | ---- | ----------- |
| limit | Int! | The maximum number of posts to return |
| skip | Int! | The number of posts to skip |
| text | String | The text to search for in post titles |
| categoryId | ID | The ID of the category to filter by |

#### SearchPageInput
| Argument | Type |Description |
| -------- | ---- | ----------- |
| limit | Int! | The maximum number of pages to return |
| skip | Int! | The number of pages to skip |
| text | String | The text to search for in page titles |

#### CreateCategoryInput
| Argument | Type | Description |
| -------- | ---- | ----------- |
| title | String! | The title of the category |

#### UpdateCategoryInput
| Argument | Type | Description |
| -------- | ---- | ----------- |
| title | String | The title of the category |
| id | String! | The ID of the category to update |

#### CreatePostInput
| Argument | Type | Description |
| -------- | ---- | ----------- |
| title | String! | The title of the post |
| content | String! | The content of the post |
| categoryId | ID! | The ID of the category to assign the post to |

#### UpdatePostInput
| Argument | Type | Description |
| -------- | ---- | ----------- |
| title | String | The updated title of the post |
| content | String | The updated content of the post |
| categoryId | ID | The updated ID of the category to assign the post to |
| id | String! | The ID of the post to update |

#### CreatePageInput
| Argument | Type | Description |
| -------- | ---- | ----------- |
| title | String! | The title of the page |
| content | String! | The content of thepage |

#### UpdatePageInput
| Argument | Type | Description |
| -------- | ---- | ----------- |
| title | String | The updated title of the page |
| content | String | The updated content of the page |
| id | String! | The ID of the page to update |

## Technologies
This project is built using NestJS, TypeScript, MySQL, and Prisma.

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

## Usage
To use this project, follow these steps:

1. Clone this repository:
   ```
   git clone https://github.com/basemax/RestaurantGraphqlApi
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create an admin account:
   ```
   npx nest start --entryFile create-admin.js
   ```
   It will prompt you for an email, password, and name to create the superuser account.
4. Run the app using Docker Compose:
   ```
   sudo docker-compose -f docker-compose.dev.yml up
   ```
   This will start the app in development mode, with hotreloading enabled. The GraphQL playground will be available at `http://localhost:3000/graphql`.
