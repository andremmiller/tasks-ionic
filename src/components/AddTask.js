import React, { useState } from 'react'
import { IonButton, IonDatetime, IonInput, IonItem, IonLabel, IonModal } from "@ionic/react"
import './css/AddTask.css'

export default props => {
    const [task, setTask] = useState({desc: '', date: null, doneAt: null})
    
    const handleTaskInput = (e, isDate = false) => {
        let {name, value} = e.target
        value = isDate ? new Date(value) : value
        setTask({...task, [name]: value})
    }

    return (
        <IonModal showBackdrop={true} isOpen={props.showAddTask} cssClass='addTaskContainer'>
            <div className='addTaskFormContainer'
                onClick={e => e.target.className === 'addTaskFormContainer' ? props.toggleAddTask() : false}>
                <form className='addTaskForm'>
                    <IonItem>
                        <IonLabel position="stacked">Tarefa</IonLabel>
                        <IonInput name="desc" placeholder="Descrição" onIonChange={e => handleTaskInput(e)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Data</IonLabel>
                        <IonDatetime name="date" displayFormat="DD/MM/YYYY" placeholder="Selecione a data" onIonChange={e => handleTaskInput(e, true)} />
                    </IonItem>
                    <div className='addTaskForm__buttonsContainer'>
                        <IonButton onClick={() => props.addTask(task)} color='success'>Adicionar</IonButton>
                        <IonButton onClick={() => props.toggleAddTask()} color='danger'>Cancelar</IonButton>
                    </div>
                </form>
            </div>
        </IonModal>
    )
}