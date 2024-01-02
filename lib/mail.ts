import { createTransport, getTestMessageUrl } from "nodemailer"

const transport = createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
	}
} )

function createEmail ( text: string )
{
	return `
		<div style="
			border: 1px solid black;
			padding: 20px;
			font-family: sans-serif;
			line-height: 2;

		">
			<h2>Hi there!</h2>
			<p>${text}</p>
			<p>😁, Brian</p>
		</div>
	`
}

export async function sendPasswordResetEmail ( resetToken: string, to: string )
{
	const info = await transport.sendMail({
		to,
		from: 'test@example.com',
		subject: 'Your password reset token!',
		html: createEmail( `
			<a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to Reset!</a>
		`)
	} )
	console.log( info )
	if ( process.env.MAIL_USER.includes( 'ethereal.email' ) )
	{
		console.log(`📧 Message Sent! Preview at ${getTestMessageUrl(info)}`)
	}
}