import wounds from "../../model/wounds";

export function getPatientWoundsHandler(request){
  const { page } = request.query
  const { patientId } = request.params
  
  const woundList = wounds.getWounds({
    number: page ? page.number : null,
    limit: page ? page.limit : null,
    patientId
  })

  let meta;
  let links;
  if(page && page.limit && page.number){

    const totalPages = wounds.totalPages({
      limit: page.limit, 
      number: page.number, 
      patientId
    })

    meta = {
      count: wounds.count({patientId}),
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
    data: woundList,
    meta,
    links
  }
}

export function getWoundHandler(request){
  return wounds.getWound(request.params.woundId)
}

export function patchWoundHandler(request){
  const wound = request.payload.data
  return wounds.patchWound(wound)
}