import * as api from '$lib/services/api';

export async function getHistorical(id: string, currency: string, days: number): Promise<number[]> {
	const path = `coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

	try {
		const data = await api.get(path);

		const priceData = data.prices;

		if (priceData) {
			return priceData;
		} else {
			console.log(`Price not found for cryptocurrency or coin "${id}".`);
			return [];
		}
	} catch (error) {
		console.error('Error fetching price:', error);
		return [];
	}
}
