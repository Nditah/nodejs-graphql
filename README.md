# nodejs-graphql

# Basic Graphql server with Nodejs Express and MongoDB

Hashnode article - https://hashnode.com/preview/602f494e1591c5239ebdc308


## How to run the project

- Rename the `Example.env` to `.env` for environmental variables
- Run `npm install` to install project dependencies
- Run `npm start` to start the Server



## Add Record: Author

```
mutation {
  addAuthor(name: "Chinua Achebe", age: 85) {
    name,
    age
  }
}
```


## Query Record: Authors

```
{
  authors {
    id,
    name,
    book { name, pages }
	}
}
```


## Add Record: Book

```
mutation{
  addBook(name: "Lukong and the Leopard", pages: 114, authorID: 02f386531a8e02341ab4578") {
    name,
    pages
  }
}
```


## Query Record: Books

```
{
  books {
    id,
    name,
    author { name, age }
	}
}
```

## Dependencies

- dotenv
Dotenv loads environment variables from .env into ENV (process.env). "Storing configuration in the environment is one of the tenets of a twelve-factor app.Anything that is likely to change between deployment environments–such as resource handles for databases or credentials for external services–should be extracted from the code into environment variables.

- express
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications

- express-graphql
Create a GraphQL HTTP server with any HTTP web framework that supports connect styled middleware, including Connect itself, Express and Restify.

- graphql
GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. The js library provides two important capabilities: building a type schema and serving queries against that type schema

- mongoose
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It is a JavaScript library that allows you to define schemas with strongly typed data

- nodemon:
Nodemon is a development dependencies. It helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
  