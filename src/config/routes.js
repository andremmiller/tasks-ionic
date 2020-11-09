import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import Tasks from '../pages/Tasks'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UserContext from '../context/UserContext'

export default props => {
    const { state } = useContext(UserContext)  
    const user = state.user

    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <ProtectedRoute path="/tasks" component={Tasks} user={user} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect exact from="/" to="/tasks" />
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route {...rest} render={props => user ? 
                    <Component {...rest} {...props} /> :
                    <Redirect to={{pathname: '/login'}} />
        }
        />
    )
}