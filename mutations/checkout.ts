import { KeystoneContext } from "@keystone-next/types"
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types'
import stripeConfig from "../lib/stripeConfig"


const graphql = String.raw
export default async function checkout (
	root: any,
	{ token }: { token: string },
	context: KeystoneContext
): Promise<OrderCreateInput>
{
	const userId = context.session.itemId
	if (!userId) {
		throw new Error('Sorry! You must be signed in to create an order')
	}

	const user = await context.lists.User.findOne( {
		where: { id: userId },
		resolveFields: graphql`
			id
			name
			email
			cart {
				id
				quantity
				product {
					id
					name
					price
					description
					photo {
						id
						image {
							id
							publicUrlTransformed
						}
					}
				}
			}
		`
	} )
	console.dir( user, { depth: null } )
	
	const cartItems = user.cart.filter( cartItem => cartItem.product )
	
	const amount = cartItems.reduce( ( tally: number, cartItem:CartItemCreateInput) => {
		return tally + cartItem.quantity * cartItem.product.price
	}, 0 )
	console.log( { amount } )
	
	const charge = await stripeConfig.paymentIntents.create( {
		amount,
		currency: 'USD',
		confirm: true,
		payment_method: token,
	} ).catch( error =>
	{
		console.error( error )
		throw new Error(error.message)
	})
}