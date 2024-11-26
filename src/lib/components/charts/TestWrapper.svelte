<script lang="ts">
	import { dataSeries } from '$lib/assets/irregular-data-series';
	import { renderChart, type Chart } from '$lib/utils/Wrapper';

	let ts2 = 1484418600000;
	let dates = [];
	let spikes = [5, -5, 3, -3, 8, -8];

	for (let i = 0; i < 120; i++) {
		ts2 = ts2 + 86400000;
		let innerArr = [ts2, dataSeries[1][i].value];
		dates.push(innerArr);
	}
	console.log('dates', dates);

	const chart: Chart = {
		options: {
			series: [
				{
					name: 'XYZ MOTORS',
					data: dates
				}
			],
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
			title: {
				text: 'Stock Price Movement',
				align: 'left'
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
					formatter: function (val) {
						return (val / 1000000).toFixed(0);
					}
				}
			}
		}
	};
</script>

<!-- After the chart is created, chart.ref and chart.node are set. -->
<!-- This allows all ApexCharts methods to be used. (e.g. dataURI) -->
<div use:renderChart={chart}></div>

<!-- When the <div> element is unmounted, the chart gets destroyed. -->

<button
	type="button"
	on:click={() => {
		// chart.node is also available, which points to the <div> element.
		chart.ref?.updateSeries([{ data: [7, 10, 20, 23] }]);
		chart.ref?.updateOptions({
			theme: {
				mode: /* checkDarkMode() ? 'dark' : */ 'light',
				palette: 'palette10',
				monochrome: {
					enabled: false,
					color: '#255aee',
					shadeTo: /* checkDarkMode() ? 'dark' :  */ 'light',
					shadeIntensity: 0.65
				}
			}
		});
	}}
>
	Update Series
</button>
