//按钮
exports.buttonProps = {
    engine: Object,
    name: {
        type: String,
        required: true
    },
    icon: String,
    content: [String, Function],
    title: String,
    placement: String,
    hotkey: [String, Object],
    command: Object,
    autoExecute: {
        type: [Boolean, undefined],
        "default": undefined
    },
    className: String,
    active: {
        type: [Boolean, undefined],
        "default": undefined
    },
    disabled: {
        type: [Boolean, undefined],
        "default": undefined
    },
    onClick: Function,
    onMouseDown: Function,
    onMouseEnter: Function,
    onMouseLevel: Function
};
