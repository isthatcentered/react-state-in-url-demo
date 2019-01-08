import { createHistory, createMemorySource, History, LocationProvider, LocationProviderProps } from "@reach/router"
import { mount, ReactWrapper } from "enzyme"
import * as React from "react"
import { Root } from "./Root"




let WRAPPER: ReactWrapper<LocationProviderProps>,
    PROPS: LocationProviderProps


function ensureNavigateCalledOnNextTickForHistoryPropUpdateToWork()
{
// navigate on mount needs to be called on next tick for history.location.search to be updated
	expect( PROPS.history!.navigate ).not.toHaveBeenCalled()
}


describe( `Maintaining state using query params`, () => {
	let SORT: string,
	    FILTER: string,
	    SORT_DEFAULT: string   = "pertinence",
	    FILTER_DEFAULT: string = "todo"
	
	describe( `Query params provided in URL`, () => {
		beforeEach( () => {
			SORT = "date"
			FILTER = "done"
			makeWrapper( { search: `?sort=${SORT}&filter=${FILTER}` } )
		} )
		
		test( `Selects are set to value in url`, () => {
			let sortSelect   = getByName( "sort" ),
			    filterSelect = getByName( "filter" )
			
			expect( sortSelect.prop( "value" ) ).toBe( "date" )
			
			expect( filterSelect.prop( "value" ) ).toBe( "done" )
		} )
	} )
	
	describe( `No query params in url`, () => {
		beforeEach( () => {
			makeWrapper( { search: `` } )
		} )
		
		test( `Url params are updated with default values`, async () => {
			
			ensureNavigateCalledOnNextTickForHistoryPropUpdateToWork()
			
			await tick()
			
			expect( PROPS.history!.navigate ).toHaveBeenCalledWith( `/?filter=${FILTER_DEFAULT}&sort=${SORT_DEFAULT}`, undefined ) // param 2 is opts
		} )
	} )
	
	describe( `Only some params in url query`, () => {
		beforeEach( () => {
			SORT = "date"
			makeWrapper( { search: `?sort=${SORT}` } )
		} )
		
		test( `Defautl parameters are added to url without overriding passed ones`, async () => {
			
			ensureNavigateCalledOnNextTickForHistoryPropUpdateToWork()
			
			await tick()
			
			expect( PROPS.history!.navigate ).toHaveBeenCalledWith( `/?filter=${FILTER_DEFAULT}&sort=${SORT}`, undefined ) // param 2 is opts
		} )
	} )
} )


function tick(): Promise<any>
{
	return new Promise( resolve => process.nextTick( () => resolve() ) )
}


function getByName( name: string ): ReactWrapper
{
	return WRAPPER.find( `[name="${name}"]` )
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
