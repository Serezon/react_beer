import React, { useEffect, useState } from 'react'
import Card from '../Card'
import './style.css'

export default function CardsContainer(props) {

	function makingCards() {
		let filter = props.filter
		let cards = props.beer.slice()
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
		<>{makingCards()}</>
	)
}