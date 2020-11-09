import React from 'react'
import { IonContent, IonItem, IonList, IonMenu } from "@ionic/react"
import { Link } from 'react-router-dom'
import Gravatar from 'react-gravatar'
import './css/Menu.css'
import { auth } from '../firebase'

export default props => {
    return (
        <IonMenu side="start" menuId="mainMenu" contentId="content" className="mainMenu"> 
            <IonContent>
                <div className="userInfoMenu">
                    <Gravatar email={props.user.email} />
                    <p>{props.user.email}</p>
                    <p onClick={() => {
                            auth.signOut()
                            window.location.reload()
                    }}>
                        Logout
                    </p>
                </div>
                <IonList>
                    <Link className={`menuItem`} to={{pathname: '/tasks', state: {title: 'Hoje', daysAhead: 0} }}>
                        <IonItem>Hoje</IonItem>
                    </Link>
                    <Link className={`menuItem`} to={{pathname: '/tasks', state: {title: 'Amanhã', daysAhead: 1} }}>
                        <IonItem>Amanhã</IonItem>
                    </Link>
                    <Link className={`menuItem`} to={{pathname: '/tasks', state: {title: 'Semana', daysAhead: 7} }}>
                        <IonItem>Semana</IonItem>
                    </Link>
                    <Link className={`menuItem`} to={{pathname: '/tasks', state: {title: 'Mês', daysAhead: 30} }}>
                        <IonItem>Mês</IonItem>
                    </Link>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}