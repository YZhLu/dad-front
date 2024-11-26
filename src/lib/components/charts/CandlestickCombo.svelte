<script lang="ts">
	import { renderChart, type Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';

	let _options: ApexOptions = {
		chart: {
			type: 'candlestick',
			height: 290,
			id: 'candles',
			toolbar: {
				autoSelected: 'pan',
				show: false
			},
			zoom: {
				enabled: false
			}
		},
		plotOptions: {
			candlestick: {
				colors: {
					upward: '#3C90EB',
					downward: '#DF7D46'
				}
			}
		},
		xaxis: {
			type: 'datetime'
		}
	};

	export let series: ApexAxisChartSeries;
	export let title: ApexTitleSubtitle = {};
	export let options = _options;

	const chart: Chart = {
		options: { ...options, series, title }
	};
</script>

<!-- After the chart is created, chart.ref and chart.node are set. -->
<!-- This allows all ApexCharts methods to be used. (e.g. dataURI) -->
<div use:renderChart={chart}></div>

<!-- When the <div> element is unmounted, the chart gets destroyed. -->
