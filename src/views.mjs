// Terminal isn't used here but has to be imported since it's used as <terminal-emulator /> in the ../views directory
import { Terminal } from "./terminal.mjs";

export class Views {
    #views = {};

    constructor() {
        window.onload = () => {
            // Note: The file system has been prefixed as of Google Chrome 12:
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

            this.defineCustomElements();
        };

        window.addEventListener('hashchange', this.loadView);

        this.loadView(null, location.hash.substring(1) || 'home');
    }

    defineCustomElements = () => {
        customElements.define('terminal-emulator', Terminal);

        customElements.define('md-flex-p', class MdFlexP extends HTMLElement {

            constructor() {
                super();

                this.parentElement.style.display = 'flex';
                // this.parentElement.style.justifyContent = 'space-between';
            }
        });

        customElements.define('navigation-header', class NavigationHeader extends HTMLElement {
            constructor() {
                super();

                const template = document.getElementById('navigation-header').content;
                const shadowRoot = this.attachShadow({ mode: 'open' });

                shadowRoot.appendChild(template.cloneNode(true));
            }
        });
    }

    loadView = (hashChangeEvent, aView) => {
        if (hashChangeEvent) {
            let urlViewFromIndex = hashChangeEvent.newURL.indexOf('#');
            aView = hashChangeEvent.newURL.substring(urlViewFromIndex + 1);
        }

        if (this.#views[aView]) document.getElementById('header').innerHTML = this.#views[aView];
        else {
            fetch(`views/${aView}.md`)
                .then(html => {
                    if (html.ok) {
                        html.text().then((mdText) => {
                            this.#views[aView] = marked.parse(mdText);

                            document.getElementById('header').innerHTML = this.#views[aView];
                        });
                    }
                    else if (html.status === 404) {
                        aView = '404';
                        this.loadView(null, aView);
                    }
                    else {
                        console.error(`Error fetching view ${aView}`, html);
                    }
                });
        }
    }
} 