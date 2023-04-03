import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import batch from 'highlight.js/lib/languages/dos';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import go from 'highlight.js/lib/languages/go';
import c from 'highlight.js/lib/languages/c';
import csharp from 'highlight.js/lib/languages/csharp';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import makefile from 'highlight.js/lib/languages/makefile';
import powershell from 'highlight.js/lib/languages/powershell';
import type { QuiztestExtension } from '../quiztest.js';

// this does not work....
// ['javascript', 'python', 'bash'].forEach(async (langName) => {
//     const langModule = await import(`highlight.js/lib/languages/${langName}`);
//     hljs.registerLanguage(langName, langModule);
// });

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('batch', batch);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('go', go);
hljs.registerLanguage('c', c);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('dockerfile',dockerfile);
hljs.registerLanguage('makefile', makefile);
hljs.registerLanguage('powershell', powershell );

function highlighter(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'bash';
    return hljs.highlight(code, { language: validLanguage }).value;
}

let quiztestHighlight: QuiztestExtension = {
    setup: function (quiztest) {
        quiztest
            .getMarkedParser()
            .setOptions({ highlight: highlighter, langPrefix: 'hljs lang-' });
    },
};

export default quiztestHighlight;
