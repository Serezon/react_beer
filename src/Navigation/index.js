import React, { useEffect, useState } from 'react'
import './style.css'

export default function Navigation(props) {
	const [buttons, setButtons] = useState([])

	useEffect(() => {
		let but = []
		for(let i = 1; i <= props.buttonsCount; i++) {
			but.push(<button key={i} className="page-navigation__button">{i}</button>)
		}
		setButtons(but)
	},[props.buttonsCount])

	return buttons
}