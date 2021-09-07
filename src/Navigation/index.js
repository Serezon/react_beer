import React, { useEffect, useState } from 'react'
import './style.css'

export default function Navigation(props) {

	function makePageNumber(e) {
		props.pageNumber(Number(e.target.value))
	}
	console.log(props.activeButton)
  // логи нужно подчищать перед коммитом
	function makeButtons() {
    // а был смысл отдельную функцию делать? Могли бы сразу запускать цикл и т.д.
		let but = []
    // but - странное название для переменной, надо тогда уже buttons
		for (let i = 1; i <= props.buttonsCount; i++) {
			let btnStyle = i === props.activeButton ? 'page-navigation__button page-navigation__button_active' : 'page-navigation__button'
      // у тебя часть строк повторяется, можешь занести в ES6 Template string и уже в ней сделать тернарку. Также опять используешь let где можно const
			but.push(<button onClick={makePageNumber} key={i} value={i} className={btnStyle}>{i}</button>)
		}
		return but
	}

	return makeButtons()
}
