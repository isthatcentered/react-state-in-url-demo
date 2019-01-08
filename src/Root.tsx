import React, { ChangeEvent, Component } from "react"
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
	const buildQuery = ( overrides = {} ) => "/?" + stringify( {
		sort:   "pertinence",
		filter: "todo",
		...parse( location!.search ),
		...overrides,
	} ) as any
	
	const query  = parse( location!.search ),
	      sort   = query.sort as string,
	      filter = query.filter as string
	
	if ( !filter || !sort )
		process.nextTick( () => navigate!( `${ buildQuery() }` ) )
	
	const handleSelectValue = ( { target: { name, value } }: ChangeEvent<HTMLSelectElement> ) =>
		navigate!( `${ buildQuery( { [ name ]: value } )}` )
	
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
