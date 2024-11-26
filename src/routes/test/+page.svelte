<script lang="ts">
	import { dataSeries } from '$lib/assets/irregular-data-series';
	import { seriesData } from '$lib/assets/ohlc';
	import CandlestickCombo from '$lib/components/charts/CandlestickCombo.svelte';
	import Stepline from '$lib/components/charts/Stepline.svelte';
	// import TestWrapper from '$lib/components/charts/TestWrapper.svelte';
	// import ZoomableTimeseries from '$lib/components/charts/ZoomableTimeseries.svelte';

	let ts2 = 1484418600000;
	let dates = [];
	let spikes = [5, -5, 3, -3, 8, -8];

	for (let i = 0; i < 120; i++) {
		ts2 = ts2 + 86400000;
		let innerArr = [ts2, dataSeries[1][i].value];
		dates.push(innerArr);
	}

	let series = [
		{
			data: seriesData
		}
	];

	let title: ApexTitleSubtitle = {
		text: 'Stepline Chart',
		align: 'left'
	};
</script>

<div class="h-96 w-96">
	<!-- <TestWrapper></TestWrapper> -->
	<!-- <ZoomableTimeseries {series} {title}></ZoomableTimeseries> -->
	<!-- <Stepline {series} {title}></Stepline> -->
	 <CandlestickCombo {series}></CandlestickCombo>
</div>
