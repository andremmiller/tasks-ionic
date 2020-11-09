import React, { createContext, useEffect, useReducer } from 'react'
import { auth } from '../firebase'

const initialState = { 
    user: null 
}
const UserContext = createContext({})

const actions = {
    setUser(state, action) {
        const user = action.payload
        return {
            ...state,
            user: user
        }
    }
}

export const UserProvider = props => {
    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if(user) {
                actions.setUser(initialState, {payload: user})
            } else {
                actions.setUser(initialState, {payload: null})
            }
        })
    }, [])

    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={{
            state,
            dispatch
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext