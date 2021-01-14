import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';


export const BandAdd = () => {

    const [valueBand, setValueBand] = useState('');    

    const { socket } = useContext(SocketContext)

    const onSubmit = ev => {
        ev.preventDefault();

        if (valueBand.trim().length > 0) {
            socket.emit('add-band', valueBand)
            setValueBand('');
        }
    }

    return (
        <>
            <h3>Adicionar Banda</h3>

            <form onSubmit={onSubmit}>
                <input type="text"
                    className="form-control"
                    placeholder="New Band"
                    value={valueBand}
                    onChange={(ev) => setValueBand(ev.target.value)}
                />
            </form>
        </>
    )
}
