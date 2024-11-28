<script lang="ts">
	import CoinFilter from '$lib/components/filters/CoinFilter.svelte';
	import CurrencyFilter from '$lib/components/filters/CurrencyFilter.svelte';
	import DateFilter from '$lib/components/filters/DateFilter.svelte';
	import Dashboard from '$lib/views/Dashboard.svelte';

	import * as api from '$lib/services/api';
	import { onMount } from 'svelte';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { findOrCreateStore } from '$lib/views/dashboarStore';

	const storeKey = 'unique-key';
	let store = findOrCreateStore(storeKey);
	let currencyOptions: string[];
	let coinOptions: string[];

	const { dateSpan, currency } = store;

	async function getCurrencies() {
		return await api.get('simple/supported_vs_currencies');
	}

	async function getCoins() {
		return await api.get('coins/list');
	}

	async function hdlCurrencySelection(e: CustomEvent<any>): Promise<void> {
		store.currency.set(e.detail.currency);
		store.updateSeries4($currency);
	}

	async function hdlDateSelection(e: CustomEvent<any>): Promise<void> {
		store.dateSpan.set(e.detail.dateSpan);
		store.updateSeries4($dateSpan);
	}

	function hdlCoinSelection(e: CustomEvent<any>): void {
		throw new Error('Function not implemented.');
	}

	onMount(async () => {
		currencyOptions = await getCurrencies();
		coinOptions = await getCoins();
	});
</script>

<AppShell slotFooter="z-10 p-2 px-4 flex justify-end bg-surface-100-800-token">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-lg uppercase">DAD</strong>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<div class="flex gap-3">
					{#if coinOptions}
						{#await coinOptions}
							<p>Loading...</p>
						{:then coinOptions}
							<div class="">
								<CoinFilter {coinOptions} on:currency-selected={hdlCoinSelection}></CoinFilter>
							</div>
						{:catch error}
							<p style="color: red">{error.message}</p>
						{/await}
					{/if}
				</div>

				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<div class="flex gap-3 overflow-auto">
			{#if currencyOptions}
				{#await currencyOptions}
					<p>Loading...</p>
				{:then currencyOptions}
					<div class="">
						<CurrencyFilter {currencyOptions} on:currency-selected={hdlCurrencySelection}
						></CurrencyFilter>
					</div>
				{:catch error}
					<p style="color: red">{error.message}</p>
				{/await}
			{/if}

			<DateFilter on:date-selected={hdlDateSelection}></DateFilter>
		</div>
	</svelte:fragment>
	<!-- Page Route Content -->

	<div class="bg-surface-50-900-token h-full">
		<Dashboard {store}></Dashboard>
	</div>
</AppShell>
