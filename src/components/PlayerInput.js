import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    }

class PlayerInput extends Component {
    render () {
        const {
            playerNumber,
            playerValue = '',
            handleChange,
            type,
            title = `Player ${capitilize(playerNumber)}`
        } = this.props

        if (!playerNumber || !type || !handleChange) {
            return(<h2>Missing value.</h2>)
        }

        return (
            <label htmlFor={`player${capitilize(playerNumber)}${capitilize(type)}`}>
                {title}
                <input id={`player${capitilize(playerNumber)}${capitilize(type)}`} name={`player${capitilize(playerNumber)}${capitilize(type)}`} type={inputType(type)} className='Player' value={playerValue} onChange={handleChange} />
            </label>
        )
    }
}

PlayerInput.propTypes = {
    playerNumber: PropTypes.oneOf(['one', 'two']),
    playerValue: PropTypes.string,
    handleChange: PropTypes.func,
    type: PropTypes.oneOf(['name', 'score']),
    title: PropTypes.string
}

export default PlayerInput