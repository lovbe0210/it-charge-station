<template>
    <a-config-provider :auto-insert-space-in-button=false>
        <div data-element="ui" :class="['data-link-editor', className]">
            
            <p>{{textTitle}}</p>
            <p>
                <a-input
                class="data-link-input"
                :value="text"
                :placeholder="textPlaceholder"
                @change="onTextChange($event.target.value)"
                />
            </p>
            <p>{{linkTitle}}</p>
            <p>
                <a-input
                ref="linkRef"
                class="data-link-input"
                :value="link"
                :placeholder="linkPlaceholder"
                @change="onLinkChange($event.target.value)"
                />
            </p>
            <p>
                <a-button
                class="data-link-button"
                @click="onOk(text, link)"
                :disabled="link.trim() === ''"
                >
                    {{buttonTitle}}
                </a-button>
            </p>
        </div>
    </a-config-provider>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LanguageInterface } from '@aomao/engine'
import { ConfigProvider, Input, Button } from 'ant-design-vue';
Vue.use(Input)
Vue.use(ConfigProvider)
Vue.use(Button)
@Component({
    components: {
        'a-config-provider': ConfigProvider,
        'a-input': Input,
        'a-button': Button
    },
})
export default class LinkEditor extends Vue {
    @Prop({ type: Object, required: true}) language!: LanguageInterface
    @Prop(String) defaultText?: string
    @Prop(String) defaultLink?: string
    @Prop(String) className?: string
    @Prop(Function) onLoad?: () => void
    @Prop(Function) onOk?: (text: string, link: string) => void

    text = ''
    link = ''    
    textTitle = ''
    textPlaceholder = ''
    linkTitle = ''
    linkPlaceholder = ''
    buttonTitle = ''

    mounted(){
        this.text = this.defaultText || ''
        this.link = this.defaultLink || ''
        this.textTitle = this.language.get<string>('link', 'text')
        this.textPlaceholder = this.language.get<string>('link', 'text_placeholder')
        this.linkTitle = this.language.get<string>('link', 'link')
        this.linkPlaceholder = this.language.get<string>('link', 'link_placeholder')
        this.buttonTitle = this.language.get<string>('link', 'ok_button');

        setTimeout(() => {
            (this.$refs.linkRef as HTMLInputElement)?.focus();
            if (this.onLoad) this.onLoad();
        }, 200);
    }
    
    onTextChange(value:string){
        this.text = value
    }

    onLinkChange(value:string){
        this.link = value
    }
}
</script>
