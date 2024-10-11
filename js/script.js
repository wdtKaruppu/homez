
// 1. Hotspot 
// 2. Interactive Link Showcase
// 3. Interactive Template Showcase


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
    this.wdtMainitem = Array.from(this.querySelectorAll('.wdt-link-showcase-item'));
    this.init();
  }

  init() {

    this.wdtMainitem.forEach(wdtItem => {

      let wdtImageItems = wdtItem.querySelectorAll('.wdt-link-follow-content');
      
      wdtItem.addEventListener('mousemove', (e) => {

        let x = e.offsetX;
        let y = e.offsetY;

        wdtImageItems.forEach(imageItems => {
          imageItems.style.left = `${x}px`;
          imageItems.style.top = `${y}px`;
        });

      });
      
    });

  }
}

customElements.define('wdt-link-interactive', WDT_link_showcase);


// 3. Interactive Template Showcase

class WDT_Template_showcase extends HTMLElement {
  constructor() {
    super();
    this.showcaseItem = this.querySelector('.wdt-template-showcase-items');
    this.hoverAndClick = JSON.parse(this.dataset.settings).click;
    this.init_interactive();
  }

  init_interactive() {

    const hoverContentSection = Array.from(this.showcaseItem.querySelectorAll('.wdt-temp-showcase-item'));
    const imageContentSection = Array.from(this.showcaseItem.querySelectorAll('.wdt-template-content-item'));

    hoverContentSection[0].classList.add('wdt-active');
    imageContentSection[0].classList.add('wdt-active');

    const activateContent = (element) => {
        const contentIdName = element.id;

        if (!element.classList.contains('wdt-active')) {
            hoverContentSection.forEach(item => item.classList.remove('wdt-active'));
            imageContentSection.forEach(img => img.classList.remove('wdt-active'));

            hoverContentSection.forEach(thisContent => {
              const imageIdName = thisContent.id;                
              if (imageIdName === contentIdName) {
                  thisContent.classList.add('wdt-active');
              } else {
                  thisContent.classList.remove('wdt-active');
              }
            });

            imageContentSection.forEach(thisImage => {
                const imageIdName = thisImage.id;                
                if (imageIdName === contentIdName) {
                    thisImage.classList.add('wdt-active');
                } else {
                    thisImage.classList.remove('wdt-active');
                }
            });
        }
    };

    if (this.hoverAndClick === true) {
        hoverContentSection.forEach(item => {
            item.addEventListener('click', function() {
              activateContent(this);
            });
        });
    } else {
        hoverContentSection.forEach(item => {
            item.addEventListener('mouseover', function() {
              activateContent(this);
            });
        });
    }
  }
};

customElements.define('wdt-interactive-template', WDT_Template_showcase);