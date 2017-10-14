import EventEmitter from 'eventemitter3'

import { IPC, UI_TASKS } from '../../common/constants'
import logger from '../utils/log'

const log = logger.create('config')

export default UI_TASKS

class GlobalEvents extends EventEmitter {}
export const globalEvents = new GlobalEvents()

window.addEventListener(IPC.UI_TASK, ({ task, data }) => {
  log.debug('Recieved UI task IPC command', task)

  globalEvents.emit(task, data)
})
