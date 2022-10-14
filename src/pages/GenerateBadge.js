
import React, { useRef, useState } from "react"
import QRCode from "react-qr-code";

import "./styling/GenerateBadge.scss"

function GenerateBadge() {
    const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const githubRef = useRef(null)

  const [badge, setBadge] = useState({
    name: '',
    email: '',
    github: ''
  })
  const [qrcode, setQrcode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  
  
  function clearFields(e) {
    e.preventDefault()
    nameRef.current.value = null
    emailRef.current.value = null
    githubRef.current.value = null
    setQrcode('')
    setErrorMsg('')
  }
  function generateBadge(e){
    const emailRegex = EMAIL_REGEX.test(emailRef.current.value)
    if(nameRef.current.value === '' || emailRef.current.value === '' ){
      setErrorMsg('Please fill in all required fields (*)')
    } 
    else if(!emailRegex){
      setErrorMsg('Email is not valid')
    }
    else {
      if(errorMsg){
        setErrorMsg('')
      }
      e.preventDefault()
      setBadge({ 
        name: nameRef.current.value,
        email: emailRef.current.value,
        github: githubRef.current.value
      })
      setQrcode(`http://localhost:3000/badge/${nameRef.current.value}/${emailRef.current.value}/${githubRef.current.value}`)
    }
  }

  // function ValidateEmail(mail) {
  // if (.test(myForm.emailAddr.value))
  //   {
  //     return (true)
  //   }
  //     alert("You have entered an invalid email address!")
  //     return (false)
  // }

  function handleChange(){
    setErrorMsg('')
  }


  return (
    <section>
      <div className="generateBadge">
      <h1 className="title">QR-Gen</h1>
      <div className={`errorMsg ${errorMsg ? 'shown slideOut' : 'hidden'}`}>
        <p>{errorMsg}</p>
      </div>
      <section className="input">
        <form>
          <label htmlFor="name">Name *</label>
          <input 
          type="text"
          id="name"
          ref={nameRef}
          className="inputfield"
          onChange={handleChange}
          />
          <label htmlFor="email">Email *</label>
          <input 
          type="email"
          id="email"
          ref={emailRef}
          className="inputfield"
          onChange={handleChange}
          />
          <label htmlFor="github">Github</label>
          <input 
          type="github"
          id="github"
          ref={githubRef}
          className="inputfield"
          onChange={handleChange}
          />
          <div className="button-cont">
            <div className="button cancel" onClick={clearFields}>{qrcode ? 'New' : 'Cancel'}</div>
            <div className="button create" onClick={generateBadge}>{qrcode ? 'Update' : 'Create'}</div>
          </div>
        </form>  
        
      </section>
      <section className="output">
          <div className={`badge ${!qrcode && 'hidden'}`}>
          {qrcode && 
          <React.Fragment>
            <div className="information">
              <p className="name">{badge.name}</p>
              <p className="email">{badge.email}</p>
              <p className="github">{badge.github}</p>
              </div>
              <div className="qrcode">
                <QRCode
                  size={76}
                  value={qrcode}
                  viewBox={`0 0 76 76`}
                />
            </div>
          </React.Fragment>
            }
          </div>     
        
      </section>
      </div>
    </section>
  )
}

export default GenerateBadge