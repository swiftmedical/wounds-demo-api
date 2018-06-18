import faker from "faker"
import moment from "moment"
import { config } from "../config"

// Values
const woundTypes = [
  "Abrasion",
  "Arterial",
  "Blister",
  "Bruise",
  "Burn",
  "Cancer Lesion",
  "Diabetic",
  "Laceration",
  "Moisture Associated Skin Damage",
  "Open Lesion",
  "Pressure",
  "Rash",
  "Skin Tear",
  "Surgical",
  "Venous"
]

const bodyLocations = [
  "Head",
  "Face",
  "Neck",
  "Shoulder",
  "Back",
  "Buttocks",
  "Chest",
  "Hips",
  "Groin",
  "Arm",
  "Elbow",
  "Forearm",
  "Hand",
  "Leg",
  "Knee",
  "Lower Leg",
  "Ankle",
  "Foot"
]

const imageUrls = [
  "https://cdn.pixabay.com/photo/2014/10/05/02/13/hand-474278_1280.jpg",
  "https://cdn.pixabay.com/photo/2013/04/22/01/13/wound-106374_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/10/05/02/15/hand-474279_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/05/25/19/22/mistake-2344150_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/03/05/19/13/accident-1238326_960_720.jpg",
  "https://images.freeimages.com/images/large-previews/1e5/injured-2-1245415.jpg",
  "https://images.freeimages.com/images/large-previews/568/wounded-1325741.jpg",
  "https://images.freeimages.com/images/large-previews/3e6/blood-1312378.jpg"
]

// Create wounds
let wounds = []
let counter = 1;

for(let i=0; i<config.numPatients; i++){
  
  const numWounds = faker.random.number({
    min: config.minWoundsPerPatient, 
    max: config.maxWoundsPerPatient
  });

  // start here - make sure wounds have everything they need
  // add an endpoint for PUTing to wounds
  for(let j=0; j<numWounds; j++){

    const date = faker.date.past(10);

    wounds.push({
      type: "wounds",
      id: counter,
      attributes: {
        patientId: i+1,
        type: faker.random.arrayElement(woundTypes),
        bodyLocation: faker.random.arrayElement(bodyLocations),
        inHouseAcquired: faker.random.boolean(),
        resolved: faker.random.boolean(),
        imageUrl: faker.random.arrayElement(imageUrls),
        createdAt: date,
        updatedAt: date
      }
    })

    counter ++;
  }
}

/**
 * Get the total number of pages
 * @param {Number} limit 
 * @return {Number} the total number of pages
 */
export function totalPages({limit, patientId}){

  let filteredWounds = wounds
  
  if(patientId) {
    filteredWounds = filteredWounds.filter(w => w.attributes.patientId == patientId)
  }

  return Math.ceil(filteredWounds.length/limit);
}

/**
 * Get the count of number of wounds
 * @param {String} patientId 
 * @return {Number} The count
 */
export function count({patientId}){
  let filteredWounds = wounds
  
  if(patientId) {
    filteredWounds = filteredWounds.filter(w => w.attributes.patientId == patientId)
  }

  return filteredWounds.length
}

/**
 * Get wounds
 * @param {Number} number the number of pages
 * @param {Number} limit the page limit
 * @param {String} patientId the patient id for filtering
 * @return {Array} list of wounds
 */
export function getWounds({number, limit, patientId}){
  
  let filteredWounds = wounds

  if(patientId) {
    filteredWounds = filteredWounds.filter(w => w.attributes.patientId == patientId)
  }

  if(number && limit){
    const start = (number-1)*limit
    const end = number*limit
    return filteredWounds.slice(start, end)
  } else {
    return filteredWounds
  }
}

/**
 * Get a patient for id
 * @param {String} id 
 */
export function getWound(id){
  return wounds.find(p => p.id == id)
}

/**
 * Patch a wound
 * @param {Object} wound 
 */
export function patchWound(wound){
  const index = wounds.findIndex(w => {
    return w.id == wound.id
  })

  const attributes = {
    ...wounds[index].attributes,
    ...wound.attributes,
    updatedAt: moment().toISOString()
  }

  wounds[index] = {
    ...wounds[index],
    attributes
  }

  return wounds[index]
}

export default {
  totalPages,
  count,
  getWounds,
  getWound,
  patchWound
}