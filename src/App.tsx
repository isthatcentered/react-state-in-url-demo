import React, { Component, SyntheticEvent } from "react"
import "./App.css"
import { parse, stringify } from "query-string"
import { RouteComponentProps, Router } from "@reach/router"




export interface HomePageState
{
	sort: string
	filter: string
}

export interface HomePageProps extends RouteComponentProps
{
}


export function HomePage( { location, navigate }: HomePageProps )
{
	const query  = parse( location!.search ),
	      sort   = query.sort as string,
	      filter = query.filter as string
	
	if ( !filter || !sort )
		process.nextTick( () => navigate!( `/?sort=date&filter=todo` ) )
	
	
	const handleSelectValue = ( e: SyntheticEvent<HTMLSelectElement> ) => {
		
		const target = e.target as HTMLSelectElement
		
		const query = {
			...parse( location!.search ),
			[ target.name ]: target.value,
		}
		
		
		navigate!( `/?${stringify( query )}` )
	}
	
	console.log( "display", location!.search, filter, sort )
	
	return (
		<div>
			<label>
				Sort by:
				<select name="sort"
				        value={sort}
				        onChange={handleSelectValue}
				>
					<option value="pertinence">Pertinence</option>
					<option value="date">Date</option>
				</select>
			</label>
			<label>
				Filter by:
				<select name="filter"
				        value={filter}
				        onChange={handleSelectValue}
				>
					<option value="done">Done</option>
					<option value="todo">Todos</option>
				</select>
			</label>
		</div>)
}


export interface RootState
{
}

export interface RootProps
{
}

export class Root extends Component<RootProps, RootState>
{
	
	static defaultProps = {}
	
	
	// static getDerivedStateFromProps( props: RootProps, state: RootState )
	// {
	//
	// }
	
	
	state = {}
	
	
	render()
	{
		const {} = this.state,
		      {} = this.props
		
		return (
			<div>
				<Router>
					<HomePage path={"/"}/>
				</Router>
			</div>
		)
	}
}
