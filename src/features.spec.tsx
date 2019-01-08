import { createHistory, createMemorySource, History, LocationProvider, LocationProviderProps } from "@reach/router"
import { mount, ReactWrapper } from "enzyme"
import * as React from "react"
import { Root } from "./Root"




let WRAPPER: ReactWrapper<LocationProviderProps>,
    PROPS: LocationProviderProps

describe( `Maintaining state using query params`, () => {
	
	describe( `Query params provided in URL`, () => {
		
		beforeEach( () => {
			makeWrapper( { search: `?sort=date&filter=done` } )
		} )
		
		test( `Selects are set to value in url`, () => {
			let sortSelect   = WRAPPER.find( `select[name="sort"]` ),
			    filterSelect = WRAPPER.find( `select[name="filter"]` )
			
			expect( sortSelect.props().value ).toBe( "date" )
			expect( filterSelect.props().value ).toBe( "done" )
		} )
	} )
	
	describe( `No query params in url`, () => {
		beforeEach( () => {
			makeWrapper( { search: `` } )
		} )
		
		test( `Url params are updated with default values`, async () => {
			
			await tick()
			
			expect( PROPS.history!.navigate ).toHaveBeenCalledWith( `/?filter=todo&sort=pertinence`, undefined ) // param 2 is opts
		} )
	} )
	
	describe( `Only some params in url query`, () => {
		beforeEach( () => {
			makeWrapper( { search: `?sort=date` } )
		} )
		
		test( `Defautl parameters are added to url without overriding passed ones`, async () => {
			
			await tick()
			
			expect( PROPS.history!.navigate ).toHaveBeenCalledWith( `/?filter=todo&sort=date`, undefined ) // param 2 is opts
		} )
	} )
} )


function tick(): Promise<any>
{
	return new Promise( resolve => process.nextTick( () => resolve() ) )
}


function makeWrapper( { search, ...props }: { search: string } & Partial<LocationProviderProps> )
{
	const history: History = {
		...createHistory( createMemorySource( "/" ) ),
		navigate: jest.fn(),
		...props,
	}
	history.location.search = search
	
	PROPS = { history }
	
	WRAPPER = mount(
		<LocationProvider history={history}>
			<Root/>
		</LocationProvider> )
}
