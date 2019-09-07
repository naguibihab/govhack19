'use strict';

// import byArea from './ivi-skill-level.js';

const byArea =   [{
  Level:	3,
  ANZSCO_CODE:	12,
  Title:	"Farmers and farm managers",
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

  console.log('filtering by area');
  jobs = filterByArea(inputs,byArea);
  console.log('jobs after filter 1', jobs)

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
