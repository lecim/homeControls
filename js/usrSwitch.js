const template = document.createElement('template');
template.innerHTML = `
    <style>
        .usrSwitch-container {
            height: 100%;
            display: grid;
            grid-template-rows: 20% 55% 25%;
            border-radius: 5px;
        }

        .usrSwitch-container.usrSwitch-state-off {
            background-color: var(--c1-p2);
        }

        .usrSwitch-container.usrSwitch-state-on {
            background-color: var(--c1-p1);
        }

        .usrSwitch-state-off > .usrSwitch-state {
            background-color: var(--c2-p2);
        }

        .usrSwitch-state-on > .usrSwitch-state {
            background-color: var(--c2-p1);
        }

        .usrSwitch-icon {
            margin: auto;  
        }

        .usrSwitch-state {
            margin: 2px;
        }

        .usrSwitch-label {
            margin: auto;
            font-family:'roboto', Verdana, sans-serif;
            color: var(--c3-p1)
        }

        :host{
            max-height: 100%;
            max-width: 100%;
            display: flex; 
            flex-direction: column; 
            height: 100%;
        }
    </style>
    <div class="usrSwitch-container usrSwitch-state-off">
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
        this.image = this.shadowRoot.querySelector('img')
        this.image.src = symbol;

        const label = this.getAttribute('name');
        this.label = this.shadowRoot.querySelector('.usrSwitch-label');
        this.label.textContent = label;

        this.button = this.shadowRoot.querySelector('.usrSwitch-container');
        this.button.addEventListener('click', () => {
            console.log("click");
            if (this.state == "on") {
                this.state = "off";
            } else {
                this.state = "on";
            }
        })

    }

    static get observedAttributes() {return ['state'];}
    attributeChangedCallback(name, oldValue, newValue){
        console.log(name,newValue);
    }        


    /**
     * @param {string} value
     */
    set state(value) {
        this._state = value;
        if (this._state == "on") {
            this.button.className="usrSwitch-container usrSwitch-state-on";
        } else {
            this.button.className="usrSwitch-container usrSwitch-state-off";
        }
        this.dispatchEvent(new CustomEvent('click', { detail: value, bubbles: true }))
    }

    get state() {
        return this._state;
      }

    
}

window.customElements.define('usr-switch',usrSwitch);

