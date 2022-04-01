import type { EngineInterface, Placement } from '@aomao/engine';
import { PropType, VNode } from 'vue';

//命令
export type Command =
	| { name: string; args: Array<any> }
	| Array<any>
	| undefined;
    //按钮
export const buttonProps = {
	engine: Object as PropType<EngineInterface | undefined>,
	name: {
		type: String,
		required: true,
	} as const,
	icon: String,
	content: [String, Function] as PropType<string | (() => string) | VNode>,
	title: String,
	placement: String as PropType<Placement>,
	hotkey: [String, Object] as PropType<boolean | string | undefined>,
	command: Object as PropType<Command>,
	autoExecute: {
		type: [Boolean, undefined] as PropType<boolean | undefined>,
		default: undefined,
	},
	className: String,
	active: {
		type: [Boolean, undefined] as PropType<boolean | undefined>,
		default: undefined,
	},
	disabled: {
		type: [Boolean, undefined] as PropType<boolean | undefined>,
		default: undefined,
	},
	onClick: Function as PropType<(event: MouseEvent) => void | boolean>,
	onMouseDown: Function as PropType<(event: MouseEvent) => void | boolean>,
	onMouseEnter: Function as PropType<(event: MouseEvent) => void | boolean>,
	onMouseLevel: Function as PropType<(event: MouseEvent) => void | boolean>,
};
//按钮
export type ButtonProps = {
	engine?: EngineInterface
	name: string
	icon?: string
	content?: string | (() => string) | VNode
	title?: string,
	placement?: Placement,
	hotkey?: boolean | string,
	command?: Command,
	autoExecute?: boolean,
	className?: string,
	active?: boolean,
	disabled?: boolean,
	onClick?: (event: MouseEvent) => void | boolean
	onMouseDown?: (event: MouseEvent) => void | boolean
	onMouseEnter?: (event: MouseEvent) => void | boolean
	onMouseLevel?: (event: MouseEvent) => void | boolean
};

//增加type
export type GroupButtonProps = {
	type: 'button';
	values?: any;
} & Omit<ButtonProps, 'engine'>;
//下拉项
export type DropdownListItem = {
	key: string;
	icon?: string;
	content?: string | (() => string);
	hotkey?: boolean | string;
	isDefault?: boolean;
	disabled?: boolean;
	title?: string;
	placement?: Placement;
	className?: string;
	command?: { name: string; args: any[] } | any[];
	autoExecute?: boolean;
};
//下拉列表
export type DropdownListProps = {
	engine?: EngineInterface
	name: string
	direction?: 'vertical' | 'horizontal'
	items: DropdownListItem[]
	values: string | number | string[]
	className?: string
	onSelect?: (event: MouseEvent, key: string) => void | boolean
	hasDot?: boolean
};
//下拉
export type DropdownProps = {
	engine?: EngineInterface
	name: string
	values?: string | number | string[]
	items: DropdownListItem[]
	icon?: string
	content?: string | (() => string)
	title?: string
	disabled?: boolean
	single?: boolean
	className?: string
	direction?: 'vertical' | 'horizontal'
	onSelect?: (event: MouseEvent, key: string) => void | boolean
	hasArrow?: boolean
	hasDot?: boolean
	placement?: Placement
};

export type GroupDropdownProps = {
	type: 'dropdown';
} & Omit<DropdownProps, 'engine'>;

//颜色
export type ColorPickerItemProps = {
	engine: EngineInterface
	color: string
	active: boolean
	setStroke?: boolean
	onSelect?: (color: string, event: MouseEvent) => void
}
//颜色分组
export type ColorPickerGroupProps = {
	engine: EngineInterface
	colors: { value: string; active: boolean }[]
	setStroke?: boolean
	onSelect?: (color: string, event: MouseEvent) => void
};


//picker
export type ColorPickerProps = {
	engine: EngineInterface
	colors?: { value: string; active: boolean }[]
	defaultColor: string
	defaultActiveColor: string
	setStroke?: boolean
	placement?: Placement
	onSelect?: (color: string, event: MouseEvent) => void
};

//color
export type ColorProps = {
	engine?: EngineInterface
	name: string
	content: string | ((color: string, stroke: string, disabled?: boolean) => string)
	buttonTitle?: string
	dropdownTitle?: string
	command?: Command,
	autoExecute?: boolean,
	disabled?: boolean,
} & Omit<ColorPickerProps, 'engine'>

export type GroupColorProps = {
	type: 'color';
} & Omit<ColorProps, 'engine'>;

//collapse item
export type CollapseItemProps = {
	engine?: EngineInterface
	name: string
	icon?: string
	search: string,
	description?: string | (() => string) | VNode
	disabled?: boolean
	prompt?: string | (() => string) | VNode
	title?: string;
	placement?: Placement;
	className?: string;
	command?: { name: string; args: any[] } | any[];
	autoExecute?: boolean;
	onClick?: (event: MouseEvent, name: string) => boolean | void
	onMouseDown?: (event: MouseEvent) => void
	onDisabled?: () => boolean;
};

//collapse group
export type CollapseGroupProps = {
	engine?: EngineInterface
	title?: string
	items: Omit<CollapseItemProps, 'engine'>[]
	onSelect?: (event: MouseEvent, name: string) => boolean | void
};

//collapse
export type CollapseProps = {
	engine?: EngineInterface
	header?: string,
	groups: CollapseGroupProps[],
	disabled?: boolean
	className?: string
	icon?: string
	content?: string | (() => string) | VNode
	onSelect?: (event: MouseEvent, name: string) => boolean | void
};

export type ToolbarCollapseGroupProps = {
	type: 'collapse';
} & Omit<CollapseProps, 'engine'>;

export type GroupProps = {
	engine: EngineInterface
	items?: (GroupButtonProps
        | GroupDropdownProps
        | GroupColorProps
        | ToolbarCollapseGroupProps | string)[]
	icon?: string
	content: string | (() => string) | VNode
};

export type ToolbarButtonProps = {
	onActive?: () => boolean;
	onDisabled?: () => boolean;
} & GroupButtonProps;

export type ToolbarDropdownProps = {
	onActive?: (items: Array<DropdownListItem>) => string | Array<string>;
	onDisabled?: () => boolean;
} & GroupDropdownProps;

export type ToolbarColorProps = {
	onActive?: () => string | Array<string>;
	onDisabled?: () => boolean;
} & GroupColorProps;

export type ToolbarItemProps =
	| ToolbarButtonProps
	| ToolbarDropdownProps
	| ToolbarColorProps
	| ToolbarCollapseGroupProps;

export type GroupItemDataProps = {
	icon?: string;
	content?: string | (() => string) | VNode;
	items: Array<ToolbarItemProps | string>;
};

export type GroupItemProps =
	| Array<
			| ToolbarItemProps
			| string
			| (Omit<ToolbarCollapseGroupProps, 'groups'> & {
					groups: Array<
						Omit<CollapseGroupProps, 'items'> & {
							items: Array<
							string | Omit<CollapseItemProps, 'engine'>
							>;
						}
					>;
			  })
	  >
	| GroupItemDataProps;

export type GroupDataProps = Omit<GroupItemDataProps, 'items'> & {
	items: Array<ToolbarItemProps>;
};

export type ToolbarProps = {
	engine: EngineInterface
	items: Array<ToolbarItemProps | string>
	className?: string
}
