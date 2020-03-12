import React, { useEffect, useState } from 'react'
import './styles.css'
import BbTimline from './BbTimeline'

const api = 'https://www.breakingbadapi.com/api'

const TimeLine = () => {
    const [bbEpisodes, setBbEpisodes] = useState([])
    const [bbCharacters, setBbCharacters] = useState([])
    const [highlight, setHighlight] = useState()

    useEffect(() => {
        fetch(`${api}/characters?category=Breaking+Bad`)
            .then(response => response.ok && response.json())
            .then(characters => {
                setBbCharacters(
                    characters.sort((a, b) => a.name.localeCompare(b.name))
                )
            })
            .catch(console.error)
    }, [])

    useEffect(() => {
        fetch(`${api}/episodes?series=Breaking+Bad`)
            .then(response => response.ok && response.json())
            .then(episodes => {
                console.warn(episodes)
                setBbEpisodes(episodes)
            })
    }, [])

    return(
        <div className="timeline">
            <h1>Breaking Bad Timeline</h1>
            <BbTimline highlight={highlight} data={bbEpisodes} />
            <h2>Select your character</h2>
            <select value={highlight} onChange={e => setHighlight(e.target.value)}>
                <option>Select character</option>
                {bbCharacters.map(character => (
                    <option key={character.name}>{character.name}</option>
                ))}
            </select>
        </div>
    );
}

export default TimeLine;