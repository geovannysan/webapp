import React, { useState,useRef, useEffect, Fragment } from 'react';
import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";

import Tabla from "./tabla"

const Consult = () => {
  const [data, setData] = useState([])
  const onbtenerdatos = async () => {
    const req = await fetch('http://localhost:4000/api/select')
    const res = await req.json()
    setData(res)
  }
  useEffect(() => {

    onbtenerdatos();


  }, [])


  const [form, setForm] = useState({

  })
  const [form1, setForm1] = useState({
    fecha: '',
    hora: '',
    c_in1: '',
    c_in2: '',
    c_in3: '',
    u_id: ''
  })

  const [verifi, setVerifica] = useState(false)
  const refComp = useRef(null);
  //const [verifi1, setVerifica1] = useState(false)
  const [tiempos, setTiempo] = useState([])
  const dat = [
    { "disable": "", "hora": "9:30" }, { "disable": "", "hora": "10:30" }, { "disable": "", "hora": "11:00" }, { "disable": "", "hora": "11:30" }, { "disable": "", "hora": "12:00" }, { "disable": "", "hora": "12:30" }
  ]


  const dias = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];
  //consultar usuario
  const valor = async (pag) => {
    try {
      let req = await fetch(`http://localhost:4000/api/usuario/${pag}`)
      let res = await req.json();

      if (res[0].carrera.toString() === "sistema") {
        setForm1({
          ...form1,
          u_id: res[0].id
        })
        setVerifica(true)
      }
    }
    catch (error) {
      setVerifica(false)
      console.log(error)
    }
  }
  //cambiar valor en un indice especifico
  function cambiarValor(arr, valorABuscar, valorcambiar, valorViejo, valorNuevo) {
    arr.forEach(function (elemento) {
      if (elemento[valorABuscar] === valorViejo) return elemento[valorcambiar] = valorNuevo
    })
  }
  //consultar horas de fecha
  const cupo = async (dia, ca) => {
    try {
      let reqs = await fetch(`http://localhost:4000/api/cita/${dia}`)
      let ress = await reqs.json()
      var repetidos = {};
      //contar las horas que se repiten
      ress.forEach(function (numero) {
        repetidos[numero.hora] = (repetidos[numero.hora] || 0) + 1;
      });
      //pasar solo el indice que se repite
      for (var k in repetidos) {
        if (repetidos[k] >= ca) {
          cambiarValor(dat, "hora", "disable", k, true)
        }
      }
      setTiempo(dat)
      //setVerifica1(true)
    }
    catch (error) {
      console.log(error)
    }

  }
  //configuracion del flatpiker
  const options = {
    enableTime: false,
    dateFormat: "Y-m-d",
    "disable": [
      function (date) {
        return (date.getDay() === 0 || date.getDay() === 6);  // disable weekends

      }
    ],
    locale: {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        dias,
      },
      months: {
        shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
        longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      },
    }
  }
  const submitHandler = async event => {
    event.preventDefault();
    event.target.className += " was-validated";
    // multiple property validation could go here
    if (event.target.checkValidity()) {
      console.log("dispatch an action");

      try {
        let config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form1)
        }

        let res = await fetch('http://localhost:4000/api/guardar', config)
        let json = await res
        if (json.status === 200) {
          onbtenerdatos();
  refComp.current.flatpickr.clear();
          event.target.reset();


        }
        console.log(json)

      } catch (error) {

      }
    }
  };
  const handleChanges = e => {
    setForm1({
      ...form1,
      [e.target.name]: e.target.value
    })

  }
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    if ((e.target.name).toString() === "datos") {
      valor(e.target.value)
      return;
    }

  }

  return (
    <Fragment>
      <div className="container">
        <h1>Formulario</h1>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="form-group col-sm-4">
                <input
                  name="datos"
                  onChange={handleChange}
                  className="form-control" />
              </div>
            </div>
          </div>
          <br></br>
          <div className="container">
            <h2>Escoja el turno</h2>
            {verifi ? <form onSubmit={submitHandler} className="needs-validation" noValidate>
              <div className="row">
                <div className="form-group col-sm-4">
                  <Flatpickr className="form-control " required options={options}
                    onChange={(d, v,) => {
                      setForm1({
                        ...form1,
                        fecha: v
                      })
                      setTiempo([])
                      const numeroDia = new Date(v).getDay();
                      const nombreDia = dias[numeroDia];
                      switch (nombreDia) {
                        case 'Viernes':
                          cupo(v, 3)
                          break
                        default:
                          cupo(v, 2)
                      }
                    }}ref={refComp} />
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="form-group col-sm-4">
                  <select required name="hora" onChange={handleChanges} className="form-control">
                    <option value="" ></option>
                    {tiempos.map((tie, index) => (
                      <option key={index} value={tie.hora} disabled={tie.disable}>{tie.hora}</option>
                    ))}
                  </select>
                  <div className="valid-feedback">
                    Looks good
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <label className="form-label">Last name</label>
                  <input type="text" className="form-control" name="c_in1" onChange={handleChanges} required />
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">Last name</label>
                  <input type="text" className="form-control" name="c_in2" onChange={handleChanges} required />
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">Last name</label>
                  <input type="text" className="form-control" name="c_in3" onChange={handleChanges} required />
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <button className="btn btn-primary" type="submit">Guardar</button>
              </div>
            </form> : <div><h1>no Verificdo</h1></div>}
          </div>


        </div>
      </div>
     
      <Tabla data={data}/>

    </Fragment>
  )

}

export default Consult;