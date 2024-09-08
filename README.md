# NETFLIX clone

- Create React app 
- Configure Tailwindcss
- Routing
- Header (Logo Added)
- Login Form => 
- Sign up Form
  For lengthy forms with lots off validation FORMIK lib preferred.
  Other libs like Redux Form is overhead(Data is client side, minifined bundle size, and EVERY SINGLE KEYSTROKE will call redux reducers multiple time)
- Form Validation
- useRef Hook 
- Firebase setup
- CI/CD setup with firebase so deploy code once it merge with main
- Redux setup Created user slice and app store 
- Signin/singout displayed in header
- use of selector and slice to share/update data between components
- TMDB API setup for displaying movie details and youtube embeded for background movie trailer.
- Created movie slice for sharing movie data.

# Features
- Non- loggedin
    - SingIn / Singup Form
    - redirect to Browse Page
- Browse (loggedIn)
    - Header
    - Main movie
        - Trailer in Background
        - Title & Description
        - MoviewSiggestions
            - MovieList * n
- NetflixGpt
    - Search Bar
    - Movie Suggestions
