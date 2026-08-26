import { LightningElement } from 'lwc';

const MAX_LENGTH = 500;

export default class RichTextCharCounter extends LightningElement {
    value = '';
    lastValidValue = '';
    charCount = 0;

get remainingChars() {
    return MAX_LENGTH - this.charCount;
}

get counterText() {
    return `${this.remainingChars} / ${MAX_LENGTH}`;
}

    handleRichTextChange(event) {
        const raw = event?.detail?.value ?? event?.target?.value ?? '';
        const text = new DOMParser().parseFromString(raw, 'text/html').body.textContent || '';
        const safe = text.length > MAX_LENGTH ? text.slice(0, MAX_LENGTH) : text;
        const html = raw.replace(/<[^>]+>/g, '');
        const finalHtml = html.length > MAX_LENGTH ? html.slice(0, MAX_LENGTH) : raw;

        this.value = finalHtml;
        this.lastValidValue = finalHtml;
        this.charCount = safe.length;

        const editor = this.template.querySelector('lightning-input-rich-text');
        if (editor && editor.value !== finalHtml) {
            editor.value = finalHtml;
        }
    }
}
