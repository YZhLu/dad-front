/* 
	Based on svelte-chart-apex by hyunbinseo <https://github.com/hyunbinseo>
 */

import type ApexCharts from 'apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { Action } from 'svelte/action';

export type Chart = {
	options: ApexOptions;
	node?: HTMLDivElement;
	ref?: ApexCharts;
};

export const renderChart: Action<HTMLDivElement, Chart> = (node, parameter) => {
	import('apexcharts')
		.then((module) => module.default)
		.then((ApexCharts) => {
			const chart = new ApexCharts(node, parameter.options);
			parameter.node = node;
			parameter.ref = chart;
			chart.render();
		});
	return {
		// { destroy: parameter.ref?.destroy } causes error.
		destroy: () => {
			parameter.ref?.destroy();
		}
	};
};