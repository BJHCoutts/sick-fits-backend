import { KeystoneContext } from "@keystone-next/types"
import { CartItemCreateInput } from '../.keystone/schema-types'

export default async function addToCart (
	root: any,
	{ productId }: { productId: string },
	context: KeystoneContext
): Promise<CartItemCreateInput>
{
	console.log('adding to cart')
}