import { IonButton, IonContent, IonInput, IonLoading, IonPage } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import {auth} from '../firebase'
import './css/LoginRegister.css'

export default props => {
    const [busy, setBusy] = useState(false)
    const [user, setUser] = useState({ email: '', password: '' })
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        console.log(state)
        if(state.user) {
            props.history.push({
                pathname: '/tasks',
                state: {title: 'Hoje', daysAhead: 0}
            })
        }
    }, [state])

    const handleLogin = async (event) => {
        setBusy(true)
        try {
            const data = await auth.signInWithEmailAndPassword(user.email, user.password)
            dispatch({ type: 'setUser', payload: data.user })
            props.history.push({
                pathname: '/tasks',
                state: {title: 'Hoje', daysAhead: 0}
            })
        } catch (err) {
            console.log(err)
        }
        setBusy(false)
    }

    const handleUserInput = (e, isDate = false) => {
        let {name, value} = e.target
        setUser({...user, [name]: value})
    }

    return (
        <IonPage>
            <IonLoading duration={0} isOpen={busy} />
            <IonContent className="loginRegisterPage">
                <div className='loginRegisterFormContainer'>
                    <h1 className="title">Tasks</h1>  
                    <form className='loginRegisterForm'>
                        <h3 className="formTitle">Informe seus dados</h3>
                            <IonInput name="email" placeholder="Email" onIonChange={e => handleUserInput(e)} />
                            <IonInput name="password" type="password" placeholder="Senha" onIonChange={e => handleUserInput(e)} />      
                            <IonButton onClick={handleLogin} color='success'>Entrar</IonButton>
                    </form>
                    <Link className="loginRegisterLink" to={`/register`}>Ainda não possui conta?</Link>
                </div>
            </IonContent>
        </IonPage>
    )
}