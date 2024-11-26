<script lang="ts">
	import { dataSeries } from '$lib/assets/irregular-data-series';
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
			data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
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
	<Stepline {series} {title}></Stepline>
</div>
