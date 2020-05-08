# About

  This a sample application to demonstrate one of the ways how can a client/server
app can be built using React/Redux/Typescript and Django/Python. The app allows
to see the list of available restaurants, add, edit, and delete them. There is
no user management so it can hardly be called a real system.  

# Features

* List available restaurants
* Create a new restaurant
* View restaurant details page
* Edit restaurant detailss
* Delete restaurant
* Rate restaurant from the list
* Sort list by name and rating

# Technical description

## Backend

  I used Python 3.8, Django 3, and Sqlite to build a web server. API was built with
Django Rest Framework. 

I strived to fully adhere to PEP8

## Frontend

  I used React as the framework and TypeScript as the programming language
to implement the UI. For data management inside the UI app I used Redux.  

## Deployment

  I chose Docker to allow a rather simple way to spin up an instance of the at  
your local machine.

# Known limitations

Many of the known limitations are made for the sake of reducing the time I needed
to complete this project, improved readability by "decluttered" code. 

## Backend

* Many fields are omitted on the Restaurant model for the sake of simplicity 
(i.e. location that'd require geo support by the database for the best results,
image(s), price range, work hoers, etc.)
* API is not versioned
* No authentication/authorization
* Objects are sequential, that is not something I would choose for a product system
  due to security concerns and over-exposure
* No logging
* Joint requirements.txt (I usually separate production and development versions)

## Frontend

* Pagination is not supported
* Requests in progress are not displayed that will cause confusion in a real-word
  system
* Uses system dialogs (`alert`, `confirm`) instead of custom nicer html-based ones.
* Logging and error handling are virtually nonexistent
* No tests

# Try it

1. Make sure docker-compose is installed. 
1. Checkout this repo to a directory

Run

    ./run.sh

Tests

    ./run.sh test
    
Clean up data

    ./run.sh clean
