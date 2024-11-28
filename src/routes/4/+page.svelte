<script lang="ts">
	import { onMount } from 'svelte';
	import * as api from '$lib/services/api';
	import ZoomableTimeseries from '$lib/components/charts/ZoomableTimeseries.svelte';
	import type { Chart } from '$lib/utils/Wrapper';
	import CurrencyFilter from '$lib/components/filters/CurrencyFilter.svelte';
	import CoinFilter from '$lib/components/filters/CoinFilter.svelte';
	import DateFilter from '$lib/components/filters/DateFilter.svelte';
	import { getCryptoPrice } from '$lib/services/getPrice';
	import { getHistorical } from '$lib/services/getHistorical';

	let chart: Chart;

	let title: ApexTitleSubtitle = {
		text: 'Gráfico 4',
		align: 'left'
	};

	let series: ApexAxisChartSeries = [
		{
			name: 'Bitcoin',
			data: []
		}
	];

	async function get_btc(): Promise<[number, number][]> {
		const body = await api.get(
			//'coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=daily&precision=1'
			// 'coins/bitcoin/market_chart?vs_currency=usd&days=1&precision=2'
			'coins/bitcoin/market_chart/range?vs_currency=usd&from=1711929600&to=1732643425'
		);

		const prices: [number, number][] = body.prices.map((t: any) => {
			return [t[0], t[1] * 1000000];
		});

		return prices;
	}

	async function getCurrencies() {
		return await api.get('simple/supported_vs_currencies');
	}

	async function getCoins() {
		return await api.get('coins/list');
	}

	let currencyOptions: string[];
	let coinOptions: string[];

	onMount(async () => {
		currencyOptions = await getCurrencies();
		coinOptions = await getCoins();

		series = [
			{
				name: 'Bitcoin2',
				data: await getHistorical('bitcoin','usd',1)//await getCryptoPrice('bitcoin','usd')//get_btc()
			}
		];

		chart.ref?.updateSeries(series);
	});

	async function hdlCurrencySelection(e: CustomEvent<any>): Promise<void> {
		const d = e.detail;
		console.log(d)
		series = [
			{
				name: 'Bitcoin2',
				data: await getHistorical('bitcoin','usd',d.dateSpan)//await getCryptoPrice('bitcoin','usd')//get_btc()
			}
		];

		chart.ref?.updateSeries(series);
	}


	async function hdlDateSelection(e: CustomEvent<any>): Promise<void> {
		const d = e.detail;
		series = [
			{
				name: 'Bitcoin2',
				data: await getHistorical('bitcoin','usd',d.dateSpan)//await getCryptoPrice('bitcoin','usd')//get_btc()
			}
		];

		chart.ref?.updateSeries(series);
		
	}
</script>

<div class="flex gap-3">
	{#if currencyOptions}
		{#await currencyOptions}
			<p>Loading...</p>
		{:then currencyOptions}
			<div class=" p-2">
				<CurrencyFilter {currencyOptions} on:currency-selected={hdlCurrencySelection}
				></CurrencyFilter>
			</div>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{/if}

	{#if coinOptions}
		{#await coinOptions}
			<p>Loading...</p>
		{:then coinOptions}
			<div class=" p-2">
				<CoinFilter {coinOptions} on:currency-selected={hdlCurrencySelection}></CoinFilter>
			</div>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{/if}

	<div class="">
		<DateFilter on:date-selected={hdlDateSelection}></DateFilter>
	</div>
</div>

<div class="w-full">
	<ZoomableTimeseries {series} {title} bind:chart></ZoomableTimeseries>
</div>
