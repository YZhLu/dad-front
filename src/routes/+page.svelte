<script lang="ts">
	import CoinFilter from '$lib/components/filters/CoinFilter.svelte';
	import CurrencyFilter from '$lib/components/filters/CurrencyFilter.svelte';
	import DateFilter from '$lib/components/filters/DateFilter.svelte';
	import Dashboard from '$lib/views/Dashboard.svelte';

	import * as api from '$lib/services/api';
	import { onMount } from 'svelte';
	import type { Chart } from '$lib/utils/Wrapper';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	async function getCurrencies() {
		return await api.get('simple/supported_vs_currencies');
	}

	async function getCoins() {
		return await api.get('coins/list');
	}

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
	let chart: Chart;
	let currencyOptions: string[];
	let coinOptions: string[];

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

	let data: any;

	onMount(async () => {
		currencyOptions = await getCurrencies();
		coinOptions = await getCoins();

		series = [
			{
				name: 'Bitcoin2',
				data: await get_btc()
			}
		];

		//chart.ref?.updateSeries(series);

		data = {
			series,
			title,
			chart
		};

		console.log(data);
	});

	function hdlCurrencySelection(e: CustomEvent<any>): void {
		const d = e.detail;
		alert(JSON.stringify(d));
	}
</script>

<AppShell slotFooter="z-10 p-2 px-4 flex justify-end bg-surface-100-800-token">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-lg uppercase">DAD</strong>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<div class="flex gap-3">
					{#if coinOptions}
						{#await coinOptions}
							<p>Loading...</p>
						{:then coinOptions}
							<div class="">
								<CoinFilter {coinOptions} on:currency-selected={hdlCurrencySelection}></CoinFilter>
							</div>
						{:catch error}
							<p style="color: red">{error.message}</p>
						{/await}
					{/if}
				</div>

				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<div class="flex gap-3 overflow-auto">
			{#if currencyOptions}
				{#await currencyOptions}
					<p>Loading...</p>
				{:then currencyOptions}
					<div class="">
						<CurrencyFilter {currencyOptions} on:currency-selected={hdlCurrencySelection}
						></CurrencyFilter>
					</div>
				{:catch error}
					<p style="color: red">{error.message}</p>
				{/await}
			{/if}

			<DateFilter></DateFilter>
		</div>
	</svelte:fragment>
	<!-- Page Route Content -->
	{#if data}
		{#await data}
			Loading...
		{:then data}
			<div class="bg-surface-50-900-token h-full">
				<Dashboard {data}></Dashboard>
			</div>
		{/await}
	{/if}
</AppShell>
