import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"




configure( { adapter: new Adapter() } )



// When using TypeScript with Babel, all your files need to have at least one export,
// otherwise you will get the error Cannot compile namespaces when the
// '--isolatedModules' flag is provided..
// This fixes it
export default undefined