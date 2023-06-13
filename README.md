![teams impact logo](https://i.ibb.co/LYg84J0/logo-w-small.webp)

# Teams Impact

Teams Impact is an application designed to help you manage your teams in Genshin Impact.

# Technologies

The following technologies are used in this project:

Node.js
Express.js
MongoDB

# Endpoints

The following are the endpoints provided by Teams Impact backend:

## GET /ping

- Method: GET
- Dev URL: http://localhost:4000/ping
- Prod URL: https://federico-otalvares-final-project-back.onrender.com/ping
- Response: Status 200, { "message": "Pong" }

## GET /teams

- Method: GET
- Dev URL: http://localhost:4000/teams
- Prod URL: https://federico-otalvares-final-project-back.onrender.com/teams

## POST /user/login

- Method: POST
- Dev URL: http://localhost:4000/user/login
- Prod URL: https://federico-otalvares-final-project-back.onrender.com/user/login
- Request body: {"username": admin, "password": admin}
- Response: Status 200, { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcwZGQ2ODNlNWIyM2UwZmVhNjRiMDgiLCJuYW1lIjoiZmVkZSIsImlhdCI6MTY4NTg2NDk3MCwiZXhwIjoxNjg2MDM3NzcwfQ.hC-sKeo-gEOeUEgU-h5hvjWzL-P9jX-oxXBRZHVByiM" }

## POST /teams/add

- Method: POST
- Dev URL: http://localhost:4000/teams/add
- Prod URL: https://federico-otalvares-final-project-back.onrender.com/teams/add

## DELETE /teams/delete

- Method: POST
- Dev URL: http://localhost:4000/teams/delete/:id
- Prod URL: https://federico-otalvares-final-project-back.onrender.com/teams/delete/:id
