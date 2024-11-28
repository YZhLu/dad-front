<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	let dateSpan: number = 1;

	const dispatch = createEventDispatcher();

	function dispatchDateSpan() {
		dispatch('date-selected', {
			dateSpan
		});
	}
</script>

<div on:change={dispatchDateSpan} class="flex h-8">
	<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary" class="">
		<RadioItem bind:group={dateSpan} name="justify" value={1} class="h-6 text-xs">1D</RadioItem>
		<RadioItem bind:group={dateSpan} name="justify" value={7} class="h-6 text-xs">7D</RadioItem>
		<RadioItem bind:group={dateSpan} name="justify" value={30} class="h-6 text-xs">1M</RadioItem>
		<RadioItem bind:group={dateSpan} name="justify" value={90} class="h-6 text-xs">3M</RadioItem>
		<RadioItem bind:group={dateSpan} name="justify" value={365} class="h-6 text-xs">1Y</RadioItem>
		<!-- <RadioItem bind:group={dateSpan} name="justify" value={'ALL'} class="h-6 text-xs">ALL</RadioItem> -->
	</RadioGroup>
</div>
