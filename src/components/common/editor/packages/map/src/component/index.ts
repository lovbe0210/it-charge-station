import { $, Card, CardToolbarItemOptions, CardType, CardValue, isEngine, isMobile, NodeInterface, ToolbarItemOptions } from '@aomao/engine'
import autosize from 'autosize'
import './index.less'

export interface MapValue extends CardValue {
    title: string
    address: string
    url?: string
    province?: string
    city?: string
    staticUrl?: string
    point: {
        lat: number
        lng: number
    }
}

class MapComponent<V extends MapValue = MapValue> extends Card<V> {
    
    static get cardName () {
        return 'map'
    }

    static get cardType () {
        return CardType.BLOCK
    }

    static get autoSelected() {
		return false;
	}

	static get singleSelectable(){
		return false
	}

	#container?: NodeInterface

    toolbar(): Array<CardToolbarItemOptions | ToolbarItemOptions> {
		if (!isEngine(this.editor) || this.editor.readonly) return [];
		const { language } = this.editor;
		const items: Array<CardToolbarItemOptions | ToolbarItemOptions> = [
			{
				type: 'copy',
			},
			{
				type: 'delete',
			},
		];

		return items.concat([
			{
				type: 'button',
				content: '<span class="data-icon data-icon-block-image"></span>',
				title: language.get<string>('map', 'displayBlockTitle'),
				onClick: () => {
					this.type = CardType.BLOCK;
				},
			},
			{
				type: 'button',
				content: '<span class="data-icon data-icon-inline-image"></span>',
				title: language.get<string>('map', 'displayBlockTitle'),
				onClick: () => {
					this.type = CardType.INLINE;
				},
			},
		]);
	}

    render(){
        const value = this.getValue()
		
        const container = this.type === CardType.BLOCK ? $(`<div class="map-container">
            <div  class="title"><textarea>${value?.title}</textarea></div>
            <div class="address">${value?.address}</div>
            <div class="img"><img src=${value?.staticUrl} /></div>
        </div>`) : $(`<span class="map-container-inline"><a>
		<span><svg class="icon" viewBox="0 0 1024 1024" fill="currentColor" width="1.143em" height="1.143em" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 938.666667c-53.333333 0-384-257.258667-384-469.333334S299.925333 85.333333 512 85.333333s384 171.925333 384 384-330.666667 469.333333-384 469.333334z m0-352c64.8 0 117.333333-52.533333 117.333333-117.333334s-52.533333-117.333333-117.333333-117.333333-117.333333 52.533333-117.333333 117.333333 52.533333 117.333333 117.333333 117.333334z"></path></svg></span>
		<span>${value?.title}</span></a></span>`)
		const textarea = container.find('textarea')
		autosize(textarea.get<HTMLTextAreaElement>()!)
		textarea.on('input', () => {
			this.setValue({
				title: textarea.get<HTMLTextAreaElement>()?.value
			} as V)
		})
		this.#container = container
        return  this.#container
    }

    didRender(){
        super.didRender()
        if(this.type === CardType.BLOCK) this.toolbarModel?.setOffset([-120,0])
        else this.toolbarModel?.setOffset([0,0])
    }

	destroy(){
		const textarea = this.#container?.find('textarea')
		if(textarea) {
			autosize.destroy(textarea.get<HTMLTextAreaElement>()!)
		}
		super.destroy()
	}
}

export default MapComponent