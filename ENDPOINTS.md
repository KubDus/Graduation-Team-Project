# Endpoints

Here you can test every endpoint in your desktop postman by using our collection.

- Here is link for postman desktop app if you don't have it already installed in your pc

## Set up your postman

- Copy this link `https://www.getpostman.com/collections/357533024d194d7c2a29`
- Press button in postman `IMPORT`
- Put link into tab `Link` and press `continue`
- Then press `import` and there u have it, now you have copy of our testing collection
- Enjoy.

## Shortcuts (*)

- `JWT` = JSON Web Token ( `https://jwt.io` )
- `A`   = User with admin role
- `MA`  = User with mentor + admin role
- `M`   = User with mentor role
- `Ap`  = User with apprentice role

## First endpoint u should run in PostMan

`/login` This endpoint will respond with JWT MA*

This JWT token you will be using in almost every endpoints copy it and replace headear `<JWT>`




## If you are not using our collection here is all endpoints with input and responses

## User endpoints

1. `/login` This endpoint will respond with JWT MA*
    - `method`  = GET
    - `INPUT`   = JWT A/MA in header of request
    - `request body in raw JSON`

```JSON
{
    "email":"j@koza.cz",
    "password":"Asdf1234"
} 
```

### Response = in message is JWT token from user with role mentor + admin

```JSON
{
    "message": "<JWT*>"
}
```

2. `/registration` This endpoint should register new user
    - `method`  = POST
    - `INPUT`   = JWT A/MA in header of request (optional)
    - `request body in raw JSON`

```JSON
{
    "email":"<YOUR @ EMAIL .com>",
    "password":"Password1"
}
```
### Response = response is in JSON

```JSON
{
    "message": "Admin received registration request. Once handled, email will be sent."
}
```

`OR`

This response depends on if you used JWT A/MA* in header of request

```JSON
{
    "body": {
        "message": "Request for registration was submitted. Email was sent to confirm registration."
    },
    "status": 200
}
```

3. `/users` This endpoint should return all users from database.
    - `method`     = GET
    - `INPUT`      = JWT A/MA/M/Ap* in header of request
 
In case if role is mentor + admin you need to choose if you are looking as admin or mentor.
So in this case is here extra JSON body input in this form.

```JSON
{
    "behaveAs" : "mentor"
}
```

`OR`

```JSON
{
    "behaveAs" : "admin"
}
```

### Response = response is in JSON

Case if `behaveAs` is admin:

```JSON
[
    {  
        "id": 5,
        "first_name": "Jakub",
        "last_name": "Korch",
        "username": null,
        "email": "j@k.sk",
        "status": "ENABLED",
        "role": "admin"
    },
    {
        "id": 6,
        "first_name": "Adam",
        "last_name": "Koubek",
        "username": null,
        "email": "a@k.cz",
        "status": "ENABLED",
        "role": "mentor"
    },
    {
        "id": 7,
        "first_name": "Jakub",
        "last_name": "Kozak",
        "username": null,
        "email": "j@koza.cz",
        "status": "ENABLED",
        "role": "mentor + admin"
    }
]
```

Case if `behaveAs` is mentor:

```JSON
[
    {
        "id": 4,
        "first_name": "Jakub",
        "last_name": "Dus",
        "username": null,
        "email": "j@d.cz",
        "status": "ENABLED",
        "role": "apprentice"
    },
    {
        "id": 6,
        "first_name": "Adam",
        "last_name": "Koubek",
        "username": null,
        "email": "a@k.cz",
        "status": "ENABLED",
        "role": "mentor"
    },
    {
        "id": 7,
        "first_name": "Jakub",
        "last_name": "Kozak",
        "username": null,
        "email": "j@koza.cz",
        "status": "ENABLED",
        "role": "mentor"
    }
]
```

4. `/users/{id}` This endpoint should return specific user
    - `method`     = GET
    - `INPUT`      = JWT A/MA/M* in header of request
  
### Response = response is in JSON

```JSON
{
    "id": 1,
    "firstName": "Lukas",
    "lastName": "Habanec",
    "username": "Lupen",
    "email": "L.be@atlas.cz",
    "password": "$2b$08$YrIxE9IJ4UtLsbAm0v1YquzQRRWr54KVvZNRC5bJcZSL/SF0z82WO",
    "role": "apprentice",
    "status": "ENABLED",
    "authenticationLink": "asti4867r",
    "authenticationExpiration": null
}
```

5. `/users/{id}` This endpoint should update specific user
    - `method`  = PUT
    - `INPUT`   = JWT A/MA in header of request
    - `request body in raw JSON`

```JSON
{
    "email":"test@test.com",
    "username":"testerovic",
    "first_name":"Test",
    "last_name":"Testerovic"
}
```

### Response = response is in JSON

```JSON
{
    "message": "User updated!"
}
```

6. `/users/{id}` This endpoint should delete specific user
    - `method`  = DELETE
    - `INPUT`   = JWT A/MA in header of request

### Response = response is in JSON

```JSON
{
    "message": "User deleted!"
}
```

7. `/users/self-register` This endpoint should return all users which need to be approved by admin
    - `method`  = GET
    - `INPUT`   = JWT A/MA in header of request

### Response = response is in JSON

```JSON
{
    "message": [
        {
            "id": 8,
            "username": null,
            "email": "<YOUR @ EMAIL .com>"
        },
        {
            "id": 9,
            "username": null,
            "email": "<y @ EMAIL .com>"
        }
    ]
}
```

`OR` This message is shown when no users are in disabled state 

```JSON
{
    "message": "No users found with status disabled."
}
```

8. `/users/{id}/enable` This endpoint should approve user which asked for registration and send him an email for confirmation
    - `method`     = PUT
    - `INPUT`      = JWT A/MA* in header of request

### Response = response is in JSON

```JSON
{
    "message": "Email send."
}
```

9. `/registration/confirmation/{authenticationLink}` This endpoint should change user status from email sent to enabled
    - `method`     = GET
    - `INPUT`      = no need to use JWT here

For this endpoint you can use our test user, here is his `authenticationLink` = `zsti4867r`

### Response = response is in JSON

```JSON
{
    "message": "User was activated"
}
```

10. `/users/auth` This endpoint should update password of specific user which is defined by JWT 
    - `method`     = PUT
    - `INPUT`      = JWT A/MA/M/Ap* in header of request
    - `request body in raw JSON`
  
```JSON
{
    "oldPassword" : "Asdf1234",
    "newPassword" : "Asdf12345"
}
```

### Response = response is in JSON

```JSON
{
    "message": "User updated!"
}
```

Don't forget to change password in login endpoint to `Asdf12345`!

11. `/registration/forgotten` This endpoint should return and sent a random generated link for resetting password
    - `method`     = POST
    - `INPUT`      = no need for JWT
    - `request body in raw JSON`

```JSON
{
    "identification":"d@e.sk"  
}
```

### Response = response is in JSON

```JSON
{
    "forgottenPasswordToken": "QCqbPw2H77rhzDTNVcoxWu0c6NZMVaXvQ4BSPrLcmPtHqLqN"
}
```

12. `/registration/confirmation/{authenticationLink}` This endpoint should set new password
    - `method`     = POST
    - `INPUT`      = no need for JWT
    - `request body in raw JSON`

For this endpoint we can use again our test user his `authenticationLink` = `testingLink`

```JSON
{
    "password" : "Password123"
}
```

### Response = response is in JSON

```JSON
{
    "message": "New password successfully saved."
}
```

## Apprenticeship endpoints

1. `/apprenticeship` This endpoint should return all apprenticeships from database.
    - `method`     = GET
    - `INPUT`      = JWT A/MA* in header of request
  
### Response = response is in JSON
  
```JSON
    {
        "message": [
            {
                "id": 1,
                "user": 1,
                "cohort": 1,
                "class": 1,
                "phase": "FOUNDATION"
            },
            {
                "id": 2,
                "user": 1,
                "cohort": 1,
                "class": 1,
                "phase": "ORIENTATION"
            }
        ]
    } 
```

1. `/apprenticeship/{id}` This endpoint should return specific apprenticeship
    - `method`     = GET
    - `INPUT`      = JWT A/MA* in header of request

### Response = response is in JSON

```JSON
{
    "id": 1,
    "user": 1,
    "cohort": 1,
    "class": 1,
    "phase": "FOUNDATION",
    "status": "ENABLED",
    "startdate": "2021-11-22",
    "enddate": "2022-01-07",
    "exam": null,
    "result": null
}
```

3. `/apprenticeship` This endpoint should create a new apprenticeship
    - `method`     = POST
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON`

```JSON
{
    "user" : "1",
    "cohort" : "1",
    "class" : "1",
    "phase" : "ORIENTATION",
    "status" : "ENABLED"
}
```

### Response = response is in JSON

```JSON
{
    "message": "Apprenticeship created."
}
```

4. `/apprenticeship/{id}` This endpoint should update specific apprenticeship
    - `method`     = PUT
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON`

```JSON
{
    "status" : "DISABLED"
}
```

### Response = response is in JSON

```JSON
{
    "message": "Updated."
}
```

5. `apprenticeship/{id}` This endpoint should soft-delete specific apprenticeship
    - `method`     = DELETE
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON`

### Response = response is in JSON

```JSON
{
    "message": "Apprenticeship deleted."
}
```

## Class endpoints

1. `/classes` This endpoint should return all of the classes from database
    - `method`     = GET
    - `INPUT`      = JWT A/MA/M* in header of request
  
### Response = response is in JSON

```JSON
[
    {
        "id": 1,
        "name": "Celadon",
        "cohortName": "Cool Cohort",
        "classTypeId": null
    },
    {
        "id": 2,
        "name": "Tigers",
        "cohortName": "Cool Cohort",
        "classTypeId": null
    },
]
```

2. `/classes/{id}` This endpoint should return specific class
    - `method`     = GET
    - `INPUT`      = JWT A/MA/M* in header of request

### Response = response is in JSON

```JSON
{
    "id": 1,
    "name": "Celadon",
    "cohortName": "Cool Cohort",
    "classTypeId": null,
    "status": "ENABLED",
    "students": [
        {
            "fullname": "Lukas Habanec",
            "email": "L.be@atlas.cz"
        },
        {
            "fullname": "Lukas Habanec",
            "email": "L.be@atlas.cz"
        },
        {
            "fullname": "Denis Ergenekon",
            "email": "d@e.sk"
        }
    ]
}
```

3. `/classes` This endpoint should create new class
    - `method`     = POST
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON`

```JSON
{
    "name" : "Test class",
    "cohortName" : "Cool Cohort",
    "classTypeId" : "1",
    "status" : "ENABLED"
}
```

### Response = response is in JSON

```JSON
{
    "message": "Class created."
}
```

4. `/classes/{id}` This endpoint should update specific class
    - `method`     = PUT
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON`
  
```JSON
{
    "name" : "Updated class",
    "cohortName" : "Lame Cohort",
    "classTypeId" : "2",
    "status" : "DISABLED"
}
```
### Response = response is in JSON

```JSON
{
    "message": "Updated."
}
```

5. `/classes/{id}` This endpoint should soft-delete specific class
    - `method`     = Delete
    - `INPUT`      = JWT A/MA* in header of request

### Response = response is in JSON

```JSON
{
    "message": "Class deleted."
}
```

## Exam endpoints

1. `/exams` This endpoint should return all exams from database
    - `method`  = GET
    - `INPUT`   = JWT A/MA/M* in header of request

### Response = response is in JSON

```JSON
[
    {
        "id": 1,
        "phase": "ORIENTATION",
        "isRetake": false,
        "date": "2022-01-01",
        "name": null,
        "description": null,
        "solution": null,
        "walkthrough": null,
        "status": "ACTIVE"
    },
    {
        "id": 2,
        "phase": "FOUNDATION",
        "isRetake": false,
        "date": "2022-02-02",
        "name": null,
        "description": null,
        "solution": null,
        "walkthrough": null,
        "status": "ACTIVE"
    }
]
```

2. `/exams/{id}` This endpoint should return specific exam
    - `method`  = GET
    - `INPUT`   = JWT A/MA/M* in header of request

### Response = response is in JSON

```JSON
{
    "message": {
        "id": 1,
        "phase": "ORIENTATION",
        "isRetake": false,
        "date": "2022-01-01",
        "name": null,
        "description": null,
        "solution": null,
        "walkthrough": null,
        "status": "ACTIVE"
    }
}
```

3. `/exams/{id}`  This endpoint should create new exam
    - `method`     = POST
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON`

```JSON
{
    "phase":"FOUNDATION",
    "date":"04-04-2023",
    "isRetake":"false"
}
```

### Response = response is in JSON

```JSON
{
    "message": "Exam created."
}
```

4. `/exams/{id}`  This endpoint should update specific exam
    - `method`     = PUT
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON`

```JSON
{
    "phase":"FOUNDATION",
    "date":"04-04-2023",
    "isRetake":"true",
    "name" : "test",
    "description" : "Tralala exam",
    "solution" : "answer is 5",
    "walkthrough" : "walking"
}
```

### Response = response is in JSON

```JSON
{
    "message": "Updated."
}
```

5. `/exams/{id}`  This endpoint should delete specific exam
    - `method`     = DELETE
    - `INPUT`      = JWT A/MA* in header of request

### Response = response is in JSON

```JSON
{
    "message": "Deleted"
}
```

## Cohort endpoints

1. `/cohorts` This endpoint should return all `ACTIVE` cohorts from database
    - `method`     = GET
    - `INPUT`      = JWT A/MA/M* in header of request

### Response = response is in JSON

```JSON
[
    {
        "id": 1,
        "name": "Cool Cohort",
        "country": null
    },
    {
        "id": 2,
        "name": "Lame Cohort",
        "country": null
    }
]
```

2. `/cohorts/{id}` This endpoint should return specific cohort
    - `method`     = GET
    - `INPUT`      = JWT A/MA/M* in header of request

### Response = response is in JSON

```JSON
{
    "cohortDetails": {
        "id": 1,
        "name": "Cool Cohort",
        "country": null,
        "status": "ACTIVE"
    },
    "cohortsClasses": [
        "Celadon",
        "Tigers"
    ]
}
```

3. `/cohorts` This endpoind should create new cohort
    - `method`     = POST
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON`

```JSON
{
    "name" : "Test",
    "country" : "CZ",
    "status" : "ACTIVE"
}
```

### Response = response is in JSON

```JSON
{
    "message": "Cohort created."
}
```

4. `/cohorts/{id}` This endpoint should update specific cohort
    - `method`     = PUT
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON`

```JSON
{
    "name" : "New name",
    "country" : "SK",
    "status" : "ACTIVE"
}
```

### Response = response is in JSON

```JSON
{
    "message": "Updated."
}
```

5. `/cohorts/{id}` This endpoint should soft-delete specific cohort
    - `method`     = DELETE
    - `INPUT`      = JWT A/MA* in header of request

### Response = response is in JSON

```JSON
{
    "message": "Cohort deleted."
}
```

## Mentorship endpoints

1. `/mentorship` This endpoint should return all mentorships
    - `method`     = GET
    - `INPUT`      = JWT A/MA/M* in header of request

### Response = response is in JSON

```JSON
[
    {
        "id": 1,
        "user": 6,
        "cohort": 1,
        "class": 1,
        "phase": "FOUNDATION",
        "dedication": 50
    },
    {
        "id": 2,
        "user": 7,
        "cohort": 2,
        "class": 1,
        "phase": "ORIENTATION",
        "dedication": 80
    }
]
```

2. `/mentorship/{id}` This endpoint should return specific mentorship
    - `method`     = GET
    - `INPUT`      = JWT A/MA/M* in header of request

### Response = response is in JSON

```JSON
{
    "id": 1,
    "user": 6,
    "cohort": 1,
    "class": 1,
    "phase": "FOUNDATION",
    "status": "ENABLED",
    "startdate": null,
    "enddate": null,
    "dedication": 50
}
```

3. `/mentorship` This endpoint should create new mentorship
    - `method`     = POST
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON` 

```JSON
{
    "user" : "6",
    "cohort" : "2",
    "class" : "1",
    "status" : "ENABLED",
    "phase" : "ORIENTATION",
    "dedication" : "66"
}
```

### Response = response is in JSON

```JSON
{
    "message": "Mentorship created."
}
```

4. `/mentorship/{id}` This endpoint should update specific mentorship
    - `method`     = PUT
    - `INPUT`      = JWT A/MA* in header of request
    - `request body in raw JSON` 

```JSON
{
"dedication" : "100",
"startdate" : "04-04-2022",
"enddate" : "04-10-2022"
}
```

### Response = response is in JSON

```JSON
{
    "message": "Updated."
}
```

5. `/mentorship/{id}` This endpoint should soft-delete specific mentorship
    - `method`     = DELETE
    - `INPUT`      = JWT A/MA* in header of request

### Response = response is in JSON

```JSON
{
    "message": "Mentorship deleted."
}
```

## Dashboard endpoints

1. `/dashboard` This endpoint should return all cohorts, classes and their mentors
    - `method`     = GET
    - `INPUT`      = JWT A/MA* in header of request

### Response = response is in JSON

```JSON
{
    "message": [
        {
            "cohort": "Cool Cohort",
            "class": "Celadon",
            "phase": "FOUNDATION",
            "startDate": null,
            "endDate": null,
            "apprentices": [
                {
                    "id": 1,
                    "username": "Lupen",
                    "fullname": "Lukas Habanec",
                    "email": "L.be@atlas.cz"
                },
                {
                    "id": 3,
                    "username": null,
                    "fullname": "Denis Ergenekon",
                    "email": "d@e.sk"
                }
            ],
            "mentors": [
                {
                    "id": 6,
                    "username": null,
                    "fullname": "Adam Koubek",
                    "email": "a@k.cz",
                    "startDate": null,
                    "endDate": null,
                    "dedication": 50
                }
            ]
        },
        {
            "cohort": "Cool Cohort",
            "class": "Celadon",
            "phase": "FOUNDATION",
            "startDate": null,
            "endDate": null,
            "apprentices": [
                {
                    "id": 1,
                    "username": "Lupen",
                    "fullname": "Lukas Habanec",
                    "email": "L.be@atlas.cz"
                },
                {
                    "id": 3,
                    "username": null,
                    "fullname": "Denis Ergenekon",
                    "email": "d@e.sk"
                }
            ],
            "mentors": [
                {
                    "id": 6,
                    "username": null,
                    "fullname": "Adam Koubek",
                    "email": "a@k.cz",
                    "startDate": null,
                    "endDate": null,
                    "dedication": 50
                }
            ]
        }
    ]
}
```
