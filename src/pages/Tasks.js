import { IonContent, IonIcon, IonList, IonPage } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import './css/Tasks.css'
import {db} from '../firebase'
import Task from '../components/Task'
import {eye, eyeOff, addCircle} from 'ionicons/icons'
import AddTask from '../components/AddTask'



export default props => {
    const [tasks, setTasks] = useState([])
    const [showDone, setShowDone] = useState(false)
    const [showAddTask, setShowAddTask] = useState(false)

    useEffect(() => {
        loadTasks()      
    }, [])

    const loadTasks = async () => {
        const dbTasks = await db.collection('tasks').get()
        setTasks(dbTasks.docs.map(dbTask => dbTask.data()))
    }

    const toggleShowDone = () => setShowDone(!showDone)
    const toggleAddTask = () => setShowAddTask(!showAddTask)

    const toggleDone = async (taskId) => {
        const dbTasks = await db.collection('tasks').where('id', '==', taskId).get()
       
        if(dbTasks.docs.length) {
            const dbTask = dbTasks.docs[0]
            const newDoneAt = dbTask.data().doneAt ? null : new Date()
            await dbTask.ref.update({doneAt: newDoneAt})
            
            loadTasks()
        }
    }

    return (
        <IonPage>
            <IonContent>
                <div className="pageContainer">
                    <AddTask showAddTask={showAddTask} toggleAddTask={toggleAddTask} />    
                    <div className="imgContainer">
                        <span>Menu</span>
                        {!showDone && <IonIcon icon={eye} className="eyeIcon" onClick={toggleShowDone} />}
                        {showDone && <IonIcon icon={eyeOff} className="eyeIcon" onClick={toggleShowDone} />}
                    </div>

                    <div className="tasksContainer">
                        <IonList>
                            {tasks.map(task => <Task task={task} showDone={showDone} toggleDone={toggleDone} key={task.id}/>)}     
                        </IonList>
                        <IonIcon icon={addCircle} color="danger" onClick={() => toggleAddTask()} />
                    </div>                     
                </div>
            </IonContent>
        </IonPage>
    )
}