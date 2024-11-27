<script lang="ts">
	import type { ModalSettings /*, ModalComponent */ } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export let modalData: any;
	export let component: string;
	export let title: string;

	function modalComponentFullscreen(): void {
		console.log('chamou');
		const modal: ModalSettings = {
			type: 'component',
			component /* : 'fullScreen' */,
			title /* : 'Full screen Modal' */,
			backdropClasses: '!p-0',
			meta: { modalData }
		};
		modalStore.trigger(modal);
	}


	function hdlHelp(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
		throw new Error('Function not implemented.');
	}
</script>

<div class="h-full w-full p-2 border-gray-300 rounded-md border">
	<div class="h-[90%]">
		<slot />
	</div>
	<div class="h-[10%] flex justify-between px-2">
		<button on:click={hdlHelp}
			><Icon icon="arcticons:symbol-question-mark" /></button
		>
		<button on:click={modalComponentFullscreen}><Icon icon="lsicon:screen-full-outline" /></button>
	</div>
</div>
