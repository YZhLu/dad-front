<script lang="ts">
	import type { ModalSettings /*, ModalComponent */, PopupSettings } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';

	export let modalData: any;
	export let component: string;
	export let title: string;
	export let tooltip = 'Its a Chart!';

	const modalStore = getModalStore();

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

	const popupHelp: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: `popupHelp-${tooltip}`,
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

	function hdlHelp(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		console.log(`help me`);
	}
</script>

<div
	class="card p-4 w-72 shadow-xl z-20 bg-gray-300 dark:bg-black dark:text-white"
	data-popup="popupHelp-{tooltip}"
>
	<div>
		<p>
			{tooltip}
		</p>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>

<div class="h-full w-full p-2 border-gray-300 rounded-md border">
	<div class="h-[90%]">
		<slot />
	</div>
	<div class="h-[10%] flex justify-between px-2">
		<button on:click={hdlHelp} use:popup={popupHelp}
			><Icon icon="arcticons:symbol-question-mark" /></button
		>
		<button on:click={modalComponentFullscreen}><Icon icon="lsicon:screen-full-outline" /></button>
	</div>
</div>
