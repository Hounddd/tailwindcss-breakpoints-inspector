
module.exports = function ({
  addComponents,
  theme
}) {
  if (process.env.NODE_ENV === "production") return

  const defaultPosition = ['bottom', 'right'];
  const screens = theme('screens');
  const userStyles = theme('breakpointsInspector.style', {});
  const ignoredScreens = theme('breakpointsInspector.ignore', ['dark']);
  const minWidth = theme('breakpointsInspector.width', 120);
  const prefix = theme('breakpointsInspector.prefix', 'Current breakpoint ');
  const position = theme('breakpointsInspector.position', defaultPosition);
  const positionY = position[0] || defaultPosition[0];
  const positionX = position[1] || defaultPosition[1];
  const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;
  const minScreen = Object.entries(screens).filter(([screen]) => !ignoredScreens.includes(screen))[0][1];

  const gridStyle = Object.assign({
    color: '#d53f8c',
    fontSize: '12px',
    fontFamily: 'sans-serif',
  }, userStyles, {
    display: 'grid',
    gridTemplateColumns: '1fr min-content',
    gridTemplateRows: 'repeat(2, minmax(15px, 1fr))',
    columnGap: '6px',
    padding: '0',
  });

  const styleToString = (style) => {
    return Object.keys(style).reduce((acc, key) => (
      acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
    ), '');
  };

  const makeContent = (prefix, screen = null) => {

    let template = `<svg width='` + (screen ? minWidth + 40 : minWidth) + `' height='30' xmlns='http://www.w3.org/2000/svg'>
      <style>
      .inspect--grid {` + styleToString(gridStyle) + `}
      .inspect--text {
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
      }
      .inspect--indicator {
        font-size: 200%;
        text-align: center;
        grid-row: span 2 / span 2;
      }
      </style>
      <foreignObject width='100%' height='100%' x='0' y='0'>
      <div xmlns='http://www.w3.org/1999/xhtml' class='inspect--grid'>
      <div class='inspect--text'>${prefix}</div>
      <div class='inspect--indicator'><b>${screen ? screen : ''}</b></div>
      <div class='inspect--text'><b>${(screen ? '&gt;' + screens[screen] : '&lt;' + minScreen)}</b></div>
      </div>
      </foreignObject>
      </svg>`;

    template = template.replace(/>\s{1,}</g, `><`);
    template = template.replace(/\s{2,}/g, ` `);

    return `url("data:image/svg+xml,` + template.replace(symbols, encodeURIComponent) + `");`;
  };

  const components = {
    'body::after': Object.assign({
      position: 'fixed',
      zIndex: '2147483647',
      [positionY]: '.5rem',
      [positionX]: '.5rem',
      padding: '.25rem .5rem .25rem 1.75rem',
      lineHeight: '1',
      background: '#edf2f7',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 54 33\'%3E%3Cg clip-path=\'url(%23prefix__clip0)\'%3E%3Cpath fill=\'%2306B6D4\' fill-rule=\'evenodd\' d=\'M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z\' clip-rule=\'evenodd\'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id=\'prefix__clip0\'%3E%3Cpath fill=\'%23fff\' d=\'M0 0h54v32.4H0z\'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '22px auto',
      backgroundPosition: '.5rem center',
      border: '1px solid #cbd5e0',
      content: makeContent(prefix),
    }, userStyles),
  };

  Object.entries(screens)
    .filter(([screen]) => !ignoredScreens.includes(screen))
    .forEach(([screen]) => {
      components[`@screen ${screen}`] = {
        'body::after': {
          content: makeContent(prefix, screen),
        },
      };
    });

  addComponents(components);
}
