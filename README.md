# Movies

This is a project that Creates CRUD API + Search and filter APIs with Apollo graphql and PostgreSQL database. You
need to create 3-4 database tables that have some sort of relationship in them and then build
API on top of it. Must use Typescript..


## Technical Details
The API allows users to:
● SignUp as a User
● Login
● Change Password
● Query a list of all the movies.
● Query a movie with it’s id
● Create a new movie
● Update an existing movie
● Delete a movie
● Query a list of reviews for a movie
● Create a new review
● Update an exiting review of a movie
● Delete a review
The user data includes following information:
● ID (Number)(Auto Increment)
● User Name(String)
● Email ID(String)
● Password(String)
The movie data includes following fields:
● ID (Number)(Auto Increment)
● Movie Name (String)
● Description(String)
● Director Name (String)
● Release Date (Date)
The review data includes the following:
● ID (Number)(Auto Increment)
● Movie ID(Number)(Reference from Movies data table)
● User ID(Number)(Reference from User data table)
● Rating(Number)
● Comment(String)
Authorization and Authentication:
● Users should be able to register for and account with email and password. Passwords
should be hashed.
● User should be able login in to the API with their email and password and receive a JWT
token.
● API should accept JWT tokens in headers to authenticate requests.
● Only authenicated users should be able to perform Create, Update or Delete operations
on movies or reviews.
● Users should only be able to modify their movie or review.