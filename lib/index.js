import pkg from "../package.json"

// Hapi
import Hapi from "hapi"

// Routes
import * as routes from './routes'

// Plugins
import hapiQs from "hapi-qs"
import inert from "inert"
import vision from "vision"
import HapiSwagger from "hapi-swagger"

// -------------------------- Server Config -------------------------- //

const server = Hapi.server({
    host: '0.0.0.0',
    port: 3000
})

// -------------------------- Routing -------------------------- //

Object.values(routes)
  .forEach(route => {
    server.route(route)
  })

// -------------------------- Configure and Start -------------------------- //

async function init() {

  const swaggerPlugin = {
    plugin: HapiSwagger,
    options: {
      info: {
        title: "Wounds Demo API",
        version: pkg.version
      },
      jsonEditor: true
    }
  }

  try {
    await server.register([hapiQs, inert, vision, swaggerPlugin])
    await server.start();
    console.log('Server running at:', server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  } 
}

init()