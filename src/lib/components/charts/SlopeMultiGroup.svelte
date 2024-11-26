<script lang="ts">
	import { renderChart, type Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';

	let _options: ApexOptions = {
		chart: {
          height: 350,
          width: 600,
          type: 'line',
        },
        plotOptions: {
          line: {
            isSlopeChart: true,
          },
        },
        tooltip: {
          followCursor: true,
          intersect: false,
          shared: true,
        },
        dataLabels: {
          background: {
            enabled: true,
          },
          formatter(val, opts) {
            const seriesName = opts.w.config.series[opts.seriesIndex].name
            return val !== null ? seriesName : ''
          },
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
          },
        },
        xaxis: {
          position: 'bottom',
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left',
        },
        stroke: {
          width: [2, 3, 4, 2],
          dashArray: [0, 0, 5, 2],
          curve: 'smooth',
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
