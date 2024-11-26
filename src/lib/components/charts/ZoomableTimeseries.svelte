<script lang="ts">
	import { renderChart, type Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';

	let _options: ApexOptions = {
		chart: {
			type: 'area',
			stacked: false,
			height: 350,
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true
			},
			toolbar: {
				autoSelected: 'zoom'
			}
		},
		dataLabels: {
			enabled: false
		},
		markers: {
			size: 0
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				inverseColors: false,
				opacityFrom: 0.5,
				opacityTo: 0,
				stops: [0, 90, 100]
			}
		},
		yaxis: {
			labels: {
				formatter: function (val) {
					return (val / 1000000).toFixed(0);
				}
			},
			title: {
				text: 'Price'
			}
		},
		xaxis: {
			type: 'datetime'
		},
		tooltip: {
			shared: false,
			y: {
				// formatter: function (val) {
				// 	return (val / 1000000).toFixed(0);
				// }
			}
		}
	};

	export let series:ApexAxisChartSeries;
	export let title:ApexTitleSubtitle;
	export let options = _options;
	//export let chartRef: Chart;
	
    export let chart: Chart = {
		options: { ...options, series, title }
	};
</script>

<!-- After the chart is created, chart.ref and chart.node are set. -->
<!-- This allows all ApexCharts methods to be used. (e.g. dataURI) -->
<div use:renderChart={chart}></div>

<!-- When the <div> element is unmounted, the chart gets destroyed. -->
