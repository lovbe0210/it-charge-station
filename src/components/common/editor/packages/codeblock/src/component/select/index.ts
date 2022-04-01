import Vue from 'vue';
import Select from './component.vue';

export { Select };

export default (
	container: HTMLElement,
	modeDatas: { value: string; syntax: string; name: string }[],
	defaultValue: string,
	onSelect?: (value: string) => void,
) => {
	const vm = new Vue({
		render: h => {
			return h(Select, {
				props: {
					modeDatas,
					defaultValue,
					getContainer: container ? () => container : undefined,
					onSelect,
				}
			})
		}
	});
	container.append(vm.$mount().$el);
	return vm;
};
