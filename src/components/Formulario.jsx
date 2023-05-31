import { useState } from "react"

const Formulario = () => {
    //estados - hooks
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [lista, setLista] = useState([])
    const [editar, setEditar] = useState(false)
    const [indexEditar, setIndexEditar] = useState(null)
    //guardar
    const guardarDatos = (e) => {
        e.preventDefault();
        if (editar) {
            return
        }
        //validaciones
        if (!nombre) {
            alert('Falta el Nombre')
            return
        }
        if (!apellido) {
            alert('Falta el Apellido')
            return
        }
        //guardar en la lista
        setLista([
            ...lista,
            { nombre, apellido }
        ])
        //limpiar inputs
        e.target.reset()
        //limpiar estados
        setNombre('')
        setApellido('')
    }

    const eliminarUsuario = (index) => {
        const lista_nueva = lista.filter((element, i) => {
            if (index == i) {
                return false
            } else {
                return true
            }
        })
        setLista(lista_nueva)
    }

    const editarUsuario = (index) => {
        setEditar(true)
        setIndexEditar(index)
        const usuario = lista.at(index)
        setNombre(usuario.nombre)
        setApellido(usuario.apellido)
    }

    const actualizar = () => {
        setLista(lista.map((item, index) => {
            if (index === indexEditar) {
                item.nombre = nombre
                item.apellido = apellido
                return item
            } else {
                return item
            }
        })
        )
        setEditar(false)
        setNombre('')
        setApellido('')
    }

    const cancelar = () => {
        setEditar(false)
        setIndexEditar(null)
        setNombre('')
        setApellido('')
    }



    return (
        <div className='container'>
            <h2 className='text-primary text-center'>Formulario de Registro de Usuarios</h2>
            <form onSubmit={guardarDatos}>
                <input type="text"
                    placeholder='Ingrese su Nombre'
                    className='form-control mb-3'
                    onChange={(e) => setNombre(e.target.value.trim())}
                    value={nombre}
                />
                <input type="text"
                    placeholder='Ingrese su Apellido'
                    className='form-control mb-3'
                    onChange={(e) => setApellido(e.target.value.trim())}
                    value={apellido}
                />
                <div className='d-grid gap-2'>
                    
                    <button type='submit' className='btn btn-outline-dark' style={(editar) ? { display: "none" } : {display: "block" }}>Registrar</button>
                
                </div>

                <div className='d-grid gap-2'>
                    <button type="button" className='btn btn-outline-info' onClick={() => { actualizar() }} style={(editar) ? { display: "block" } : {display: "none" }}>Actualizar</button>
                </div>
                <div className='d-grid gap-2 mt-2'>
                    <button type="button" className='btn btn-outline-danger' onClick={() => { cancelar() }} style={(editar) ? { display: "block" } : {display: "none" }}>Cancelar</button>
                </div>
            </form>
            <hr />
            <ol className='list-group'>
                {
                    lista.map((item, index) =>
                    (<li className='list-group-item bg-info d-flex align-items-center justify-content-around'
                        key={index}>{item.nombre} {item.apellido}
                        <div className="d-flex">
                            <button className='btn btn-warning me-2' onClick={() => { editarUsuario(index) }}>Editar</button>
                            <button className='btn btn-danger me-2' onClick={() => { eliminarUsuario(index) }}>Eliminar</button>
                        </div>
                    </li>))
                }
            </ol>
        </div>
    )
}

export default Formulario