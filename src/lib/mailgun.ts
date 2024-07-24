interface Attachment {
	data: Blob;
	fileName: string;
}

interface Message {
	senderName: string;
	from: string;
	to: string;
	subject: string;
	text?: string;
	html?: string;
	attachments: Array<Attachment>;
}


export const mailgunClient = {
	send: async function(message: Message) {
		if (!message.html && !message.text) {
			throw new Error("You must provide either an html template or plain text content.");
		}

		const form = new FormData();
		form.set('from', `${message.senderName} <${message.from}>`);
		form.set('to', message.to);
		form.set('subject', message.subject);
		form.set('text', message.text!);
		form.set('html', message.html!);

		message.attachments.map((attachment: Attachment) => {
			form.set('attachment', attachment.data, attachment.fileName);
		});

		const headers = {
			Authorization: 'Basic ' + btoa(import.meta.env.MAILGUN_USERNAME + ':' + import.meta.env.MAILGUN_API_KEY),
		}

		await fetch(import.meta.env.MAILGUN_URL, {
			method: "POST",
			body: form,
			headers
		});


	}

}
