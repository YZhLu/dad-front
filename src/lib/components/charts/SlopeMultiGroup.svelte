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
		},
		tooltip: {
			followCursor: true,
			intersect: false,
			shared: true
		},
		dataLabels: {
			background: {
				enabled: true
			},
			formatter(val, opts) {
				const seriesName = opts.w.config.series[opts.seriesIndex].name;
				return val !== null ? seriesName : '';
			}
		},
		yaxis: {
			show: true,
			labels: {
				show: true
			}
		},
		xaxis: {
			position: 'bottom'
		},
		legend: {
			show: true,
			position: 'top',
			horizontalAlign: 'left'
		},
		stroke: {
			width: [2, 3, 4, 2],
			dashArray: [0, 0, 5, 2],
			curve: 'smooth'
		}
	};

	export let series: ApexAxisChartSeries = [
		{
			name: 'Blue',
			data: [
				{
					x: 'Category 1',
					y: 503
				},
				{
					x: 'Category 2',
					y: 580
				},
				{
					x: 'Category 3',
					y: 135
				}
			]
		},
		{
			name: 'Green',
			data: [
				{
					x: 'Category 1',
					y: 733
				},
				{
					x: 'Category 2',
					y: 385
				},
				{
					x: 'Category 3',
					y: 715
				}
			]
		},
		{
			name: 'Orange',
			data: [
				{
					x: 'Category 1',
					y: 255
				},
				{
					x: 'Category 2',
					y: 211
				},
				{
					x: 'Category 3',
					y: 441
				}
			]
		},
		{
			name: 'Red',
			data: [
				{
					x: 'Category 1',
					y: 428
				},
				{
					x: 'Category 2',
					y: 749
				},
				{
					x: 'Category 3',
					y: 559
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
