import { graphQLSchemaExtension } from "@keystone-next/keystone/schema"
import addToCart from "./addToCart"

// graphQL string highlighting
const graphql = String.raw
export const extendGraphqlSchema = graphQLSchemaExtension( {
	typeDefs: graphql`
		type Mutation {
			addToCart(productID: ID): CartItem
		}
	`,
	resolvers: {
		Mutation: {
			addToCart,
		}
	}
})