import { permissionsList } from "./schemas/fields"
import { ListAccessArgs } from "./types"

export function isSignedIn ( { session }: ListAccessArgs )
{
	return !!session
}

export function generatedPermissions = Object.fromEntries( permissionsList.map( permission => [
	permission,
	function ( { session }: ListAccessArgs )
	{
		return !!session?.data.role?.[permission]
	}
]))

export const permissions = {

...generatedPermissions,

}