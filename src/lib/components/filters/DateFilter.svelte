<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	let dateSpan: string = '1D';

	const dispatch = createEventDispatcher();

	function dispatchDateSpan() {
		dispatch('currency-selected', {
			dateSpan
		});
	}
</script>

<div on:change={dispatchDateSpan}>
	<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
		<RadioItem bind:group={dateSpan} name="justify" value={'1D'}>1D</RadioItem>
		<RadioItem bind:group={dateSpan} name="justify" value={'7D'}>7D</RadioItem>
		<RadioItem bind:group={dateSpan} name="justify" value={'1M'}>1M</RadioItem>
		<RadioItem bind:group={dateSpan} name="justify" value={'3M'}>3M</RadioItem>
		<RadioItem bind:group={dateSpan} name="justify" value={'1Y'}>1Y</RadioItem>
		<RadioItem bind:group={dateSpan} name="justify" value={'ALL'}>ALL</RadioItem>
	</RadioGroup>
</div>
