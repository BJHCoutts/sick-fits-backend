import { graphQLSchemaExtension } from "@keystone-next/keystone/schema"
import addToCart from "./addToCart"
import checkout from "./checkout"

// graphQL string highlighting
const graphql = String.raw
export const extendGraphqlSchema = graphQLSchemaExtension( {
	typeDefs: graphql`
		type Mutation {
			addToCart(productId: ID): CartItem
			checkout(token: String!): Order
		}
	`,
	resolvers: {
		Mutation: {
			addToCart,
			checkout,
		}
	}
})