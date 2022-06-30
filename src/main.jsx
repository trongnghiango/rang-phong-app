import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'

import {initialState, reducer} from "./reducer"
import { StateProvider } from "./StateProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
   <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
)
