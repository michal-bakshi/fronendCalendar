import { combineReducers, createStore } from "redux"
import {userReducer} from './reducer/userReducer.js'
import {dateReducer} from './reducer/dateReducer.js'

const rootStore=combineReducers({
  users:userReducer,
   dates:dateReducer
  })
export const store=createStore(rootStore);

window.store=store