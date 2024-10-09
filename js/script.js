
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
    this.wdtMainItems = this.querySelectorAll('.wdt-link-showcase-content-items');
    this.init();
  }

  init() {
    this.wdtMainItems.forEach(mainItem => {

      let mainItem_items = mainItem.querySelectorAll('.wdt-link-showcase-item');
      let wdtImageItems = mainItem.querySelectorAll('.wdt-link-follow-content');

      mainItem_items.forEach(imageItems => {

        imageItems.addEventListener('mousemove', (event) => {

          let target = event.target;

          let x = event.offsetX;
          let y = event.offsetY;

          wdtImageItems.forEach(imageItems => {
            imageItems.style.left = `${x}px`;
            imageItems.style.top = `${y}px`;
          });

        });

        imageItems.addEventListener('mouseenter', (event) => {
          imageItems.classList.add('wdt-active');
        });

        imageItems.addEventListener('mouseleave', (event) => {
          imageItems.classList.remove('wdt-active');
        });

      });

    });
  }
}


customElements.define('wdt-link-interactive', WDT_link_showcase);