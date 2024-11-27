<script lang="ts">
	import { seriesData, seriesDataLinear } from '$lib/assets/ohlc';
	import { renderChart, type Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';

	let _options: ApexOptions = {
		chart: {
			type: 'candlestick',
			height: '100%',
      width: '100%',
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

	export let series: ApexAxisChartSeries = [
		{
			data: seriesData
		}
	];
	export let title: ApexTitleSubtitle = {
				text: 'TEST DATA',
				align: 'left'
			};
	export let options = _options;

	let optionsBar = {
          series: [{
          name: 'volume',
          data: seriesDataLinear
        }],
          chart: {
          height: 160,
          type: 'bar',
          brush: {
            enabled: true,
            target: 'candles'
          },
          selection: {
            enabled: true,
            xaxis: {
              min: new Date('20 Jan 2017').getTime(),
              max: new Date('10 Dec 2017').getTime()
            },
            fill: {
              color: '#ccc',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
            }
          },
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
            colors: {
              ranges: [{
                from: -1000,
                to: 0,
                color: '#F15B46'
              }, {
                from: 1,
                to: 10000,
                color: '#FEB019'
              }],
        
            },
          }
        },
        stroke: {
          width: 0
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            offsetX: 13
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        }
        };


	const chart: Chart = {
		options: { ...options, series, title }
	};
	// const chatBar: Chart = {
	// 	// options: {optionsBar}
	// }
</script>

<!-- After the chart is created, chart.ref and chart.node are set. -->
<!-- This allows all ApexCharts methods to be used. (e.g. dataURI) -->
<div use:renderChart={chart}></div>
<!-- <div use:renderChart={chart}></div> -->
<!-- When the <div> element is unmounted, the chart gets destroyed. -->
