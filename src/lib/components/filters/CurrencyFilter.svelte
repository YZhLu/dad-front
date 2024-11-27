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

	let inputPopupDemo = '';
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	export let currencyOptions: string[];
	export let options: CurrencyOption[] = currencyOptions?.map((o: string) => {
		return { label: o, value: o };
	});

	function onPopupDemoSelect(event: CustomEvent<CurrencyOption>): void {
		inputPopupDemo = event.detail.label;
		dispatch('currency-selected', {
			currency: inputPopupDemo
		});
	}
</script>

<input
	class="input autocomplete w-48"
	type="search"
	name="autocomplete-search"
	bind:value={inputPopupDemo}
	placeholder="Select currency..."
	use:popup={popupSettings}
/>

<div data-popup="popupAutocomplete" class="card w-48 shadow-xl py-2 ">
	<div class="arrow bg-surface-800-100-token" />
	<div class="h-40 overflow-y-auto">
		<Autocomplete
			bind:input={inputPopupDemo}
			{options}
			on:selection={onPopupDemoSelect}
		/>
	</div>
</div>
