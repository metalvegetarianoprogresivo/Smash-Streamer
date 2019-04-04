import React, { Component } from 'react'
import PropTypes from 'prop-types'
import M from 'materialize-css'

class MatchSelect extends Component {
    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {

        const {
            selectName,
            selectValue = '',
            handleChange,
            matches
        } = this.props

        if (!handleChange || matches.length === 0 || !selectName) {
            return (<p>No matches available.</p>)
        }

        return (
            <div class='input-field'>
                <select class='icons' name={selectName} value={selectValue} onChange={handleChange}>
                    <option key='0' value='' disabled selected>Choose a Match</option>
                    {matches.map(match => {
                        return <option key={match.id} value={match.id}>{match.player1_id} vs. {match.player2_id}</option>
                    })}
                </select>
                <label>Choose a Match</label>
            </div>
        )
    }
}

MatchSelect.propTypes = {
    selectName: PropTypes.string,
    selectValue: PropTypes.string,
    handleChange: PropTypes.func,
    matches: PropTypes.array
}

export default MatchSelect