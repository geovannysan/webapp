import React from 'react'
import buttonim from '../images/add.png'

import { Link } from 'react-router-dom'
import './styles/AddButton.css'
const Button = () => (
    <Link to="/exercise/new">
        <img src={buttonim} className="Fitness-Add" alt="exercise"></img>
    </Link>
)


export default Button