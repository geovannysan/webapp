import React, { Fragment, useEffect, useState } from 'react';

import Pagination from '@material-ui/lab/Pagination';

import './styles/Poke.css'

const Pokelista = () => {
    const [cont, setCont] = useState([])



    const [pok, setPokemon] = useState([])

    useEffect(() => {
        onbtenerdatos();
    }, [])
    const onbtenerdatos = async () => {
        const req = await fetch('https://pokeapi.co/api/v2/pokemon/')
        const res = await req.json()
        setCont(res.count)
        setPokemon(res.results)

    }
    const obtener = async (pag) => {
        const req = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pag}&limit=20`)
        const res = await req.json()
        setPokemon(res.results)

    }
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        obtener((-1 + value) * 20)
    };

    return (
        <Fragment>


            <div className="container ">
                <div className="container"><Pagination className="pok" count={Math.round(cont / 20)} size="large" boundaryCount={5} page={page} onChange={handleChange} /></div>
                <div className="flex-container">

                    {pok.map((item) => (
                        <div className="card pokecar" key={item.name}>
                            <img className="card-img-top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(item.url.slice(-6, -1).replace("m", "").replace("o", "").replace("n", "").replace("/", ""))}.png`} alt="consulta de api" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text"></p>
                                <a href="#/" className="btn btn-primary">Go </a>
                            </div>
                        </div>


                    ))}
                </div>
            </div>

        </Fragment>
    )


}
export default Pokelista;