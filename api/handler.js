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
  jobs = await addProspects(jobs)
  console.log('jobs after filter 2', jobs)

  console.log('3 ADD SKILLS')
  jobs = getSkills(jobs)
  console.log('jobs after filter 3', jobs)

  console.log('4 ADD TRAINING')
  jobs = getTraining(jobs)
  console.log('jobs after filter 4', jobs)


  return {
    statusCode: 200,
    body: JSON.stringify({
      message: jobs,
      input: event,
    }),
  };

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

function getTraining(jobs) {
  const api = 'https://training.gov.au/Search/Training?SearchTitleOrCode={JOB}&IncludeSupersededData=true&IncludeSupersededData=false&IncludeDeletedData=true&IncludeDeletedData=false&TypeAllTrainingComponents=true&TypeAllTrainingComponents=false&TypeTrainingPackages=true&TypeTrainingPackages=false&TypeQualifications=true&TypeQualifications=false&TypeAccreditedCourses=true&TypeAccreditedCourses=false&TypeModule=true&TypeModule=false&TypeUnitsOfCompetency=true&TypeUnitsOfCompetency=false&TypeSkillSets=true&TypeSkillSets=false&nrtSearchSubmit=Search&AdvancedSearch=False&JavaScriptEnabled=true&educationLevel=-99&TaxonomyOccupation=&TaxonomyIndustrySector=&recognisedby=-99'

  jobs.forEach(async (job, i) => {
    job.training = api.replace('{JOB}', job.Title);
    jobs[i] = job
  });

  return jobs
}

function getSkills(jobs) {
  const api = 'https://www.myskills.gov.au/courses/search/?keywords={JOB}&locationID=0&Distance=25&rtoCode=&campusId=0'

  jobs.forEach(async (job, i) => {
    job.skill = api.replace('{JOB}', job.Title);
    jobs[i] = job
  });

  return jobs
}


async function addProspects(jobs) {
  return new Promise(async (resolve,reject) => {
    const api = 'https://data.gov.au/data/api/3/action/datastore_search?resource_id=bfa7ef04-e9f2-46ff-a959-84f005dfd17b&q='

    let promises = [];
  
    jobs.forEach((job, i) => {
      promises.push(
        new Promise((res, rej) => {
          request(api+job.Title, (e, r, b) => {
            // console.log("REACH request")
            if(e) {
              console.log('error from api', e)
            }
            const bjson = JSON.parse(b);
            // console.log("REACH request 02", bjson.result)
            if(bjson.result){
              // console.log("REACH request 03", bjson.result.records)
              job.prospects = bjson.result.records
              jobs[i] = job 
              // console.log("REACH request 04")
              resolve(jobs)
            } else {
              // console.log('no prospects', bjson)
              reject()
            }
          })
        })
      )
    })
  
    // console.log('REACH', jobs)
  
    await Promise.all(promises)
    // console.log("REACH 01")
    resolve(jobs)
  })
}