<script lang="ts">
	import { renderChart, type Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';

	let _options: ApexOptions = {
		chart: {
          height: 350,
          width: 400,
          type: 'line',
        },
        plotOptions: {
          line: {
            isSlopeChart: true,
          },
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
