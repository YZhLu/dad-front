<script lang="ts">
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	type CurrencyOption = AutocompleteOption<string>;

	let inputCoin = '';
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupCoin',
		placement: 'bottom'
	};

	export let coinOptions: any[];

	export let options: any = coinOptions?.slice(0,1000).map((o: any) => {
		return { ...o, label: o.name, value: o.id };
	});

	function onPopupDemoSelect(event: CustomEvent<any>): void {
		inputCoin = event.detail.label;
		dispatch('currency-selected', {
			coin: inputCoin
		});
	}
</script>

<input
	class="input autocomplete w-48 h-8"
	type="search"
	name="coin-search"
	bind:value={inputCoin}
	placeholder="Search coin..."
	use:popup={popupSettings}
/>

<div data-popup="popupCoin" class="card w-48 shadow-xl py-2">
	<div class="arrow bg-surface-800-100-token" />
	<div class="h-40 overflow-y-auto">
		<Autocomplete
			bind:input={inputCoin}
			{options}
			on:selection={onPopupDemoSelect}
		/>
	</div>
</div>
