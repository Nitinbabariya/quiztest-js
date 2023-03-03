import katex from 'katex';
import type { QuiztestExtension } from '../quiztest.js';

interface KatexToken {
    type: 'katex';
    raw: string;
    formula: string;
    displayMode: boolean;
}

const rule = RegExp(/^(\$+)([^\$]|[^\$][\s\S]*?[^\$])\1(?!\$)/);

let markedExtension = {
    name: 'katex',
    level: 'inline',
    start(src): number {
        let idx: number = src.match(/(\$){1,2}/)?.index;
        return idx;
    },
    tokenizer(src): KatexToken | undefined {
        const match = rule.exec(src);
        if (match) {
            return {
                type: 'katex',
                raw: match[0],
                formula: match[2].trim(),
                displayMode: match[1] === '$$',
            };
        }
    },
    renderer(token: KatexToken) {
        return katex.renderToString(token.formula, {
            displayMode: token.displayMode,
        });
    },
};

let quiztestKatex: QuiztestExtension = {
    setup: function (quiztest) {
        // type definition seems outdated, because this is the correct usage
        // @ts-ignore
        quiztest.getMarkedParser().use({ extensions: [markedExtension] });
    },
};

export default quiztestKatex;
