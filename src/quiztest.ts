import App from './App.svelte';
import parseQuiztest from './parser.js';
import { Config } from './config.js';
import marked from './customizedMarked.js';
import type { Quiz } from './quiz';
import CryptoJS from 'crypto-js';

export interface Quiztest {
    register(extension: QuiztestExtension): Quiztest
    createApp(rawQuiztest: string, node: Element, config: Config): App;
    parseQuiztest(rawQuiztest: string, config: Config): Quiz;
    init(config: object): void;
    getMarkedParser(): typeof marked;
}

export interface QuiztestExtension {
    setup(quiztest: Quiztest): void;
}

function register(extension: QuiztestExtension): Quiztest {
    extension.setup(this as Quiztest);
    return this as Quiztest;
}

function createApp(rawQuiztest: string, node: Element, config: Config): App {
    node.innerHTML = '';
    let root: ShadowRoot;
    if (!!node.shadowRoot) {
        //clear root if it already exists
        root = node.shadowRoot;
        root.innerHTML = '';
    } else {
        root = node.attachShadow({ mode: 'open' });
    }
    try {
        let quiz = parseQuiztest(rawQuiztest, config);
        let app = new App({
            // https://github.com/sveltejs/svelte/pull/5870
            target: root,
            intro: false,
            props: {
                quiz: quiz,
            },
        });
        return app;
    } catch (e) {
        root.innerHTML = `${e}. App could not render. Please check your quiztest syntax.`;
    }
}

function init(config: object = {}): void {
    let globalConfig = new Config(config);

    if (globalConfig.startOnLoad && typeof document !== 'undefined') {
        window.addEventListener(
            'load',
            function () {
                let nodes = document.querySelectorAll('.quiztest');
                for (let node of nodes) {

                    let data = node.innerHTML.trim();
                    if (data.indexOf('---') < 0) {
                        data = CryptoJS.AES.decrypt(data, key);
                        // @ts-ignore
                        data = data.toString(CryptoJS.enc.Utf8);
                    }
                    createApp(data, node, globalConfig);
                }
            },
            false
        );
    }
}

function getMarkedParser(): typeof marked {
    return marked;
}

let quiztest: Quiztest = {
    init,
    register,
    parseQuiztest,
    createApp,
    getMarkedParser,
};

export default quiztest;
