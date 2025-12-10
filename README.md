# Plant Parenthood
Become a better plant parent. Plant Parenthood is a database of over 200+ common indoor houseplants. Sign up to easily track plants you own and have quick access to their care information.

![](http://www.jacquelynmarcella.com/img/plant-parenthood-1.jpg)
![](http://www.jacquelynmarcella.com/img/plant-parenthood-mobile.jpg)

## Requirements
* Build a full stack Node app with at least 2 models.
* Include sign up/log in functionality, with hashed passwords and an authorization flow.
* Incorporate at least one API.
* Have complete RESTful routes with `GET`, `POST`, `PUT`, and `DELETE`.
* Utilize an ORM to create a database table structure and interact with your relationally-stored data.
* Include wireframes designed during the planning process.
* Have semantically clean HTML and CSS.
* Be deployed online and accessible to the public.

## Technologies Used
* Node/Express
  * Key modules:
    * Cheerio - Plant data scraping from 2 different sources
    * Passport / Bcrypt - Authentication and password hashing
    * Cloudinary / Multer - Profile photo uploading through Cloudinary API
* PostgreSQL
* Sequelize
* jQuery
* SASS
* Semantic UI

## User Stories
The target user for this app is the growing number of indoor houseplant enthusiasts. These are not master gardeners, they are people who enjoy adding greenery to their space but may not know all the ins and outs of plant care. 
* As a user, I want to...
  * be able to easily save and keep track of my houseplants and see their care information displayed in a simple, easy to read format (without a ton of jargon). Similarly, I should be able to easily delete plants from my collection.
  * be able to comment on plants and get feedback or suggestions from others on my issues or questions.
  * be easily track when was the last day I checked on my plants (because they might need water!).
  * be able to write a personal journal about adjustments I've made in my plant care routine, or tips I've learned along the way.

## Development Sprints and Process

### Sprint 1

##### 1. Planned out features and functionality
See "Routes and Models" section for final outline of website structure
##### 2. Developed Wireframes
![](/public/img/wireframe-1.png)

![](/public/img/wireframe-2.png)

First round wireframes show the initial vision for plant view and profile pages.
##### 3. Developed Moodboards
![](/public/img/moodboard.jpg)

I researched plant imagery and colors and created a moodboard. This helped identify the colors and mood I would be aiming for in my design.
##### 4. Setup Trello Board
![](/public/img/trello-board.png)

Trello board status as Sprint 3 wraps. Sprints were color coordinated to help see what might be lagging behind.
##### 5. Stubbed out Routes and Set up Models
Got database running with models and associations.
##### 6. Setup Auth
Utilized auth, including hashed passwords and an authorization flow.
##### 7. Scraped Plant Data into Database
Used Cheerio to pull plant care rankings out  of a research table, as well as images from Wikipedia, then inserted into database.

### Sprint 2
##### 1. Built out key pages for all plants, plant detail, and user profile
##### 2. Completed routes with get, post, put, and delete functionality
   * Users can add/delete plants, add/delete comments, and add/delete/edit journal posts

##### 3. Wrote hooks to correct problematic plant data
##### 4. Wrote loops to go through and add tags as needed to plants
##### 5. Integrated repeated content into partials
##### 6. Completed MVP level functionality

### Sprint 3
##### 1. Integrated Cloudinary API so that users could upload profile pictures
##### 2. Added search functionality for plants
##### 3. Integrated Semantic UI, in particular for grids and to allow for a more user-friendly search tool
##### 4. Built out CSS further for subpages

### Sprint 4
##### 1. Made custom responsive navbar with jQuery and CSS as Semantic UI lacks this component.
##### 2. Added sticky back to top icon.
##### 3. Further responsive adjustments.
##### 4. Made better routing for adding/deleting pages from several areas of the site.
##### 5. Rebuilt CSS using SASS.

#### Backlog
  * More dynamic tag and water filtering on page (have a start in my code, but not there yet)
  * Scrub database further, adjust plant names as needed so that they can be better located on Wikipedia
  * Scrape lists of easy houseplants and add to "low maintenance" tag
  * Scrape ASCPA website for cat/dog safety and add "cat-friendly"/"dog-friendly" tags
  * Lazy load functionality for longer pages

## Routes and Models
**Routes**

| CRUD     | Route                | Function                                                         |
|----------|----------------------|------------------------------------------------------------------|
| `GET`    | `/`                  | home page that welcomes user                                     |
| `GET`    |  `/auth/login`       | renders login page                                               |
| `POST`   | `/auth/login`        | signs in existing user                                           |
| `GET`    | `/auth/signup`       | renders sign up page                                             |
| `POST`   | `/auth/signup`       | creates new user in database                                     |
| `GET`    | `/auth/logout`       | logs out user                                                    | 
| `GET`    | `/plants`            | loads full plant database                                        |
| `GET`    | `/plants/:id`        | loads individual plant                                           |
| `POST`   | `/plants`            | associates plant with user in the database                       |
| `DELETE` | `/plants/:id`        | removes association of user and plant in the database            |
| `GET`    | `/plants/search`     | runs a query for the plant based on the user's search input      |
| `GET`    | `/plants/notfound`   | loads 404 page when user searches for a plant that doesn't exist |
| `POST`   | `/comments`          | adds comment to individual plant                                 |
| `DELETE` | `/comments/:id`      | removes comment from individual plant                            |
| `GET`    | `/journal`           | renders full page of all journal entries                         |
| `GET`    | `/journal/new`       | renders page for user to post a new journal entry                |
| `GET`    | `/journal/:id`       | renders page for individual journal entry                        |
| `POST`   | `/journal`           | adds entry to user's journal                                     |
| `GET`    | `/journal/edit/:id`  | renders page for user to edit an existing journal entry          |
| `PUT`    | `/journal/:id`       | edits journal entry in database                                  |
| `DELETE` | `/journal/:id`       | deletes journal entry from database                              |
| `GET`    | `/tags/:id`          | renders all plants for the selected tag                          |
| `GET`    | `/users/profile`     | renders user's profile page when logged in                       |
| `GET`    | `/users/plants`      | renders page with user's full collection of saved plants         |
| `GET`    | `/users/profilepic`  | renders page to update user's profile picture                    |
| `POST`   | `/users/profile`     | uploads user's new profile picture through Cloudinary            |
| `POST`   | `/users/lastwatered` | edits last watered date                                          |

**Models**
(Note: some fields not listed below as they are not currently utilized)

| Model   | Schema                                                                   | Assocations                                    |
|---------|--------------------------------------------------------------------------|------------------------------------------------------------------|
| Comment | content, userId, authorName, plantId, imageUrl                           | Belongs to plants and users                                      |
| Journal | title, content, useId, imageUrl                                          | Belongs to user                                           |
| Plant   | name, botanicalName, light, temperature, humidity, water, soil, imageUrl | Belongs to many users, belongs to many tags, has many comments |
| Tag     | content                                                                  | Belongs to many plants                                         |
| User    | name, email, password, zipcode, userImg, lastWatered                     | Belongs to many plants, has many journals, has many comments   |

## Steps to Setting Up
If you'd like to set this project up on your own local server:
* Fork and clone this repository
* Run `npm install` to install dependencies
  * Use `nodemon` to start your application
* Setup your database (this app already has one existing model)
  * Run `createdb plantparenthood` to create the database
  * Run `sequelize db:migrate` to run migrations
* Create .env file, which will need to include:
  * `SESSION_SECRET` (you determine this)
  * `BASE_URL` (where you will deploy the site)
  * `CLOUDINARY_URL` (from your Cloudinary account)
* Review database setup file
  * Follow directions in `dbSetup.js` to scrape data and add tags

## Sources
* Plant Data
  * Plant Care Rankings - http://extension.uga.edu/publications/detail.html?number=B1318
  * Individual Plant Images - https://www.wikipedia.org/
* Supporting Icons and Imagery
  * Stock Photos - Pexels
    * https://www.pexels.com/photo/summer-branches-leaves-tree-92733/
  * Icons - Noun
    * https://thenounproject.com/term/houseplant/321363/
    * https://thenounproject.com/term/drop/1372766/
    * https://thenounproject.com/term/fog/19882/
    * https://thenounproject.com/term/sun/1241046/
    * https://thenounproject.com/term/temperature/399436
