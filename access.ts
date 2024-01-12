import { ListAccessArgs } from "./types"

export function isSignedIn ( { session }: ListAccessArgs )
{
	return !!session
}