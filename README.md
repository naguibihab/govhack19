# Workpaths Australia

## Project description
Our motto is “Helping Australian’s to find appropriate and fulfilling work based on FACTS”
All Australian’s deserve fulfilling and well paid vocations. 
It is also in our national interest for people to fill vacant jobs that are available and prepare for future demand. Excitingly, this might include people starting businesses.
A well paid workforce contributes to financially to the country in the form of increased taxes and to their community in terms of supporting not-for-profit community activities.

## Data story
In the first stages of our analysis we identified a number of persona who may need additional informational support from the government in this area:
* People reentering the workforce after a career break, for example parents
* Career change - people unhappy with their present work
* Students who are unsure of their current choices
* Older people who still need to work but may not be able to do so in their chosen profession
* People who are unemployed but keen to work
We made a number of other key decisions after considering our target market:
* we would optimise for a mobile web experience, particularly phones
* we would assume that discovery of our service was key, and would optimise for entry from search (eg google), Direct marketing (eg email) and social media posts and have dedicated “landing pages” for each persona
* we would ask as few questions as possible before offering a small number of initial suggestions
* we would offer two types of suggestions : starting a small business and career options
* we would need an API to make recommendations based on the type of persona and the questions asked that uses government data from the ATO, State Governments and Department of Employment, Skills, Small and Family Business.

After some early data discovery using data.gov.au and data.nsw.gov.au and doing early conceptual design we discovered that some existing sites that supplied some similar services to our idea, such as https://joboutlook.gov.au/ (Department of Employment, Skills, Small and Family Business) and https://www.myskills.gov.au/courses/search/ (ditto).

At this point we pivoted to enhancing existing services to eliminate duplicated effort. In particular we decided we would suggest an additional feature “section” for https://joboutlook.gov.au/ - /WorkPaths - that would be optimised to provide a quick and simple gateway to the services of this site via tailored recommendations that allowed “explore more” from the main site as well as https://www.business.gov.au/guide/starting (starting a small business).

The API we have prototyped would utilize the following data sources is fully realised:
* https://data.gov.au/data/dataset/taxation-statistics-2016-17/resource/bfa7ef04-e9f2-46ff-a959-84f005dfd17b - Sheet 7E to locate jobs to areas
* http://lmip.gov.au/default.aspx?LMIP/GainInsights/VacancyReport to locate unfilled demand
* https://www.myskills.gov.au/courses/search/ to locate training in locations (NB need to be “scraped” at present) (we examined https://training.gov.au/Search/Training but found its output less useful)

In summary proposed user journey is:
Search term, link in email or social media post leads directly to “persona page” on https://joboutlook.gov.au/WorkPaths
Ask a few simple questions - would you live somewhere else for work ? Where do you prefer to live ? Educational Level ? 
Call API to get recommendations
Present recommendations, and links to both detailed profession pages on https://joboutlook.gov.au/ , and explore more links to https://joboutlook.gov.au/ and https://www.business.gov.au/guide/starting

# API
In the API folder you will find a working sample that looks for jobs in four different datasets based on the location of the user.

Note: The data in the api is a subset of the dataset and is used to test the logic.

To see the API in action run the script /api/request.sh

# Design
In the Design folder you will find all of our design assets including Customer Insights & Journey map along with other photos

# Datasets
In the Datasets folder you will find the datasets that we have used in this project for both the API and the Conecpt

# Video
In the Video folder you will find the video submitted by the team