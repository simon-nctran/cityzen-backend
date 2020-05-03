## Cityzen

### Deliverable 2 Questions:

**5.** Send a GET request to the server with the following HTTP Header elements:
* Host: `https://cityzen-app.herokuapp.com`
* Path: `/about/`
The app returns the HTML About page for our app with details about the authors and how the app can be used. 

**6.** Send a GET request to the server with the following HTTP Header elements:
* Host: `https://cityzen-app.herokuapp.com`
* Path: `/places/`
The app will return a JSON Array of all places.
Send a GET request to the server with the following HTTP Header elements:
* Host: `https://cityzen-app.herokuapp.com`
* Path: `/places/:tag`
The app will return a JSON Array of all places filtered by tag. Tags available are: food, clothing, petrol, and toilet.
This functionality shows the dummy places we currently maintained in our mock database, which could be supported by a mapping service later on.

**7.** To add a new user, send a POST request to the server containing the following HTTP Header elements:
* Host: `https://cityzen-app.herokuapp.com`
* Path: `/users/`
Content-Type: `application/json`
And a Body containing a JSON Object with the following structure:
    ```JSON
    {
        “username”: “a_unique_username”,
        “birthYear”: “any_year”,
        “miscInfo”: “any_string”
    }
    ```
    The body should not contain anything else. 
If the given username is unique (i.e. not currently in the memory of the Heroku server) then JSON Object will get added to an array of Users. This new list of Users will be sent back as a response. If the given username is not unique (i.e. already in the memory of the Heroku server), then the string “username already exists” will be sent back as a response.
Send a GET request to the server with the following HTTP Header elements:
* Host: `https://cityzen-app.herokuapp.com`
* Path: `/users/`
The app will return a JSON Array of all the users within the app. 
Send a GET request with an additional parameter to the HTTP Header, 
* Host: `https://cityzen-app.herokuapp.com`
* Path: `/users/:username`
The app will return the information of the user with a matching username, else it will return an empty list `[]`.
The username of the initial user on the server is `unimelb` and can be retrieved with the following path, `/users/unimelb`.



### Requirements:
###### (to run the website locally)

- npm: [https://github.com/npm/cli](https://github.com/npm/cli)

### Usage:
###### (to run the website locally)
clone this repo:

```bash
> git clone https://github.com/simon-nctran/cityzen.git
```

The website depends on the node modules specified in`package.json`. To install the node modules run this command:

```bash
> npm install
```

To run the website locally:

```bash
> npm start
or
> node app.js
```

To verify that it is running, open a web browser to:

```
localhost:3000
```
