import { IonContent, IonIcon, IonList, IonLoading, IonPage } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import './css/Tasks.css'
import { db } from '../firebase'
import Task from '../components/Task'
import { eye, eyeOff, addCircle, menuOutline } from 'ionicons/icons'
import AddTask from '../components/AddTask'
import moment from 'moment'
import Menu from '../components/Menu'
import { menuController } from '@ionic/core'
import UserContext from '../context/UserContext'

export default props => {
    const [tasks, setTasks] = useState([])
    const [showDone, setShowDone] = useState(false)
    const [showAddTask, setShowAddTask] = useState(false)
    const [busy, setBusy] = useState(false)
    const {state} = useContext(UserContext)
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    useEffect(() => {
        loadTasks()
    }, [])

    useEffect(() => {
        menuController.close()
        loadTasks()
        console.log(state.user.uid)
    }, [props.location.state])

    const loadTasks = async () => {
        const maxDate = moment().add({days: props.history.location.state.daysAhead}).toDate()
        setBusy(true)
        const dbTasks = await db.collection('tasks')
                                .where('date', '<=', maxDate)
                                .where('user_id', '==', state.user.uid)
                                .get()
        const dbTasksNoDate = await db.collection('tasks')
                                    .where('date', '==', null)
                                    .where('user_id', '==', state.user.uid)
                                    .get()
        setTasks(dbTasks.docs.map(dbTask => dbTask.data())
                .concat(dbTasksNoDate.docs.map(dbTask => dbTask.data())))
        setBusy(false)
    }

    const toggleShowDone = () => setShowDone(!showDone)
    const toggleAddTask = () => setShowAddTask(!showAddTask)

    const toggleDone = async (taskId) => {
        setBusy(true)
        const dbTasks = await db.collection('tasks').where('id', '==', taskId).get()

        if (dbTasks.docs.length) {
            const dbTask = dbTasks.docs[0]
            const newDoneAt = dbTask.data().doneAt ? null : new Date()
            await dbTask.ref.update({ doneAt: newDoneAt })

            loadTasks()
        }
        setBusy(false)
    }

    const getBackgroundImageClass = () => {
        switch(props.history.location.state.daysAhead) {
            case 0: return 'todayImage'
            case 1: return 'tomorrowImage'
            case 7: return 'weekImage'
            case 30: return 'monthImage'
            default: return 'monthImage'
        }
    }

    const getIconColorClass = () => {
        switch(props.history.location.state.daysAhead) {
            case 0: return 'todayIcon'
            case 1: return 'tomorrowIcon'
            case 7: return 'weekIcon'
            case 30: return 'monthIcon'
            default: return 'monthIcon'
        }
    }

    const addTask = async task => {
        setBusy(true)
        const newTaskRef = await db.collection('tasks').doc();
        
        const res = await newTaskRef.set({
            id: newTaskRef.id,
            user_id: state.user.uid,
            ...task
        });
        setBusy(false)
        loadTasks()
        toggleAddTask()
    }

    return (
        <>
            <Menu user={state.user} />
            <IonPage>
                <IonLoading duration={0} isOpen={busy} />
                <IonContent id="content">
                    <div className="pageContainer">
                        <AddTask showAddTask={showAddTask} toggleAddTask={toggleAddTask} addTask={addTask} />
                        <div className={`imgContainer ${getBackgroundImageClass()}`}>
                            <div className="imgContainer__top">
                                <IonIcon icon={menuOutline} className="menuIcon" onClick={() => menuController.open()} />
                                {!showDone && <IonIcon icon={eye} className="eyeIcon" onClick={toggleShowDone} />}
                                {showDone && <IonIcon icon={eyeOff} className="eyeIcon" onClick={toggleShowDone} />}
                            </div>
                            <div className="imgContainer__bottom">
                                <h1>{props.history.location.state.title}</h1>
                                <p>{today}</p>
                            </div>
                        </div>

                        <div className="tasksContainer">
                            <IonList className="tasksList">
                                {tasks.map(task => <Task task={task} showDone={showDone} toggleDone={toggleDone} key={task.id} />)}
                            </IonList>
                            <div className="addIconContainer">
                                <IonIcon className={`addIcon ${getIconColorClass()}`} icon={addCircle} onClick={() => toggleAddTask()} />
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}