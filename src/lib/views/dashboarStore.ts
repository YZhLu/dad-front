/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHistorical } from '$lib/services/getHistorical';
// import type { ApexOptions } from 'apexcharts';
import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface CoreSvelvetStore {
	dateSpan: Writable<number>;
    currency: Writable<string>;
	series4: Writable<ApexAxisChartSeries>;
}

interface SvelvetStore extends CoreSvelvetStore {
	updateSeries4: (e: any) => void;
}

const svelvetStores: { [key: string]: SvelvetStore } = {};

export function findOrCreateStore(key: string): SvelvetStore {
	const existing = svelvetStores[key];
	if (existing) {
		return existing;
	}

	const coreSvelvetStore: CoreSvelvetStore = {
		dateSpan: writable(1),
		series4: writable([]),
        currency: writable('usd'),
	};

	const dateSpan = coreSvelvetStore.dateSpan;
	const series4 = coreSvelvetStore.series4;
    const currency = coreSvelvetStore.currency;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const updateSeries4 = async (e: any) => {
		const days = get(dateSpan);
		const series: ApexAxisChartSeries = [
			{
				name: 'Bitcoin2',
				data: await getHistorical('bitcoin', get(currency), days)
			}
		];
		series4.set(series);
		
	};

	const svelvetStore = {
		...coreSvelvetStore,
		updateSeries4
	};

	svelvetStores[key] = svelvetStore;
	return svelvetStore;
}
