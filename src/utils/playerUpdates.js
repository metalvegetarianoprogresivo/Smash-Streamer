import { characters } from './characters'

export const updateMatchData = () => {}
export const characterData = characterId => characters.fighters.filter(fighter => {
    console.log(fighter, characterId)
    return fighter.id === characterId
})