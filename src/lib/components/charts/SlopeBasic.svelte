<script lang="ts">
	import { renderChart, type Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';

	let _options: ApexOptions = {
		chart: {
			height: '100%',
			width: '100%',
			type: 'line'
		},
		plotOptions: {
			line: {
				isSlopeChart: true
			}
		}
	};

	export let series: ApexAxisChartSeries = [
		{
			name: 'Blue',
			data: [
				{
					x: 'Jan',
					y: 43
				},
				{
					x: 'Feb',
					y: 58
				}
			]
		},
		{
			name: 'Green',
			data: [
				{
					x: 'Jan',
					y: 33
				},
				{
					x: 'Feb',
					y: 38
				}
			]
		},
		{
			name: 'Red',
			data: [
				{
					x: 'Jan',
					y: 55
				},
				{
					x: 'Feb',
					y: 21
				}
			]
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
