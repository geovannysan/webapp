import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
const Fromulario = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        console.log(data)

    }

    return (
        <Fragment>
            <h1>Formulario</h1>
            <div className="card">
                <div className="container mt-5">
                    <form className="row"
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-4">
                            <input
                                name="nombre"
                                aria-invalid={errors.nombre ? "true" : "false"}
                                {...register('nombre', { required: true })}
                                className="form-control"

                            />
                            {errors.nombre && (
                                <span role="alert">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <div className="col-md-4">
                            <input
                                name="apellido"

                                className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <button
                                className="btn btn-primary"
                            >dato</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>

    )
}
export default Fromulario