module.exports = {
  STATUS: {
    ERROR: 'error',
    PREPARE: 'prepare',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    LOADING: 'LOADING',
    LOADED: 'LOADED',
  },
  BACKEND_TASKS: {
    INIT: 'backend-init',
    SET_WINDOW_ID: 'backend-set-window-id',
    CONNECT_TO_NODE: 'backend-connect-to-node',
  },
  IPC: {
    BACKEND_TASK: 'backend-task',
    UI_RELOAD: 'ui-reload',
    UI_TASK_NOTIFY: 'ui-task-notify',
  },
  ERROR: {
    METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
    METHOD_CALL_ERROR: 'METHOD_CALL_ERROR',
    REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
    UNABLE_TO_CONNECT: 'UNABLE_TO_CONNECT',
    CORRUPT_DATA: 'CORRUPT_DATA',
  },
}
