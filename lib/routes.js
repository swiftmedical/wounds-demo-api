
import Joi from 'joi'
import * as handlers from './handlers'

export const getPatients = {
  method: "GET",
  path: "/patients",
  options: {
    description: "Get a list of patients",
    tags: ["api"],
    validate: {
      query: {
        page: Joi.object().keys({
          number: Joi.number(),
          limit: Joi.number()
        }).description("page object that requires a 'number' and 'limit' field for page number and limit (ex. {'number':1,'limit':10})")
      }
    }
  },
  handler: handlers.getPatientsHandler,
}

export const getPatient = {
  method: "GET",
  path: "/patients/{patientId}",
  options: {
    description: "Get a patient",
    tags: ["api"],
    validate: {
      params: {
        patientId: Joi.string().required().description('the patient id')
      }
    }
  },
  handler: handlers.getPatientHandler
}

export const getPatientWounds = {
  method: "GET",
  path: "/patients/{patientId}/wounds",
  options: {
    description: "Get wounds for a patient",
    tags: ["api"],
    validate: {
      params: {
        patientId: Joi.string().required().description('the patient id'),
      },
      query: {
        page: Joi.object().keys({
          number: Joi.number(),
          limit: Joi.number()
        }).description("page object that requires a 'number' and 'limit' field for page number and limit (ex. {'number':1,'limit':10})")
      }
    }
  },
  handler: handlers.getPatientWoundsHandler
}

export const getWound = {
  method: "GET",
  path: "/wounds/{woundId}",
  options: {
    description: "Get a wound",
    tags: ["api"],
    validate: {
      params: {
        woundId: Joi.string().required().description('the wound id'),
      }
    }
  },
  handler: handlers.getWoundHandler
}

export const patchWound = {
  method: "PATCH",
  path: "/wounds/{woundId}",
  options: {
    description: "Update a wound",
    tags: ["api"],
    validate: {
      params: {
        woundId: Joi.string().required().description('the wound id'),
      },
      payload: {
        data: Joi.object().required().keys({
          type: Joi.string().valid("wounds").required(),
          id: Joi.string().required(),
          attributes: Joi.object().min(1).required().keys({
            type: Joi.string().optional().description("the wound type"),
            bodyLocation: Joi.string().optional().description("the body location"),
            inHouseAcquired: Joi.bool().optional().description("true if wound was acquired in house"),
            resolved: Joi.bool().optional().description("true if wound is resolved"),
            imageUrl: Joi.string().optional().description("image url")
          })
        })
      }
    }
  },
  handler: handlers.patchWoundHandler
}