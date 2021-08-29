import React, { useCallback, useEffect, useState } from 'react'
import Search from '../Search'
import Card from '../Card'
import Navigation from '../Navigation'
import './style.css'

export default function App(props) {
	const [beer, setBeer] = useState([])
	const [filter, setFilter] = useState()
	const [url, setUrl] = useState('https://api.punkapi.com/v2/beers?per_page=12')
	const [cardsCount, setCardsCount] = useState(12)
	const [cardsOnPage, setCardsOnPage] = useState(12)
	const [pageNUmber, setPageNumber] = useState(1)

	const cards = makingCards()
	const buttonsCount = Math.ceil(cardsCount / cardsOnPage)

	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(result => setBeer(result))
	}, [url])

	useEffect(() => {
		setCardsCount(cards.length)
		setPageNumber(1)
	}, [cards.length])

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
		setUrl(newUrl)
	}

	function applyCountOnPage(count) {
		setCardsOnPage(count)
		setPageNumber(1)
	}

	function applyPageNumber(number) {
		setPageNumber(number)
	}

	function makingCards() {
		let cards = beer.slice()
		if (filter) {
			cards = cards.filter(item => {
				let id = String(item.id)
				let abv = String(item.abv)
				let ibu = String(item.ibu)
				let ebc = String(item.ebc)
				let yeast = item.ingredients.yeast
				let brewed = item.first_brewed
				let hops = item.ingredients.hops.some(item => item.name === filter.hops)
				let malt = item.ingredients.malt.some(item => item.name === filter.malt)
				if (
					(id === filter.id || filter.id === '') &&
					(abv === filter.abv || filter.abv === '') &&
					(ibu === filter.ibu || filter.ibu === '') &&
					(ebc === filter.ebc || filter.ebc === '') &&
					(yeast === filter.yeast || filter.yeast === '') &&
					(brewed === filter.brewed || filter.brewed === '') &&
					(hops || filter.hops === '') &&
					(malt || filter.malt === '')
				) {
					return true
				}
			})
		}
		cards = cards.map(item => <Card key={item.id} beer={item} />)
		return cards
	}

	return (
		<div>
			<Search beer={beer} filter={applyFilter} options={applyOptions} countOnPage={applyCountOnPage} />
			<div className="card-container">
				{cards.slice((pageNUmber - 1) * cardsOnPage, pageNUmber * cardsOnPage)}
			</div>
			<div className="page-navigation">
				<Navigation buttonsCount={buttonsCount} pageNumber={applyPageNumber} activeButton={pageNUmber}/>
			</div>
		</div>
	)
}