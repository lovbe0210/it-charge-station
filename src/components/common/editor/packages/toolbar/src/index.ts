import Toolbar from './components/toolbar.vue';
import {
	getToolbarDefaultConfig,
	fontFamilyDefaultData,
	fontfamily,
} from './config';
import ToolbarPlugin, { ToolbarComponent } from './plugin';
import type { ToolbarOptions } from './plugin';
import type { ToolbarProps, GroupItemProps, ToolbarItemProps } from './types';

export default Toolbar;
export {
	ToolbarPlugin,
	ToolbarComponent,
	getToolbarDefaultConfig,
	fontFamilyDefaultData,
	fontfamily,
};
export type { ToolbarOptions, ToolbarProps, GroupItemProps, ToolbarItemProps };
