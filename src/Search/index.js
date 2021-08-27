import React from 'react'
import './style.css'


export default function Search(props) {

	let timeout = null

	const beer = props.beer
	const id = beer.map(item => item.id)
	const abv = beer.map(item => item.abv).filter((item, index, array) => array.indexOf(item) === index).sort((a, b) => a - b)
	const ibu = beer.map(item => item.ibu).filter((item, index, array) => array.indexOf(item) === index).sort((a, b) => a - b)
	const ebc = beer.map(item => item.ebc).filter((item, index, array) => array.indexOf(item) === index).sort((a, b) => a - b)
	const yeast = beer.map(item => item.ingredients.yeast).filter((item, index, array) => array.indexOf(item) === index)
	const brewed = beer.map(item => item.first_brewed).filter((item, index, array) => array.indexOf(item) === index)
	let hops = []
	let malt = []
	for (let item of beer) {

		let listOfMalt = item.ingredients.malt.map(item => item.name)
		let listOfHops = item.ingredients.hops.map(item => item.name)
		malt.push(...listOfMalt)
		hops.push(...listOfHops)
	}

	malt = malt.filter((item, index, array) => {
		return array.indexOf(item) === index
	})
	hops = hops.filter((item, index, array) => {
		return array.indexOf(item) === index
	})

	function makeFilter(e) {
		e.preventDefault()
		const filter = {}
		let form = document.forms.parametrs
		filter.id = form.id.value
		filter.abv = form.abv.value
		filter.ibu = form.ibu.value
		filter.ebc = form.ebc.value
		filter.yeast = form.yeast.value
		filter.brewed = form.brewed.value
		filter.hops = form.hops.value
		filter.malt = form.malt.value
		props.filter(filter)
	}
	function makeOptions(e) {
		let name = e.target.value
		clearTimeout(timeout)
		timeout = setTimeout(props.options.bind(null, name), 200);
	}

	return (
		<div className="search">
			<div className="search__item">
				<span>Name</span>
				<input onChange={makeOptions} type="text" />
				<span>Count cards on the page</span>
				<input type="number" min="4" style={{width: '40px'}}/>
			</div>
			<form name="parametrs">
				<div className="search__item">
					<span>ID</span>
					<select name="id">
						<option value=''></option>
						{id.map((item, index) => <option key={index} value={item}>{item}</option>)}
					</select>
				</div>
				<div className="search__item">
					<span>ABV</span>
					<select name="abv">
						<option value=''></option>
						{abv.map((item, index) => <option key={index} value={item}>{item}</option>)}
					</select>
				</div>
				<div className="search__item">
					<span>IBU</span>
					<select name="ibu">
						<option value=''></option>
						{ibu.map((item, index) => <option key={index} value={item}>{item}</option>)}
					</select>
				</div>
				<div className="search__item">
					<span>EBC</span>
					<select name="ebc">
						<option value=''></option>
						{ebc.map((item, index) => <option key={index} value={item}>{item}</option>)}
					</select>
				</div>
				<div className="search__item">
					<span>Yeast</span>
					<select name="yeast">
						<option value=''></option>
						{yeast.map((item, index) => <option key={index} value={item}>{item}</option>)}
					</select>
				</div>
				<div className="search__item">
					<span>Brewed</span>
					<select name="brewed">
						<option value=''></option>
						{brewed.map((item, index) => <option key={index} value={item}>{item}</option>)}
					</select>
				</div>
				<div className="search__item">
					<span>Hops</span>
					<select name="hops">
						<option value=''></option>
						{hops.map((item, index) => <option key={index} value={item}>{item}</option>)}
					</select>
				</div>
				<div className="search__item">
					<span>Malt</span>
					<select name="malt">
						<option value=''></option>
						{malt.map((item, index) => <option key={index} value={item}>{item}</option>)}
					</select>
				</div>
				<div className="search__item">
					<input onClick={makeFilter} name="submit" value="filter" type="submit" />
				</div>
			</form>
		</div>
	)
}