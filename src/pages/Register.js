import { IonButton, IonContent, IonInput, IonLoading, IonPage } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import {auth} from '../firebase'
import './css/LoginRegister.css'

export default props => {
    const [busy, setBusy] = useState(false)
    const [user, setUser] = useState({ email: '', password: '', cpassword: '' })
    const { dispatch } = useContext(UserContext)

    const handleRegister = async () => {
        setBusy(true)
        try {
            const data = await auth.createUserWithEmailAndPassword(user.email, user.password)
            dispatch({ type: 'setUser', payload: data.user })
            props.history.push({
                pathname: '/tasks',
                state: {title: 'Hoje', daysAhead: 0}
            })
            console.log(data)
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
                            <IonInput name="cpassword" type="password" placeholder="Confirme a senha" onIonChange={e => handleUserInput(e)} />
                            <IonButton onClick={handleRegister} color='success'>Registrar</IonButton>
                        </form>
                        <Link to={`/login`} className="loginRegisterLink">Já possuo uma conta</Link>
                    </div>
                </IonContent>
            </IonPage>
    )
}