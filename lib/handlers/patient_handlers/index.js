import patients from "../../model/patients"

export function getPatientsHandler(request){
  const { page } = request.query

  const patientList = patients.getPatients({
    number: page ? page.number : null,
    limit: page ? page.limit : null
  })

  let meta;
  let links;
  if(page && page.limit && page.number){

    const totalPages = patients.totalPages({limit: page.limit})

    meta = {
      count: patients.count(),
      totalPages
    },

    links = {
      first: `${request.path}?page%5Bnumber%5D=1&page%5Blimit%5D=${page.limit}`,
      last: `${request.path}?page%5Bnumber%5D=${totalPages}&page%5Blimit%5D=${page.limit}`,
      prev: page.number != 1 ? `${request.path}?page%5Bnumber%5D=${page.number - 1}&page%5Blimit%5D=${page.limit}` : undefined,
      next: page.number < totalPages ? `${request.path}?page%5Bnumber%5D=${page.number + 1}&page%5Blimit%5D=${page.limit}` : undefined
    }
  }

  return {
    data: patientList,
    meta,
    links
  }
}

export function getPatientHandler(request){
  const patient = patients.getPatient(request.params.patientId)
  return {
    data: patient
  }
}