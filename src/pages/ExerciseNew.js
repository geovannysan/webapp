import React from 'react'
import './styles/Newcar.css'
import ExerciseForm from '../components/ExerciseForm'
import Card from '../components/Card'

const Formnew = ({ form, onChange, onSubmit }) => (

    <div className="row ItemsGrid">
        <div className="col-sm Card_Space">
            <Card {...form} />
        </div>
        <div className="col-sm Form_Space">
            <ExerciseForm
                onChange={onChange}
                onSubmit={onSubmit}
                form={form} />
        </div>
    </div>



)

export default Formnew