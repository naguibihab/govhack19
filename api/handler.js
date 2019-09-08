'use strict';

// import byArea from './ivi-skill-level.js';
const request = require('request')

const byArea =   [{
  Level:	3,
  ANZSCO_CODE:	12,
  // Title:	"Farmers and farm managers",
  Title:	"Farm",
  State: "NSW",
  19: {
    Jan: 128.633,
    Feb: 130.827,
    Mar: 132.737,
    Apr: 134.384,
    May: 135.711,
    Jun: 136.702,
    Jul: 137.449
  }
}]

module.exports.hello = async (event, context) => {

  const inputs = {
    areas: ['NSW'],
    eduLevel: 'Highschool' ,
    // path: 
  }

  let jobs = []

  console.log('1. GET ALL JOBS THAT MATCH AREA');
  jobs = filterByArea(inputs,byArea);
  console.log('jobs after filter 1', jobs)

  console.log('2 ADD PROSPECTS')
  jobs = addProspects(jobs)
  console.log('jobs after filter 2', jobs)

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Go Serverless v1.0! Your function executed successfully!',
  //     input: event,
  //   }),
  // };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

function filterByArea(inputs, dataset) {
  let found = [];
  inputs.areas.forEach((toFind) => {
    dataset.forEach((element) => {
      if(toFind == element.State) {
        found.push(element);
      }
    })
  })
  return found;
}

async function addProspects(jobs) {
  const api = 'https://data.gov.au/data/api/3/action/datastore_search?resource_id=bfa7ef04-e9f2-46ff-a959-84f005dfd17b&q='
  let found = [];
  jobs.forEach(async (job, index) => {
    await request(api+job.Title, (error, resp, body) => {
      console.log('error: ', error);
      console.log('body', body);
      jobs[index].
    })
  })
}

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });