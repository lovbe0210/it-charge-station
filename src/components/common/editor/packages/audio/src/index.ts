import {
	$,
	CardEntry,
	CardInterface,
	CARD_KEY,
	decodeCardValue,
	encodeCardValue,
	isEngine,
	NodeInterface,
	Plugin,
	PluginEntry,
	PluginOptions,
	sanitizeUrl,
	SchemaInterface,
} from '@aomao/engine';
import AudioComponent, { AudioValue } from './component';
import AudioUploader from './uploader';
import locales from './locales';

export interface AudioOptions extends PluginOptions {
	onBeforeRender?: (
		action: 'download' | 'query' | 'cover',
		url: string,
	) => string;
}
export default class AudioPlugin<T extends AudioOptions = AudioOptions> extends Plugin<T> {
	static get pluginName() {
		return 'audio';
	}

	init() {
		this.editor.language.add(locales);
		if (!isEngine(this.editor)) return;
		this.editor.on('parse:html', (node) => this.parseHtml(node));
		this.editor.on('paste:each', (child) => this.pasteHtml(child));
		this.editor.on('paste:schema', (schema: SchemaInterface) =>
			this.pasteSchema(schema),
		);
	}

	execute(
		status: 'uploading' | 'transcoding' | 'done' | 'error',
		url: string,
		name?: string,
		audio_id?: string,
		size?: number,
		download?: string,
	): void {
		const value: AudioValue = {
			status,
			audio_id,
			url,
			name: name || url,
			size,
			download,
		};
		if (status === 'error') {
			value.url = '';
			value.message = url;
		}
		this.editor.card.insert('audio', value);
	}

	async waiting(
		callback?: (
			name: string,
			card?: CardInterface,
			...args: any
		) => boolean | number | void,
	): Promise<void> {
		const { card } = this.editor;
		// 检测单个组件
		const check = (component: CardInterface) => {
			return (
				component.root.inEditor() &&
				(component.constructor as CardEntry).cardName ===
					AudioComponent.cardName &&
				(component as AudioComponent<AudioValue>).getValue()?.status === 'uploading'
			);
		};
		// 找到不合格的组件
		const find = (): CardInterface | undefined => {
			return  card.components.find(check);
		};
		const waitCheck = (component: CardInterface): Promise<void> => {
			let time = 60000;
			return new Promise((resolve, reject) => {
				if (callback) {
					const result = callback(
						(this.constructor as PluginEntry).pluginName,
						component,
					);
					if (result === false) {
						return reject({
							name: (this.constructor as PluginEntry).pluginName,
							card: component,
						});
					} else if (typeof result === 'number') {
						time = result;
					}
				}
				const beginTime = new Date().getTime();
				const now = new Date().getTime();
				const timeout = () => {
					if (now - beginTime >= time) return resolve();
					setTimeout(() => {
						if (check(component)) timeout();
						else resolve();
					}, 10);
				};
				timeout();
			});
		};
		return new Promise((resolve, reject) => {
			const component = find();
			const wait = (component: CardInterface) => {
				waitCheck(component)
					.then(() => {
						const next = find();
						if (next) wait(next);
						else resolve();
					})
					.catch(reject);
			};
			if (component) wait(component);
			else resolve();
		});
	}

	pasteSchema(schema: SchemaInterface) {
		schema.add({
			type: 'block',
			name: 'div',
			attributes: {
				'data-value': '*',
				'data-type': {
					required: true,
					value: AudioComponent.cardName,
				},
			},
		});
	}

	pasteHtml(node: NodeInterface) {
		if (!isEngine(this.editor)) return;
		if (node.isElement()) {
			const type = node.attributes('data-type');
			if (type === AudioComponent.cardName) {
				const value = node.attributes('data-value');
				const cardValue = decodeCardValue(value) as AudioValue;
				if (!cardValue.url) return;
				this.editor.card.replaceNode(
					node,
					AudioComponent.cardName,
					cardValue,
				);
				node.remove();
				return false;
			}
		}
		return true;
	}

	parseHtml(root: NodeInterface) {
		root.find(`[${CARD_KEY}=${AudioComponent.cardName}`).each(
			(cardNode) => {
				const node = $(cardNode);
				const card = this.editor.card.find<AudioValue>(node);
				const value = card?.getValue();
				if (value?.url && value.status === 'done') {
					const { onBeforeRender } = this.options;
					const { url } = value;
					const html = `<div data-type="${
						AudioComponent.cardName
					}"  data-value="${encodeCardValue(
						value,
					)}"><audio controls src="${sanitizeUrl(
						onBeforeRender ? onBeforeRender('query', url) : url,
					)}" webkit-playsinline="webkit-playsinline" playsinline="playsinline" style="outline:none;" /></div>`;
					node.empty();
					node.replaceWith($(html));
				} else node.remove();
			},
		);
	}
}

export { AudioComponent, AudioUploader };
