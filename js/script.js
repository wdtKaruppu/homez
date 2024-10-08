
// 1. Hotspot 
// 2. Interactive Link Showcase


////////////////////////////////////////////////////////////////////////////////////////// 


// 1. Hotspot 

class WDT_Hotspot extends HTMLElement {

  constructor() {
    super();
    this.hotspotItems = [...this.querySelectorAll('.wdt-hotspot-repeater-item')];
    this.settings = JSON.parse(this.dataset.settings);
    this.init();
  }

  init() {

    this.hotspotItems.forEach(hotspot => {
      let tooltipContent = hotspot.dataset.tooltipContent;
      let tooltipPlacement = hotspot.dataset.tooltipPosition;
      
      const options = {
          content: tooltipContent,
          placement: tooltipPlacement,
          trigger: this.settings.tooltipTrigger,
          arrow: this.settings.tooltipArrow,
          appendTo: hotspot.parentElement,
          allowHTML: true,
          hideOnClick: true,
          popperOptions: {
              strategy: 'fixed',
          },
          onShow() {
            hotspot.classList.add('wdt-hotspot-item-active');
          },
          onHidden() {
            hotspot.classList.remove('wdt-hotspot-item-active');
          },
      };
      
      tippy(hotspot, options);

    });

  }

}

customElements.define('wdt-hotspot', WDT_Hotspot);



// 2. Interactive Link Showcase


class WDT_link_showcase extends HTMLElement {

  constructor() {
    super();
    this.init();
  }

  init() {
    console.log(this);
  }

}

customElements.define('wdt-link-interactive', WDT_link_showcase);