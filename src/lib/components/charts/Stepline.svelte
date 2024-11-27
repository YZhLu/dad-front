<script lang="ts">
	import { renderChart, type Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';

	let _options: ApexOptions = {
		chart: {
			type: 'line',
			height: '100%',
			width: '100%',
		},
		stroke: {
			curve: 'stepline'
		},
		dataLabels: {
			enabled: false
		},
		markers: {
			hover: {
				sizeOffset: 4
			}
		}
	};

	export let series: ApexAxisChartSeries = [
		{
			data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
		}
	];
	export let title: ApexTitleSubtitle = {
		text: 'TEST DATA',
		align: 'left'
	};
	export let options = _options;

	const chart: Chart = {
		options: { ...options, series, title }
	};
</script>

<!-- After the chart is created, chart.ref and chart.node are set. -->
<!-- This allows all ApexCharts methods to be used. (e.g. dataURI) -->
<div use:renderChart={chart}></div>

<!-- When the <div> element is unmounted, the chart gets destroyed. -->
