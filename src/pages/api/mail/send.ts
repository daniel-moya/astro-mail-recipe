import type { APIRoute } from "astro";
import { mailgunClient } from "../../../lib/mailgun";

async function getAttachment(id: string) {
	// can get a protected url from db based on some id
	// const { url } = db.select().from(attachments).where(eq(attachments.id, id));

	const response = await fetch("<file-cdn-url>");
	return response.blob();
}

export const POST: APIRoute = async () => {

	let data;
	try {
		data = await getAttachment('id');
	} catch (e) {
		console.error(e);
		return new Response("Error getting attachment for email", { status: 500 });
	}
	try {
		await mailgunClient.send({
			senderName: 'User Name',
			from: 'shop@<domain>',
			to: '<to>',
			subject: '<subject>',
			attachments: [{ data, fileName: 'filename.extension' }],
			html: '<h1>Title</h1><p>Small description</p>',
		});
	} catch (e) {
		console.error(e);
		return new Response("Error sending email", { status: 500 });
	}
	return new Response("", { status: 200 });
}

