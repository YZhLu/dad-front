import { PUBLIC_COINGECKO_API_KEY } from '$env/static/public';

const BASE_URL = 'https://api.coingecko.com/api/v3/';

interface SendOptions {
	method: string;
	path: string;
	data?: unknown;
	token?: string;
}

async function send(sendParams: SendOptions) {
	const { method, path, data, token } = sendParams;
	/* const headers: unknown = {}; */

	const headers: { [key: string]: string } = {
		accept: 'application/json',
		'x-cg-demo-api-key': PUBLIC_COINGECKO_API_KEY
	};

	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const opts: { [key: string]: any } = { method, headers };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Bearen ${token}`;
	}

	return await fetch(`${BASE_URL}/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				console.log(err);
				return json;
			}
		});
}

export const get = (path: string, token?: string, data?: unknown) => {
	return send({ method: 'GET', path, token, data });
};

export function del(path: string, token?: string, data?: unknown) {
	return send({ method: 'DELETE', path, token, data });
}

export const post = (path: string, data?: unknown, token?: string) => {
	return send({ method: 'Post', path, token, data });
};

export function put(path: string, data?: unknown, token?: string) {
	return send({ method: 'PUT', path, data, token });
}
