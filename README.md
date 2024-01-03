
# Cemetery Communication Hub    

Welcome to the Cemetery Hub! A handy site for volunteers to stay up to date with the news and activities happening at Highgate Cemetery, read or post messages on our board and keep track of your to do list without the hassle of keeping track of emails or notifications.

Sign up and log in easily with your email address, and navigate to your personal task list or the message board with the buttons on the navbar. You can add and keep track of your tasks with the create task form, and add messages for everyone to see on the board.

Only registered users are able to see the messages you post.

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm i
```
You will need a .env file with the following keys:
```bash
DB_PWD=<your postgres password>
SALT=<your salt>
```


Start the server

```bash
  npm run dev
```

You can view the project on http://localhost:5173/
## Tech Stack

**Client:** React, SCSS

**Server:** Node, Express

**Database:** PostgreSQL


## Running Tests

Unit tests incoming, this app has been tested with Postman



## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

The main thing I wanted to achieve with this project was to gain programming knowledge that doesn't depend on libraries, to get a better understanding on how the different elements fit together.

It is still an ongoing project, but in the future I would like to implement better testing, and possibly stick to Test Driven Development.