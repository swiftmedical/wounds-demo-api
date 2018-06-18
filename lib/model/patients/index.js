import faker from "faker";
import { config } from "../config"

// Create patients
let patients = [];

for(let i=0; i<config.numPatients; i++){
  patients.push(
    {
      id: i+1,
      type: "patients",
      attributes: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(90),
        address: faker.address.streetAddress(),
        roomNumber: faker.random.number(50),
        bedNumber: faker.random.number(8),
        avatarUrl: faker.image.avatar(),
        updatedAt: faker.date.past(10)
      },
      relationships: {
        wounds: {
            links: {
              related: `http://0.0.0.0:3000/patients/${i+1}/wounds`
            }
        }
      }
    }
  )
}

/**
 * Get the total number of pages
 * @param {number} limit page limit
 * @return {number} the total number of pages
 */
export function totalPages({limit}){
  return Math.ceil(patients.length/limit)
}

export function count(){
  return patients.length
}

/**
 * Get patients between 
 * @param {Number} number number of pages
 * @param {Number} limit page limit
 * @return {Array} list of patients
 */
export function getPatients({number, limit}){
  let filteredPatients = patients;
  if(number && limit){
    const start = (number-1)*limit
    const end = number*limit
    filteredPatients = patients.slice(start, end)
  } 

  return filteredPatients
}

/**
 * Get a patient for id
 * @param {String} id patient id
 * @return {Object} the patient
 */
export function getPatient(id){
  return patients.find(p => p.id == id)
}

export default {
  totalPages,
  count,
  getPatients,
  getPatient
}