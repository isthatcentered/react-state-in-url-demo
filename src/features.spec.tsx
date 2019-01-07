import { createHistory, createMemorySource, LocationProvider, LocationProviderProps } from "@reach/router"
import { mount, ReactWrapper } from "enzyme"
import * as React from "react"
import { Root } from "./App"




describe( `Query params in URL`, () => {
	let WRAPPER: ReactWrapper<LocationProviderProps>
	
	beforeEach( () => {
		
		const history = createHistory( createMemorySource( "/" ) )
		history.location.search = `?sort=date&filter=todo`
		
		WRAPPER = mount(
			<LocationProvider history={history}>
				<Root/>
			</LocationProvider> )
	} )
	
	test( `Selects are set to value in url`, () => {
		let sortSelect   = WRAPPER.find( `select[name="sort"]` ),
		    filterSelect = WRAPPER.find( `select[name="filter"]` )
		
		expect( sortSelect.props().value ).toBe( "date" )
		expect( filterSelect.props().value ).toBe( "todo" )
	} )
} )