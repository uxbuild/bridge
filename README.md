# bridge

# BACKEND

## project setup

## database

## backend setup

## testing

## deployment

# project requirements

Description: 
Capstone blueprint.
end-to-end project
user can register, login
user can edit, see, delete users.
github = 2 repos (backend, frontend)

## backend features
- each feature a new branch
- merge branch when done.
- DB = use UUIDs.
- DB user (id, firstName, lastName, email, password, NOT NULL)
- endpoint: register
    - DB = email, first, last, password encrypted
    - return JWT token
- endpoint: login
    - email, password
    - return JWT token
- endpoint: about/me
    - protected
    - returns: first, last, id, email
    - use middleware (token validate)
- endpoint: GET all users
    - protected
    - use middleware (token validate)
- endpoint: GET single user
    - protected
- endpoint: DELETE user / protected
- endpoint: UPDATE user
    - email, first, last, password + update user info.
    - protected
- deploy (Render?)
- test all routes in Postman.

## frontend

- github repo 2
- each feature new branch
- VITE project
- components folder:
    - Registration (form: email, first, last, password)
    - Login
    - Single User
    - Home
- use Redux Toolkit to send data to backend.
- use windows.session.storage to save token
- redirect to home page when register complete
- Login = email, password
    - save token
    - and redirect to homepage
- Homepage = protected route.
    - if no token, redirect to login.
    - displays list of users
    - each user, 2 buttons: delete, update
    - note: cant delete user that is signed in.
- Update page (update user)
    - display all user info in form.
    - update user info.
    - redirect to home page when done.
- deploy

- BONUS
- error handling
- react router
- user cannot delete themselves (backend control)
