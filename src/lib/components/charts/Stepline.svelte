<script lang="ts">
	import { renderChart, type Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';

	let _options: ApexOptions = {
		chart: {
			type: 'line',
			height: 350
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

	export let series: ApexAxisChartSeries;
	export let title: ApexTitleSubtitle;
	export let options = _options;

	const chart: Chart = {
		options: { ...options, series, title }
	};
</script>

<!-- After the chart is created, chart.ref and chart.node are set. -->
<!-- This allows all ApexCharts methods to be used. (e.g. dataURI) -->
<div use:renderChart={chart}></div>

<!-- When the <div> element is unmounted, the chart gets destroyed. -->
