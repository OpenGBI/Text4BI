<<<<<<< HEAD
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { systemReducer } from './reducer/systemReducer';
import { GlobalSettingReducer } from './reducer/globalReducer';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { ErrorMiddleware } from './middlewares/errorMiddleware';

const rootReducer = combineReducers({
	system: systemReducer,
	globalSetting: GlobalSettingReducer,
});
export type AppState = ReturnType<typeof rootReducer>;

const MiddlewareEnhancer = applyMiddleware(loggerMiddleware, ErrorMiddleware);

export const store = createStore(rootReducer, MiddlewareEnhancer);
=======
import { createStore,combineReducers, applyMiddleware } from "redux";
import { systemReducer } from "./reducer/systemReducer";
import { GlobalSettingReducer } from "./reducer/globalReducer";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { ErrorMiddleware } from "./middlewares/errorMiddleware";

const rootReducer = combineReducers(
    {
        system:systemReducer,
        globalSetting:GlobalSettingReducer

    }
)
export type AppState = ReturnType<typeof rootReducer>

const MiddlewareEnhancer = applyMiddleware(loggerMiddleware, ErrorMiddleware)

export const store = createStore(rootReducer, MiddlewareEnhancer)

>>>>>>> cfbc02f314e6d3f8d31d7819ca4913ebee1825d6
