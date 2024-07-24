interface ImportMetaEnv {
	readonly MAILGUN_API_KEY: string;
	readonly MAILGUN_USERNAME: string;
	readonly MAILGUN_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
