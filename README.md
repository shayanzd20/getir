# getir Project

This project used express js mocha chai

## Instruction
* first of all pull the branch and install modules by writing below command on terminal in the root of the project
`npm install`
and then 
`npm start`
* the service will run locally on port 3031.
* then you can use this request to get the result of records
`curl --location --request POST 'http://localhost:3031/gerit/test' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2017-01-26",
    "endDate": "2017-12-02",
    "minCount": 100,
    "maxCount": 3000
}'`

* lcm endpoint will find their least common multiple (LCM).

## Test
to run unit test just run below command on terminal in the root of the project
`npm test`

## Swagger 
for documentation of apis just click on this url 
(http://localhost:3031/api-docs).

## Deployment 
the project deployed on this url 
(https://evening-depths-82249.herokuapp.com).
