import React, { useState , useCallback , useEffect , useRef} from 'react'
import './home_page.css'

const HomePage = () => {

    // declaration of all data container used in project 
    const [noOfCharacter, setNoOfCharacter] = useState(22)
    const[numberAccepted, setNumberAccepted] = useState(false)
    const[specialCharacterAccepted, setSpecialCharacterAccepted] = useState(false)
    const[password, setPassword] = useState('')
    const passwordRef = useRef(null)

    // declaration of  random password generator function to generate random password every time
    // useCallback hook to save function parameter like-(noOfCharacter,numberAccepted,specialCharacterAccepted) on which random password generator works every time
    const randomPasswordGenerator = useCallback(function(){
        let initalPassword = ''
        let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if(numberAccepted){
            str = str + '0123456789'
        }
        if(specialCharacterAccepted){
            str = str + `&* {}[],=-().+;'/`
        }
        for(let iterator = 1 ; iterator <= noOfCharacter ; iterator++){
            let char = Math.floor(Math.random() * str.length + 1)
            initalPassword = str.charAt(char) + initalPassword
        }
        setPassword(initalPassword)
    },[noOfCharacter,numberAccepted,specialCharacterAccepted,setPassword])

     const copyPasswordToClipBoard = useCallback(() => {
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)
    },[password]) 

    // useEffect hook run random password generator function on every time when any of given parameter change
    useEffect(()=> {randomPasswordGenerator()},[noOfCharacter,numberAccepted,specialCharacterAccepted,setPassword])
  return (
    <main className=''>
        <div className='random-password-container'>
            <div className='random-password-first-container'>
                <input className='' placeholder='Password' type="text" value={password} id="password-holder" readOnly ref={passwordRef} />
                <button onClick={copyPasswordToClipBoard} id='copy-button'>Copy</button>
            </div>
            <div >
                <div className='random-password-slider'>
                    <input type="range" min={4} max={44} value={noOfCharacter} id="password-range-slider" onChange={(e) => {setNoOfCharacter(e.target.value)}} />
                    <label htmlFor='password-range-slider' >No of character {noOfCharacter}</label>
                </div>
                <div className='random-password-generator-inputs-container'>
                    <span>
                        <input type="checkbox" defaultChecked={numberAccepted} onChange={() => {setNumberAccepted((prev) => !prev)}} id='number-accepted-checkbox' />
                        <label htmlFor="number-accepted-checkbox">Number</label></span>
                    <span>
                        <input type="checkbox" defaultChecked={specialCharacterAccepted} onChange={() => {setSpecialCharacterAccepted((prev) => !prev)}} id='special-character-accepted-checkbox' />
                        <label htmlFor="special-character-accepted-checkbox">Special character</label>
                    </span>
                </div>
            </div>
        </div>
    </main>
  )
}

export default HomePage
