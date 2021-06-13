import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Exercises from '../pages/ExercisesContainer'
import formu from './Formulario'
import pokemo from '../components/Pokelis'
import ExerciseNewContainer from '../pages/ExercisenewContainer'
import Ejercicio from '../pages/consulta'
import NotFound from '../pages/404'

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/ejerci" component={Ejercicio} />
            <Route exact path="/exercise" component={Exercises} />
            <Route exact path="/exercise/new" component={ExerciseNewContainer} />
            <Route exact path="/registro" component={formu} />
            <Route exact path="/Pokecon" component={pokemo} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)

export default App