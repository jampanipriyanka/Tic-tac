import { useState } from "react";

export default function Player({ initialName, symbol, IsActive, onChangeName }) {
    const [PLayerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, PLayerName)
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    let editablePLayerName = <span className="Player-name">{PLayerName}</span>
    let BtnCaption = 'Edit';

    if (isEditing) {
        editablePLayerName = <input type="text" required value={PLayerName} onChange={handleChange} />;
        BtnCaption = 'Save'
    }
    return (
        <li className={IsActive ? 'active' : undefined}>
            <span className="player">
                {editablePLayerName}
                <span className="Player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{BtnCaption}</button>
        </li>
    );
}