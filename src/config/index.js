import { loadJSON } from '../utils/fetch'
import networks from './networks.json'
import nodes from './nodes.json'
import logger from '../utils/log'

const log = logger.create('config')

const BUNDLES = { networks, nodes }

const CACHE = {}

/**
 * Load config file
 *
 * This will first attempt to download the latest version from the project
 * Github repo. If fails or not found then it will use the bundled version.
 *
 * Results from this are cached, so that the next call finishes quicker.
 *
 * @param  {String} fileName name of config file
 * @return {Promise}
 */
exports.load = async fileName => {
  log.info(`Load config: ${fileName}`)

  if (CACHE[fileName]) {
    log.trace(`Returning cached config: ${fileName}`)

    return CACHE[fileName]
  }

  try {
    // download first
    const json = await loadJSON(
      `https://raw.githubusercontent.com/meth-project/meth-browser/master/src/config/${fileName}.json`
    )

    log.debug(`Returning web config: ${fileName}`)

    CACHE[fileName] = json
  } catch (e1) {
    if (!BUNDLES[fileName]) {
      throw new Error(`Unable to load bundled config: ${fileName}`)
    }

    log.debug(`Returning bundled config: ${fileName}`)

    CACHE[fileName] = BUNDLES[fileName]
  }

  return CACHE[fileName]
}
