# Spencr.me

Racket is a simple reimbursement tracking system, originally designed to help me keep track
of things that my parents owed me money for.

## Features

- Quickly add new codes and have the short URL added to your clipboard 
immediately after submitting


- Simple redirects for shortcodes that have been added


## Installation

#### Linux

- Install packages

`npm install`

- Set environment variables

`process.env.PORT: sets what port the app will run on (default 8070)`   
`process.env.DATABASE: a mongoDB connection URL, used to store codes and associated URLs`


- Start the app

`node app.js`


