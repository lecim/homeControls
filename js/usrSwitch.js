const template = document.createElement('template');
template.innerHTML = `
    <style>
    </style>
    <div class="usrSwitch-container">
        <div class="usrSwitch-state"></div>
        <div class="usrSwitch-icon"><img></img></div>
        <div class="usrSwitch-label"></div>
    </div>
`

class usrSwitch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const symbol = this.getAttribute('symbol');
        this.shadowRoot.querySelector('img').src = symbol;
    }
}

window.customElements.define('usr-switch',usrSwitch);

