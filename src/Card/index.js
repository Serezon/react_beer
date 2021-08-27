import React from 'react'
import './style.css'


export default function Card(props) {
	return (
		<div className="card card__body">
			<h3 className="card__title">{props.beer.name}</h3>
			<figure className="card__image">
				<img src={props.beer.image_url} alt="Beer" height="100" />
			</figure>
			<h4 className="card__tagline">{props.beer.tagline}</h4>
			<ul className="card__description">
				<li className="card__description-item"><b className="card__description-name">ID:</b> {props.beer.id}</li>
				<li className="card__description-item"><b className="card__description-name">ABV:</b> {props.beer.abv}</li>
				<li className="card__description-item"><b className="card__description-name">IBU:</b> {props.beer.ibu}</li>
				<li className="card__description-item"><b className="card__description-name">EBC:</b> {props.beer.ebc}</li>
				<li className="card__description-item"><b className="card__description-name">Yeast:</b> {props.beer.ingredients.yeast}</li>
				<li className="card__description-item"><b className="card__description-name">Brewed:</b> {props.beer.first_brewed}</li>
				<li className="card__description-item"><b className="card__description-name">Hops:</b> {props.beer.ingredients.hops.map((item, index, array) => {
					if (index === array.length - 1) return item.name
					return item.name + ', '
				})}</li>
				<li className="card__description-item"><b className="card__description-name">Malt:</b> {props.beer.ingredients.malt.map((item, index, array) => {
					if (index === array.length - 1) return item.name
					return item.name + ', '
				})}</li>
			</ul>
		</div>
	)
}
