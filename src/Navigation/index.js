import React, { useEffect, useState } from 'react'
import './style.css'

export default function Navigation(props) {

	function makePageNumber(e) {
		props.pageNumber(Number(e.target.value))
	}
	console.log(props.activeButton)
	function makeButtons() {
		let but = []
		for (let i = 1; i <= props.buttonsCount; i++) {
			let btnStyle = i === props.activeButton ? 'page-navigation__button page-navigation__button_active' : 'page-navigation__button'
			but.push(<button onClick={makePageNumber} key={i} value={i} className={btnStyle}>{i}</button>)
		}
		return but
	}

	return makeButtons()
}