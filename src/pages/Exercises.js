import React, { Fragment } from 'react'
import Welcome from '../components/Welcome'
import ExerciseList from '../components/ExerciseList'
import Button from '../components/Button'

const Exercises = ({ data }) => (
    <Fragment>
        <Welcome username="Raul" />
        <ExerciseList
            exercises={data} />
        <Button></Button>
    </Fragment>

)
export default Exercises
