import { Middleware } from 'redux'

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('dispatching', action)
  return next(action)
}
export { loggerMiddleware }
