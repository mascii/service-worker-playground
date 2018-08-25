import ServiceWorker from '../lib/service_worker'
import RoboHash from './robohash'

new ServiceWorker('./worker-compiled.js', { scope: './' })
  .catch(message => alert(message))

RoboHash.generateImages(document.querySelector('#content'))
