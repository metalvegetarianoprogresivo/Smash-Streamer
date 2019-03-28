import React, { Component } from 'react'
import PropTypes from 'prop-types'

const capitilize = word => word.charAt(0).toUpperCase() + word.slice(1)

class GeneralInput extends Component {
    render() {
        const {
            inputValue,
            handleChange,
            type,
            title = ''
        } = this.props

        // if (!inputValue || !type || !handleChange) {
        //     return (<h2>Missing value.</h2>)
        // }

        return (
            <label htmlFor={`input${capitilize(type)}`}>
                {title}
                <input name={`input${capitilize(type)}`} type='text' className='TextBox' id={`input${capitilize(type)}`} value={inputValue} onChange={handleChange} />
            </label>
        )
    }
}

GeneralInput.propTypes = {
    title: PropTypes.string,
    inputValue: PropTypes.string,
    handleChange: PropTypes.func,
    type: PropTypes.oneOf(['name', 'round'])
}

export default GeneralInput