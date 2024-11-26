<script lang="ts">
	import { onMount } from 'svelte';
	import * as api from '$lib/services/api';
	import ZoomableTimeseries from '$lib/components/charts/ZoomableTimeseries.svelte';
	import type { Chart } from '$lib/utils/Wrapper';

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

		const prices: [number, number][] = body.prices.map((t: any) => {return [t[0],t[1]*1000000]});

		console.log(prices);
		return prices;
	}

	onMount(async () => {
		series = [
			{
				name: 'Bitcoin2',
				data: await get_btc()
			}
		];

		chart.ref?.updateSeries(series);
	});
</script>

<div class="h-full w-full">
	<ZoomableTimeseries {series} {title} bind:chart></ZoomableTimeseries>
</div>
