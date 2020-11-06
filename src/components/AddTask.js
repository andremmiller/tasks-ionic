import React from 'react'
import { IonButton, IonModal } from "@ionic/react"
import './css/AddTask.css'

export default props => {

    return (
        <IonModal isOpen={props.showAddTask} cssClass='addTaskContainer'>
            <p>This is modal content</p>
            <IonButton onClick={() => props.toggleAddTask()}>Close Modal</IonButton>
        </IonModal>
    )
}