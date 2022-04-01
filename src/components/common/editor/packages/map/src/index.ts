import {
	$,
	Plugin,
	isEngine,
	NodeInterface,
	CARD_KEY,
	SchemaInterface,
	PluginOptions,
    encodeCardValue,
    decodeCardValue,
    CardType,
} from '@aomao/engine';
import MapComponent from './component';
import type { MapValue } from './component';
import locales from './locales';

export interface MapOptions extends PluginOptions {
	hotkey?: string | Array<string>;
}

export default class<T extends MapOptions = MapOptions> extends Plugin<T> {
	static get pluginName() {
		return 'map';
	}

	init() {
		this.editor.language.add(locales);
		this.editor.on('paser:html', (node) => this.parseHtml(node));
		this.editor.on('paste:schema', (schema) => this.pasteSchema(schema));
		this.editor.on('paste:each', (child) => this.pasteHtml(child));
	}

	execute(item: MapValue) {
		if (!isEngine(this.editor)) return;
		const { card } = this.editor;
		card.insert(MapComponent.cardName, {
			...item
		});
	}

	hotkey() {
		return this.options.hotkey || '';
	}


	pasteSchema(schema: SchemaInterface) {
		schema.add({
			type: 'block',
			name: 'div',
			attributes: {
				'data-type': {
					required: true,
					value: MapComponent.cardName,
				},
				'data-value': '*',
			},
		});
        schema.add({
			type: 'inline',
			name: 'span',
			attributes: {
				'data-type': {
					required: true,
					value: MapComponent.cardName,
				},
				'data-value': '*',
			},
		});
	}

	pasteHtml(node: NodeInterface) {
		if (!isEngine(this.editor)) return;
		if (node.isElement()) {
			const type = node.attributes('data-type');
			if (type === MapComponent.cardName) {
				const value = node.attributes('data-value');
				const cardValue = decodeCardValue(value);
				if (!cardValue.url) return;
				this.editor.card.replaceNode(
					node,
					MapComponent.cardName,
					cardValue,
				);
				node.remove();
				return false;
			}
		}
		return true;
	}

	parseHtml(root: NodeInterface) {
		root.find(`[${CARD_KEY}=${MapComponent.cardName}`).each((cardNode) => {
			const node = $(cardNode);
			const card = this.editor.card.find(node) as MapComponent;
			const value = card?.getValue();
			if (value) {
                const tagName = card.type === CardType.INLINE ? 'span' : 'div'
				const html = `<${tagName} data-type="${
					card.type
				}" data-value="${encodeCardValue(value)}"></${tagName}>`;
				node.empty();
				node.replaceWith($(html));
			} else node.remove();
		});
	}
}
export { MapComponent, MapValue };
