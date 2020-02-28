import React from 'react'
import './styles.css'

export default function Button(props) {
    const { text, onClick } = props;
    return (
        <button onClick={onClick} className="btn">
            {text}
        </button>
    )
}
