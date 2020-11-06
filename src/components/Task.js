import { IonIcon, IonItem, IonText} from '@ionic/react'
import React from 'react'
import './css/Task.css'
import {checkmarkCircle, ellipseOutline} from 'ionicons/icons'
import moment from 'moment'

export default props => {

    return (
        <>
        {(!props.showDone && props.task.doneAt) ? null :
            <IonItem>
                <div className="taskContainer">
                    {!props.task.doneAt ?
                        <IonIcon icon={ellipseOutline} className="taskCheck" onClick={() => props.toggleDone(props.task.id)}></IonIcon> :
                        <IonIcon icon={checkmarkCircle} color={`success`} className="taskCheck" onClick={() => props.toggleDone(props.task.id)}></IonIcon>
                    }
                    
                    <div className="taskInfo">
                        <IonText className={props.task.doneAt ? 'taskDesc taskDoneDesc' : 'taskDesc'}>{props.task.desc}</IonText>
                        {props.task.date && <IonText className="taskDate">{moment(props.task.date.toDate()).format('DD/MM/YYYY')}</IonText>}
                    </div>
                </div>
            </IonItem>}
        </>
    )
}