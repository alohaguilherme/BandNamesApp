import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext'

export const BandList = () => {

    const [bands, setBands] = useState([]);

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands)
        });

        return () => socket.off('current-bands');
    }, [socket])

    const alterName = (event, id) => {
        const newName = event.target.value;

        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newName;
            }

            return band;
        }))
    }

    const votar = (id) => {
        socket.emit('votar-band', id)
    }

    const excluir = (id) => {
        socket.emit('exclude-band', id)
    }


    const onBlur = (id, name) => {
        const dados = {
            id,
            name
        }
        socket.emit('alter-name-band', dados);
    }

    const createRows = () => {
        return (
            bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => votar(band.id)}
                        >
                            +1
                        </button>
                    </td>
                    <td>
                        <input
                            className="form-control"
                            value={band.name}
                            onChange={(event) => alterName(event, band.id)}
                            onBlur={(event) => onBlur(band.id, band.name)}
                        />
                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => excluir(band.id)}
                        >
                            Excluir
                        </button>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <>
            <h3>Bandas Atuais</h3>

            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Names</th>
                        <th align="center">Votes</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}
