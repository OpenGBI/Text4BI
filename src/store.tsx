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

