Backend:
- APIs
- store data

Frontend:
- User interface components
- interact with APIs

------------------------- backend

#1 create python virtual env - py -m venv env
#2 activate virtual env - env/Scripts/activate
#3 install dependencies by creating requirement.txt file

Here’s a quick rundown of what each of those Python packages does and why you’d include it in a Django-REST project:

asgiref
What it is: The “ASGI reference” library—implements the ASGI (Asynchronous Server Gateway Interface) spec.
Why you need it: Powers Django’s async support (e.g. async def views, WebSockets). It provides utilities like async_to_sync and the base server interface.

Django
What it is: A batteries-included, high-level web framework for Python.
Why you need it: Gives you URL routing, ORM, authentication, admin UI, templating, and so much more—so you don’t build basic web plumbing from scratch.

django-cors-headers
What it is: A middleware app for handling Cross-Origin Resource Sharing (CORS) in Django.
Why you need it: If your frontend (e.g. React) lives on a different domain/port than your API, CORS headers let browsers call your API without blocking.

djangorestframework
What it is: Django REST Framework (DRF)—a toolkit for building Web APIs on top of Django.
Why you need it: Provides serializers, viewsets, routers, browsable API, authentication hooks, throttling, and more to rapidly create RESTful endpoints.

djangorestframework-simplejwt
What it is: A “plug-and-play” JWT authentication plugin for DRF.
Why you need it: Implements access- and refresh-token workflows using JSON Web Tokens, with built-in views for obtaining/refreshing tokens.

PyJWT
What it is: A pure-Python library for encoding and decoding JSON Web Tokens (JWT).
Why you need it: Under the hood, both djangorestframework-simplejwt (and other JWT tools) use PyJWT to sign and verify token payloads.

pytz
What it is: World-wide timezone definitions for Python datetime objects.
Why you need it: Ensures your app can handle timezone-aware dates/times correctly (Django uses it for its USE_TZ support).

sqlparse
What it is: A non-validating SQL parser and formatter.
Why you need it: Django’s SQL-formatting commands (e.g. sqlmigrate, debug prints) rely on it to pretty-print and analyze SQL.

psycopg2-binary
What it is: The PostgreSQL database adapter for Python, bundled as a pre-compiled “binary” wheel.
Why you need it: If you’re using PostgreSQL as your Django database backend, this package lets Django talk to Postgres.

python-dotenv
What it is: A utility to load environment variables from a .env file into os.environ.
Why you need it: Keeps secrets (API keys, DB URLs, Django SECRET_KEY) out of your code and settings files—just put them in .env and let python-dotenv load them at startup.

Putting it together:
Core framework: Django, asgiref, pytz, sqlparse
API layer: djangorestframework, djangorestframework-simplejwt, PyJWT, django-cors-headers
Database: psycopg2-binary (for Postgres)
Configuration: python-dotenv

#4 install requirements - pip install -r requirements.txt
#5 startup a django project - django-admin startproject backend
#6 go to ./backend
#7 create single app inside - py manage.py startup api
#8 go to settings.py, modifications applied to it with comments
#9 move requirements.txt to ./backend
#10 defining what is JWT(JSON web token) tokens
- will act as the permissions or authentication everytime we access a website
- access token is to request
- refresh token is to refresh the access token

#11 create serializers.py
- django uses ORM (Object related mapping)

#12 go to views.py to create new user
#13 go to backend/URLs.py
#14 check if you've made migrations on our database - py manage.py makemigrations - this is the process
#15 make provision the database to ensure it has the right set up - py manage.py migrate
#16 run the application - py manage.py runserver

create user then playaround on the access and refresh token
#17 stop the server and go to ./api/models.py make some code about Note
#18 go to ./api/serializers.py make some code about Note
#19 go to ./api/views.py make some code about Note (creation and deletion)
#20 create a new file in api folder named urls.py

create urlpatterns for creating and deleting Note

#21 go to ./backend/urls.py include api.urls
#22 run a makemigrations to check neeed to migrate
#23 migrate changes
#24 run server


------------------------- frontend
#25 npm create vite@latest frontend -- --template react
#26 go to frontend directory
#27 npm install axios react-router-dom jwt-decode
#28 delete App.css and index.css in ./frontend/src
#29 delete the body and import of App.jsx
#30 import react in App.jsx
#31 delete index.css in main.jsx
#32 make directory: styles, pages, components
#33 make constants.js and api.js
#34 make .env file in ./frontend
#35 compose code in constants.js
#36 compose code interceptor in api.js
#37 put VITE_API_URL='http://localhost:8000' in .env
#38 going back to api.js and type api.interceptors.request.use(...)

writing protected routes

#39 create ProtectedRoutes.js and go there, set function ProtectedRoutes then set variables for refreshtoken and auth
#40 import useEffect

analyze the whole ProtectedRoutes.js

#41 make pages in ./src/pages then make the home, login, notfound, register
#42 set up each
function Home() {
    return <div>Home</div>
}

export default Home

#43 got to App.jsx to make the navigation to diff pages
#44 set up logout
#45 set up register with logout
#46 set up function App
#47 npm install -> npm run dev

check it out

#48 design not found page
#49 create Form.jsx in ./components
#50 make a generic form - code in Form.jsx
#51 add styling on the Form.jsx by adding Form.css in ./styles
#52 connect Form from components to Login and Register pages
#53 do some code on Login and Regiser (.jsx)
#54 run: npm run dev - check if both login and register page workflows
#55 run: py manage.py runserver on the backend - copy the server endpoint and paste it on the .env
#56 restart the npm run dev
#57 test the web app on register and login pages

learning:
remember that it avoids username and password duplication so it recieves AxiosError: Request failed with status code 400 in registration in the registration pages

#58 building the home page
#59 code on the Home.jsx

-test the empty nodes using console log
-learn about api connections from backend to frontend
-crud on Home.jsx

#60 build Home.jsx html
#61 create Note.jsx on ./frontend/components
#62 coding in Note.jsx
#63 on the Home.jsx, modify the Notes part in html
#64 then import note from ../components.Note
#65 create css for home, note, and loading indicator
#66 create new component on ./frontend/components called LoadingIndicator.jsx
#67 go back to Form.jsx then in between:

<input
    className="form-input"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
/>
xxxxx--here--xxxxxxx
<button className="form-button" type="submit">
    {name}
</button>

put the loading indicator. make sure to import it


---------- database

#68 create db in , wait for it to complete creating
#69 create .env on ./backend where you will set up necessary variables
#70 go to ./backend/backend/settings.py, locate DATABASES={...} and apply some codes
#71 save it, stop the backend, then run py manage.py migrate
#72 once everything is OK, run py manage.py runserver

------------ deployment configuration with git

#73 create .gitignore on root folder
#74 type env/
#75 go to ./frontend locate .ignore then add .env
#76 go to ./backend create .gitignore,  then add .env and db
#77 go to ./backend create .choreo
#78 inside .choreo create endpoints.yaml then apply some codes
#79 create Profile on ./backend - command to start executing our application - then apply necessary configs
#80 run git init