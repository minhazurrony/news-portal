# How to run locally

- clone this project into your local machine `git clone git@github.com:minhazurrony/news-portal.git`
- make sure docker desktop is installed and running in your machine
- run `docker-compose up` to start the project
- open `http://localhost:3000` in your browser to view the app
- run `docker-compose down` to stop the project

### Deployed version: [News Portal App](https://news-portal-ecru-gamma.vercel.app/)

# Key features

- user can search news by keyword, filter news from different sources, categories and date
- selected category and source will be considered as their news feed category and source
- user will be redirected to actual source website to read full news
- responsive to multiple screens (mobile, tablet, desktop)

# Technology used

- React
- Ant Design
- Axios
- Day.js
- React Query

# Known issues

- there no ui example was provided, that's why i kept ui simple.
- author data is not available for all sources. so i didn't feel it will be great ux to add author filter/preference field.
- i could do date filter from api but the response data is not consistent. so i used only keyword search from api and rest filters are implemented on client side.
- i used filter bar for both search, filter and preference settings.
- pagination is not considered.
