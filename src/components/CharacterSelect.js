import React, { Component } from 'react'
import PropTypes from 'prop-types'
import M from 'materialize-css'

import { characters } from '../utils/characters'

const capitilize = word => word.charAt(0).toUpperCase() + word.slice(1),
    inputType = type => {
        switch (type) {
            case 'name':
                return 'text'
            case 'score':
                return 'number'
            default:
                return 'text'
        }
    },
    expressPath = 'http://localhost:3010'

class CharacterSelect extends Component {
    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {

        // console.log(characters)
        const {
            playerNumber,
            playerValue = '',
            handleChange,
        } = this.props

        if (!playerNumber || !handleChange) {
            return (<h2>Missing value.</h2>)
        }

        return (
            <div class='input-field'>
                <select class='icons' name={`player${capitilize(playerNumber)}Character`} value={playerValue} onChange={handleChange}>
                    <option value='' disabled selected>Choose your character</option>
                    {characters.fighters.map(name => (<option value={name.id} data-icon={`${expressPath}/renders/${name.file}.png`}>{name.displayNameEn}</option>))}
                </select>
                <label>Choose your character</label>
            </div>
        )
    }
}

CharacterSelect.propTypes = {
    playerNumber: PropTypes.oneOf(['one', 'two']),
    playerValue: PropTypes.string,
    handleChange: PropTypes.func,
    type: PropTypes.oneOf(['name', 'score'])
}

export default CharacterSelect