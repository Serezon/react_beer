import React, { useEffect, useState } from 'react'
import Search from '../Search'
import Card from '../Card'
import Navigation from '../Navigation'
import './style.css'

export default function App(props) {
	const [beer, setBeer] = useState([])
	const [filter, setFilter] = useState()
	const [url, setOptions] = useState('https://api.punkapi.com/v2/beers?per_page=80')
	const [cards, setCards] = useState(makingCards())
	const [countOnPage, setCountOnPage] = useState(80)
	const [cardsCount, setCardsCount] = useState(80)
	const [pageCount, setPageCount] = useState(1)
	const [buttonsCount, setButtonsCount] = useState(1)

	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(result => setBeer(result))
	}, [url])

	useEffect(() => {
		setCards(makingCards())
		setCardsCount(cards.length)

	},[filter, beer])

	useEffect(() => {
		setButtonsCount(Math.ceil(cardsCount / countOnPage))
		console.log(buttonsCount);
	},[cardsCount, countOnPage])

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
			<Search beer={beer} filter={applyFilter} options={applyOptions} countOnPage={applycountOnPage}/>
			<div className="card-container">
					{cards}
			</div>
			<div className="page-navigation">
				<Navigation buttonsCount={buttonsCount} />
			</div>
		</div>
	)
}