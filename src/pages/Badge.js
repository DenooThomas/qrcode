import React from 'react'
import {useParams} from "react-router-dom"

function Badge() {
    const {name, email, github} = useParams()
  return (
    <div>
        <h1>Badge</h1>
        <p>{name}</p>
        <p>{email}</p>
        <p>{github}</p>
    </div>
  )
}

export default Badge