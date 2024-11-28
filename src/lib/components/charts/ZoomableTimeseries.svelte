<script lang="ts">
	import { renderChart, type Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';

	import { dataSeries } from '$lib/assets/irregular-data-series';

	let ts2 = 1484418600000;
	let dates = [];
	let spikes = [5, -5, 3, -3, 8, -8];

	for (let i = 0; i < 120; i++) {
		ts2 = ts2 + 86400000;
		let innerArr = [ts2, dataSeries[1][i].value];
		dates.push(innerArr);
	}

	let _options: ApexOptions = {
		chart: {
			type: 'area',
			stacked: false,
			height: '100%',
			width: '100%',
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
					return (`${val}`)/// 1000000).toFixed(0);
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

	export let series: ApexAxisChartSeries = [
		{
			name: 'XYZ MOTORS',
			data: dates
		}
	];
	export let title: ApexTitleSubtitle = {
				text: 'TEST DATA',
				align: 'left'
			};
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
