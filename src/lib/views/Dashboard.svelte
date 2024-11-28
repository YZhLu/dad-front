<script lang="ts">
	import CandlestickCombo from '$lib/components/charts/CandlestickCombo.svelte';
	import SlopeBasic from '$lib/components/charts/SlopeBasic.svelte';
	import SlopeMultiGroup from '$lib/components/charts/SlopeMultiGroup.svelte';
	import Stepline from '$lib/components/charts/Stepline.svelte';
	import ZoomableTimeseries from '$lib/components/charts/ZoomableTimeseries.svelte';
	import DashboardButton from '$lib/components/DashboardButton.svelte';
	import { getHistorical } from '$lib/services/getHistorical';
	import type { Chart } from '$lib/utils/Wrapper';
	import type { ApexOptions } from 'apexcharts';
	import { onMount } from 'svelte';
	import { tooltips } from './tooltips';

	export let store: any;

	let chart4: Chart;
	let _series4: ApexAxisChartSeries;
	let title4: ApexTitleSubtitle = {
		text: 'Historical Data',
		align: 'left'
	};

	const { series4 } = store;

	let slopO: ApexOptions = {
		chart: {
			type: 'line'
		}
	};

	let classes = 'bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500';

	let modalData = {
		classes
		// atributes
	};

	onMount(async () => {
		_series4 = [
			{
				name: 'Bitcoin2',
				data: await getHistorical('bitcoin', 'usd', 1)
			}
		];

		chart4.ref?.updateSeries(_series4);
	});

	$: {
		if (chart4) {
			chart4.ref?.updateSeries($series4);
		}
	}
</script>

<main
	class="bg-surface-50-900-token p-2 md:p-4 lg:grid-rows-[1fr,1fr,1fr] 2xl:grid 2xl:grid-cols-[3fr,2fr] 2xl:gap-4"
>
	<div id="c1" class="p-2 lg:p-4 lg:h-[25dvh]">
		<div class="w-full h-full">
			<DashboardButton component="radar" {modalData} tooltip={tooltips[0]} title="Atributos">
				<ZoomableTimeseries></ZoomableTimeseries>
			</DashboardButton>
		</div>
	</div>
	<div id="c2" class="flex flex-col p-2 gap-4 md:flex-row lg:p-4 lg:pt-0 lg:h-[25dvh]">
		<div class="md:w-[40%] h-full">
			<DashboardButton component="radar" {modalData} tooltip={tooltips[1]} title="Atributos">
				<Stepline></Stepline>
			</DashboardButton>
		</div>
		<div class="md:w-[60%] h-full">
			<DashboardButton component="radar" {modalData} tooltip={tooltips[2]} title="Atributos">
				<CandlestickCombo></CandlestickCombo>
			</DashboardButton>
		</div>
	</div>
	<div
		id="c3"
		class="flex flex-col p-2 gap-4 md:grid md:grid-cols-[6fr,4fr] lg:h-[27dvh] lg:grid-cols-[20fr,45fr,35fr] md:grid-rows-2 lg:grid-rows-1 lg:p-4 lg:pt-0 2xl:col-start-2 2xl:row-start-1 2xl:col-span-1 2xl:row-span-2 2xl:grid-cols-1 2xl:grid-rows-3 2xl:h-[90vh] 2xl:pt-4"
	>
		<div
			class="h-full md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-1 lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-1 2xl:row-start-2"
		>
			<DashboardButton component="radar" {modalData} tooltip={tooltips[4]} title="Atributos">
				<SlopeMultiGroup options={slopO}></SlopeMultiGroup>
			</DashboardButton>
		</div>

		<div
			class="h-full lg:col-start-2 lg:row-start-1 lg:col-span-1 lg:row-span-1 md:col-start-1 md:col-span-2 md:row-start-1 2xl:col-start-1 2xl:row-start-1"
		>
			<DashboardButton component="radar" {modalData} tooltip={tooltips[0]} title="Atributos">
				<ZoomableTimeseries series={_series4} title={title4} bind:chart={chart4}
				></ZoomableTimeseries>
			</DashboardButton>
		</div>

		<div
			class="h-full lg:col-start-3 lg:row-start-1 lg:col-span-1 lg:row-span-1 md:col-start-2 md:row-start-2 md:col-span-1 md:row-span-1 2xl:col-start-1 2xl:row-start-3"
		>
			<DashboardButton component="radar" {modalData} tooltip={tooltips[3]} title="Atributos"
				><SlopeBasic></SlopeBasic></DashboardButton
			>
		</div>
	</div>
</main>
