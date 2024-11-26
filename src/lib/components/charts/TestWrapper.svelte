<script lang="ts">
	import { renderChart, type Chart } from '$lib/utils/Wrapper';

	const chart: Chart = {
		options: {
			series: [
				{
					name: 'Desktops',
					data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
				}
			],
			chart: {
				height: 350,
				type: 'line',
				zoom: {
					enabled: false
				}
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: 'straight'
			},
			title: {
				text: 'Product Trends by Month',
				align: 'left'
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5
				}
			},
			xaxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
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
