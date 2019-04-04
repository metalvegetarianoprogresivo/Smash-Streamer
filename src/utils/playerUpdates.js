import request from 'request'

import { characters } from './characters'
import { api_key } from '../config'

const
    tourney = '7d5lit4f'

export const updateMatchData = () => {}
export const characterData = characterId => characters.fighters.filter(fighter => fighter.id === characterId)
export const getOpenMatches = id => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.withCredentials = true

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log('Data', JSON.parse(this.responseText))
            return resolve(JSON.parse(this.responseText))
        }
    })
    console.log('asdasd', id)
    xhr.open('GET', `https://cors-anywhere.herokuapp.com/https://api.challonge.com/v1/tournaments/${id}/matches.json?state=open&api_key=${api_key}`)

    xhr.withCredentials = false
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    xhr.send(null)
})
export const getOpenMatchesLegacy = () => new Promise((resolve, reject) => request({
        method: 'GET',
        url: `https://api.challonge.com/v1/tournaments/${tourney}/matches.json`,
        qs: { state: 'open', api_key },
        headers: { 'access-control-allow-origin': '*' }
    }, (error, response, body) => {
        if (error) return reject(error)

        return resolve(body)
    }))
export const updateMatch = (id, score, winner_id = '') => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(),
        data = new FormData()

    data.append('match[scores_csv]', score)
    data.append('match[winner_id]', winner_id)

    xhr.withCredentials = true

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log('Data', JSON.parse(this.responseText))
            return resolve(JSON.parse(this.responseText))
        }
    })
    console.log('asdasd', id)
    xhr.open('PUT', `https://cors-anywhere.herokuapp.com/https://api.challonge.com/v1/tournaments/${tourney}/matches/${id}.json?api_key=${api_key}`)

    xhr.withCredentials = false
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    xhr.send(data)
    // request({
    //     method: 'PUT',
    //     url: `https://api.challonge.com/v1/tournaments/${tourney}/matches/${id}.json`,
    //     qs: { api_key },
    //     headers: { 'access-control-allow-origin': '*' },
    //     formData: { 'match[scores_csv]': score, 'match[winner_id]' : winner_id }
    // }, (error, response, body) => {
    //     if (error) return reject(error)

    //     return resolve(body)
    // })
})
export const getPlayerData = id => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.withCredentials = true

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.responseText))
            return resolve(JSON.parse(this.responseText))
        }
        return reject(this.statusText)
    })

    xhr.open('GET', `https://cors-anywhere.herokuapp.com/https://api.challonge.com/v1/tournaments/${tourney}/participants/${id}.json?state=open&api_key=${api_key}`)
    xhr.withCredentials = false
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    xhr.send(null)
})