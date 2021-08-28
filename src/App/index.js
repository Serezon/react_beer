import React, { useEffect, useState } from 'react'
import Search from '../Search'
import CardsContainer from '../CardsContainer'
import Navigation from '../Navigation'
import './style.css'

export default function App(props) {
	const [beer, setBeer] = useState([])
	const [filter, setFilter] = useState()
	const [url, setOptions] = useState('https://api.punkapi.com/v2/beers?per_page=80')
	const [countOnPage, setCountOnPage] = useState(80)
	const [cardsCount, setCardsCount] = useState(80)
	const [pageCount, setPageCount] = useState(1)
	const [buttonsCount, setButtonsCount] = useState(1)

	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(result => setBeer(result))
	}, [url])

	function applyFilter(filter) {
		setFilter(filter)
	}

	function applyOptions(name) {
		let newUrl = new URL(url)
		if (name) {
			newUrl.searchParams.set('beer_name', name)
		} else {
			newUrl.searchParams.delete('beer_name')
		}
		setOptions(newUrl)
	}

	function applycountOnPage(count) {
		setCountOnPage(count)
	}
	function applycardsCount(count) {
		setCardsCount(count)
	}

	return (
		<div>
			<Search beer={beer} filter={applyFilter} options={applyOptions} countOnPage={applycountOnPage}/>
			<div className="card-container">
				<CardsContainer filter={filter} beer={beer} cardsCount={applycardsCount}/>
			</div>
			<div className="page-navigation">
				<Navigation buttonsCount={buttonsCount} />
			</div>
		</div>
	)
}