
const editor = grapesjs.init({
  // Indicate where to init the editor. You can also pass an HTMLElement
  container: '#gjs',
  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  fromElement: true,

  // Size of the editor
  height: '100%',
  width: 'auto',
  // Disable the storage manager for the moment
  storageManager: {
    type: 'local', // Type of the storage, available: 'local' | 'remote'
    autosave: true, // Store data automatically
    autoload: true, // Autoload stored data on init
    stepsBeforeSave: 1, // Trigger save after each change
    options: {
      local: {
        key: "guest", // Replace with your dynamic ID if needed
      },
    }
  },
  // Avoid any default panel
  layerManager: {
    appendTo: '.layers-container'
  },
  panels: { defaults: [{
    id: 'layers',
    el: '.panel',
      resizable: {
        // Being a flex child we need to change `flex-basis` property
        // instead of the `width` (default)
        keyWidth: 'flex-basis',
      },
    
    },
    {
      id: 'panel-devices',
      el: '.panel__devices',
      buttons: [{
          id: 'device-desktop',
          label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-8 -8 40 40" style="fill: currentcolor;transform: ;msFilter:;"><path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h7v2H8v2h8v-2h-3v-2h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 14V5h16l.002 9H4z"></path></svg>',
          command: 'set-device-desktop',
          active: true,
          attributes: {
            title: "Desktop View",
          },
          togglable: false,
        },{
          id: 'device-tablet',
          label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-8 -8 40 40" style="fill: currentcolor;transform: rotate(270deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);"><path d="M6 2c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H6zm0 15V5h12l.002 12H6z"></path></svg>',
          command: 'set-device-tablet',
          attributes: {
            title: "Tablet View",
          },
          togglable: false,
        }, {
          id: 'device-mobile',
          label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-8 -8 40 40" style="fill: currentColor;"><path d="M17 2H7c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM7 16.999V5h10l.002 11.999H7z"></path></svg>',
          command: 'set-device-mobile',
          attributes: {
            title: "Mobile View",
          },
          togglable: false,
      }],
    },
    {
      id: "panel-left",
      el: ".panel__styles",
      buttons: [{
        id: 'show-style',
        active: true,
        label: `<div style="width: auto; height: 20px; display: flex; gap: 5px; justify-content: center; font-size: .7em;">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="-8 -8 40 40">
          <path d="m14.013,13.649c.158,1.78-1.24,3.274-2.988,3.274h-4c-.681,0-1.163-.656-.961-1.307.499-1.608,1.936-4.181,4.249-4.626,1.755-.338,3.542.879,3.7,2.659ZM23.295.707c-.941-.942-2.467-.943-3.409-.002-.025.025-5.276,5.814-7.692,8.479.653.171,1.276.464,1.826.879.692.522,1.205,1.215,1.544,1.982l7.728-7.924c.943-.942.945-2.47.003-3.413Zm-7.305,13.764c-.117,1.047-.557,2.042-1.276,2.827-.945,1.033-2.29,1.625-3.688,1.625h-4c-.953,0-1.858-.457-2.422-1.223-.564-.767-.732-1.768-.449-2.678.708-2.283,2.536-5.101,5.371-5.874l2.866-3.16c1.091-1.202,1.978-2.181,2.711-2.988H5C2.243,3,0,5.243,0,8v11c0,2.757,2.243,5,5,5h11c2.757,0,5-2.243,5-5v-9.666l-5.01,5.137Z"/>
        </svg>
        <p>Styles</p>
        </div>`,
        command: 'show-styles',
        togglable: false,
      },{
        id: 'show-traits',
        active: true,
        label: `<div style="width: auto; height: 20px; display: flex; gap: 5px; justify-content: center; font-size: .7em;">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="-8 -8 40 40">
          <path d="m23.265,19.379l-.983-.566c.129-.418.218-.853.218-1.313s-.09-.895-.218-1.313l.983-.566c.479-.275.644-.887.367-1.366-.274-.477-.887-.644-1.365-.367l-.977.563c-.605-.652-1.393-1.126-2.289-1.33v-1.121c0-.552-.447-1-1-1s-1,.448-1,1v1.121c-.896.205-1.685.678-2.289,1.33l-.977-.563c-.479-.277-1.089-.11-1.365.367-.276.479-.112,1.09.367,1.366l.983.566c-.129.418-.218.853-.218,1.313s.09.895.218,1.313l-.983.566c-.479.275-.643.887-.367,1.366.185.321.521.5.867.5.169,0,.341-.043.498-.134l.977-.563c.605.652,1.393,1.126,2.289,1.33v1.121c0,.552.447,1,1,1s1-.448,1-1v-1.121c.896-.205,1.685-.678,2.289-1.33l.977.563c.157.091.329.134.498.134.346,0,.683-.18.867-.5.276-.479.111-1.09-.367-1.366Zm-5.265-.379c-.827,0-1.5-.673-1.5-1.5s.673-1.5,1.5-1.5,1.5.673,1.5,1.5-.673,1.5-1.5,1.5Zm-2.413-14.371l-7.616,4.374s-.008-.002-.012-.002c-.016,0-.029.008-.044.009L.369,4.716c.376-.869,1.023-1.613,1.87-2.097L5.795.587c1.36-.778,3.05-.778,4.411,0l3.555,2.032c.818.468,1.445,1.18,1.827,2.01ZM0,6.807l6.96,3.96v7.77c-.429-.103-.843-.263-1.225-.49l-3.556-2.106c-1.344-.796-2.179-2.261-2.179-3.824v-5.31Zm10,10.693c0,.222.016.441.033.658-.342.174-.7.312-1.073.394v-7.811l7.04-4.043v3.064c-3.449.889-6,4.011-6,7.738Z"/>
        </svg>
        <p>Traits</p>
        </div>`,
        command: 'show-traits',
        togglable: false,
      }]
    },
    {
      id: 'panel-switcher',
      el: '.panel__switcher',
      buttons: [{
          id: 'show-layers',
          active: true,
          label: `
          <div style="width: auto; height: 20px; display: flex; gap: 5px; justify-content: center; font-size: .7em;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 40 40" style="fill: currentcolor; display: block;transform: ;msFilter:;"><path d="m21.484 7.125-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749z"></path><path d="m12 15.856-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.971-1.748L12 15.856z"></path><path d="m12 19.856-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.971-1.748L12 19.856z"></path></svg>
          <p>Layers</p>
          </div>`,
          command: 'show-layers',
          // Once activated disable the possibility to turn it off
          togglable: false,
        },{
          id: 'show-blocks',
          active: true,
          label: `
          <div style="width: auto; height: 20px; display: flex; gap: 5px; justify-content: center; font-size: .7em;">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="-8 -8 40 40"><path d="M14.762,11.587A5.5,5.5,0,0,1,13,12.223V23.874a4.922,4.922,0,0,0,1.5-.557l6.027-3.479a5.016,5.016,0,0,0,2.5-4.331V8.547a4.959,4.959,0,0,0-.265-1.57Z"/><path d="M10.242,9.857a3.531,3.531,0,0,0,3.521,0l8-4.61a4.983,4.983,0,0,0-1.238-1.027L14.5.737a5.015,5.015,0,0,0-5,0L3.473,4.217a4.974,4.974,0,0,0-1.2.983Z"/><path d="M11,12.223a5.493,5.493,0,0,1-1.763-.636L1.257,6.923A4.956,4.956,0,0,0,.973,8.547v6.96a5.016,5.016,0,0,0,2.5,4.331L9.5,23.317a4.922,4.922,0,0,0,1.5.557Z"/></svg>
          <p>Blocks</p>
          </div>`,
          command: 'show-blocks',
          togglable: false,
        }],
    },
  ] 
  },
  blockManager: {
    appendTo: '.blocks-container',
  },
  traitManager: {
    appendTo: '.traits-container',
  },
  selectorManager: {
    componentFirst: true,
    appendTo: '.styles-container'
  },
  styleManager: {
    appendTo: '.styles-container',
    sectors: [
      {
        name: 'General',
        open: false,
        properties:[
          {
            extend: 'float',
            type: 'radio',
            default: 'none',
            options: [
              { value: 'none', className: 'fa fa-times'},
              { value: 'left', className: 'fa fa-align-left'},
              { value: 'right', className: 'fa fa-align-right'}
            ],
          },
          'display',
          { extend: 'position', type: 'select' },
          'top',
          'right',
          'left',
          'bottom',
        ],
      }, {
          name: 'Dimension',
          open: false,
          properties: [
            'width',
            {
              id: 'flex-width',
              type: 'integer',
              name: 'Width',
              units: ['px', '%'],
              property: 'flex-basis',
              toRequire: 1,
            },
            'height',
            'max-width',
            'min-height',
            'margin',
            'padding'
          ],
        },{
          name: 'Typography',
          open: false,
          properties: [
              'font-family',
              'font-size',
              'font-weight',
              'letter-spacing',
              'color',
              'line-height',
              {
                extend: 'text-align',
                options: [
                  { id : 'left',  label : 'Left',    className: 'fa fa-align-left'},
                  { id : 'center',  label : 'Center',  className: 'fa fa-align-center' },
                  { id : 'right',   label : 'Right',   className: 'fa fa-align-right'},
                  { id : 'justify', label : 'Justify',   className: 'fa fa-align-justify'}
                ],
              },
              {
                property: 'text-decoration',
                type: 'radio',
                default: 'none',
                options: [
                  { id: 'none', label: 'None', className: 'fa fa-times'},
                  { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                  { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough'}
                ],
              },
              'text-shadow'
          ],
        },{
          name: 'Decorations',
          open: false,
          properties: [
            'opacity',
            'border-radius',
            'border',
            'box-shadow',
            'background' // { id: 'background-bg', property: 'background', type: 'bg' }
          ],
        },{
          name: 'Extra',
          open: false,
          buildProps: [
            'transition',
            'perspective',
            'transform'
          ],
        },{
          name: 'Flex',
          open: false,
          properties: [{
            name: 'Flex Container',
            property: 'display',
            type: 'select',
            defaults: 'block',
            list: [
              { value: 'block', name: 'Disable'},
              { value: 'flex', name: 'Enable'}
            ],
          },{
            name: 'Flex Parent',
            property: 'label-parent-flex',
            type: 'integer',
          },{
            name: 'Direction',
            property: 'flex-direction',
            type: 'radio',
            defaults: 'row',
            list: [{
              value: 'row',
              name: 'Row',
              className: 'icons-flex icon-dir-row',
              title: 'Row',
            },{
              value: 'row-reverse',
              name: 'Row reverse',
              className: 'icons-flex icon-dir-row-rev',
              title: 'Row reverse',
            },{
              value: 'column',
              name: 'Column',
              title: 'Column',
              className: 'icons-flex icon-dir-col',
            },{
              value: 'column-reverse',
              name: 'Column reverse',
              title: 'Column reverse',
              className: 'icons-flex icon-dir-col-rev',
            }],
          },{
            name: 'Justify',
            property: 'justify-content',
            type: 'radio',
            defaults: 'flex-start',
            list: [{
              value: 'flex-start',
              className: 'icons-flex icon-just-start',
              title: 'Start',
            },{
              value: 'flex-end',
              title: 'End',
              className: 'icons-flex icon-just-end',
            },{
              value: 'space-between',
              title: 'Space between',
              className: 'icons-flex icon-just-sp-bet',
            },{
              value: 'space-around',
              title: 'Space around',
              className: 'icons-flex icon-just-sp-ar',
            },{
              value: 'center',
              title: 'Center',
              className: 'icons-flex icon-just-sp-cent',
            }],
          },{
            name: 'Align',
            property: 'align-items',
            type: 'radio',
            defaults: 'center',
            list: [{
              value: 'flex-start',
              title: 'Start',
              className: 'icons-flex icon-al-start',
            },{
              value: 'flex-end',
              title: 'End',
              className: 'icons-flex icon-al-end',
            },{
              value: 'stretch',
              title: 'Stretch',
              className: 'icons-flex icon-al-str',
            },{
              value: 'center',
              title: 'Center',
              className: 'icons-flex icon-al-center',
            }],
          },{
            name: 'Flex Children',
            property: 'label-parent-flex',
            type: 'integer',
          },{
            name: 'Order',
            property: 'order',
            type: 'integer',
            defaults: 0,
            min: 0
          },{
            name: 'Flex',
            property: 'flex',
            type: 'composite',
            properties  : [{
              name: 'Grow',
              property: 'flex-grow',
              type: 'integer',
              defaults: 0,
              min: 0
            },{
              name: 'Shrink',
              property: 'flex-shrink',
              type: 'integer',
              defaults: 0,
              min: 0
            },{
              name: 'Basis',
              property: 'flex-basis',
              type: 'integer',
              units: ['px','%',''],
              unit: '',
              defaults: 'auto',
            }],
          },{
            name: 'Align-self',
            property: 'align-self',
            type: 'radio',
            defaults: 'auto',
            list: [{
              value: 'auto',
              name: 'Auto',
            },{
              value: 'flex-start',
              title: 'Start',
              className: 'icons-flex icon-al-start',
            },{
              value   : 'flex-end',
              title: 'End',
              className: 'icons-flex icon-al-end',
            },{
              value   : 'stretch',
              title: 'Stretch',
              className: 'icons-flex icon-al-str',
            },{
              value   : 'center',
              title: 'Center',
              className: 'icons-flex icon-al-center',
            }],
          }]
        }]
  },
  deviceManager: {
    devices: [{
        name: 'Desktop',
        width: '', // default size
      },{
        name: 'Tablet',
        width: '720px', // this value will be used on canvas width
        widthMedia: '720px', // this value will be used in CSS @media
      }, {
        name: 'Mobile',
        width: '320px', // this value will be used on canvas width
        widthMedia: '480px', // this value will be used in CSS @media
    }]
  },
  plugins: [
    'gjs-blocks-basic',
    'grapesjs-plugin-forms',
    'grapesjs-component-countdown',
    'grapesjs-tabs',
    'grapesjs-custom-code',
    'grapesjs-touch',
    'grapesjs-parser-postcss',
    'grapesjs-tooltip',
    'grapesjs-tui-image-editor',
    'grapesjs-typed',
    'grapesjs-style-bg',
    "grapesjs-plugin-export",
  ],
  pluginsOpts: {
    'gjs-blocks-basic': { flexGrid: true },
    'grapesjs-tui-image-editor': {
      script: [
        'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
        'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
        'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
        'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
      ],
      style: [
        'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
        'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
      ],
    },
    'grapesjs-tabs': {
      tabsBlock: { category: 'Extra' }
    },
    'grapesjs-typed': {
      block: {
        category: 'Extra',
        content: {
          type: 'typed',
          'type-speed': 40,
          strings: [
            'Text row one',
            'Text row two',
            'Text row three',
          ],
        }
      }
    },
  },
});



editor.I18n.addMessages({
  en: {
    styleManager: {
      properties: {
        'background-repeat': 'Repeat',
        'background-position': 'Position',
        'background-attachment': 'Attachment',
        'background-size': 'Size',
      }
    },
  }
});

var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
openBlocksBtn && openBlocksBtn.set('active', 1);


editor.Panels.addPanel({
  id: 'panel-top',
  el: '.panel__top',
});

editor.Panels.addPanel({
  id: 'basic-actions',
  el: '.panel__basic-actions',
  buttons: [
    {
      id: 'visibility',
      active: true, // active by default
      className: 'btn-toggle-borders',
      label: `<svg xmlns="http://www.w3.org/2000/svg" width="22" viewBox="-8 -8 40 40" display="block">
      <path d="m7,1c0,.553-.448,1-1,1h-1c-1.654,0-3,1.346-3,3v1c0,.553-.448,1-1,1s-1-.447-1-1v-1C0,2.243,2.243,0,5,0h1c.552,0,1,.447,1,1ZM1,15c.552,0,1-.447,1-1v-4c0-.553-.448-1-1-1s-1,.447-1,1v4c0,.553.448,1,1,1Zm5,7h-1c-1.654,0-3-1.346-3-3v-1c0-.553-.448-1-1-1s-1,.447-1,1v1c0,2.757,2.243,5,5,5h1c.552,0,1-.447,1-1s-.448-1-1-1Zm17-5c-.552,0-1,.447-1,1v1c0,1.654-1.346,3-3,3h-1c-.552,0-1,.447-1,1s.448,1,1,1h1c2.757,0,5-2.243,5-5v-1c0-.553-.448-1-1-1Zm0-8c-.552,0-1,.447-1,1v4c0,.553.448,1,1,1s1-.447,1-1v-4c0-.553-.448-1-1-1ZM19,0h-1c-.552,0-1,.447-1,1s.448,1,1,1h1c1.654,0,3,1.346,3,3v1c0,.553.448,1,1,1s1-.447,1-1v-1c0-2.757-2.243-5-5-5Zm-5,0h-4c-.552,0-1,.447-1,1s.448,1,1,1h4c.552,0,1-.447,1-1s-.448-1-1-1Zm0,22h-4c-.552,0-1,.447-1,1s.448,1,1,1h4c.552,0,1-.447,1-1s-.448-1-1-1Z"/>
      </svg>`,
      command: 'sw-visibility', // Built-in command
      attributes: {
        title: "Toggle Borders",
      },
    }, 
    {
      id: 'export',
      className: 'btn-open-export',
      label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="-8 -8 40 40" width="22" display="block"><path d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5ZM10.121,14.121l-4.041,4.041c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l4.041-4.041c.39-.39,.39-1.024,0-1.414L4.667,7.252c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l4.041,4.041c1.17,1.17,1.17,3.072,0,4.242Zm8.879,3.879h-7c-.552,0-1-.447-1-1s.448-1,1-1h7c.553,0,1,.447,1,1s-.447,1-1,1Z"/></svg>`,
      command(editor) {
        // Execute the original command
        editor.runCommand('export-template');
        editor.runCommand('create-show-element');
      },
      context: 'export-template', // For grouping context of buttons from the same panel
      attributes: {
        title: "View Code",
      },
    }, 
    {
      id: 'show-json',
      className: 'btn-show-json',
      label: '<svg xmlns="http://www.w3.org/2000/svg" width="22" viewBox="-8 -8 40 40" style="fill: currentColor;" display="block"><path d="M12.823 15.122c-.517 0-.816.491-.816 1.146 0 .661.311 1.126.82 1.126.517 0 .812-.49.812-1.146 0-.604-.291-1.126-.816-1.126z"></path><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8.022 16.704c0 .961-.461 1.296-1.2 1.296-.176 0-.406-.029-.557-.08l.086-.615c.104.035.239.06.391.06.319 0 .52-.145.52-.67v-2.122h.761v2.131zm1.459 1.291c-.385 0-.766-.1-.955-.205l.155-.631c.204.105.521.211.846.211.35 0 .534-.146.534-.365 0-.211-.159-.331-.564-.476-.562-.195-.927-.506-.927-.996 0-.576.481-1.017 1.277-1.017.38 0 .659.08.861.171l-.172.615c-.135-.065-.375-.16-.705-.16s-.491.15-.491.325c0 .215.19.311.627.476.596.22.876.53.876 1.006.001.566-.436 1.046-1.362 1.046zm3.306.005c-1.001 0-1.586-.755-1.586-1.716 0-1.012.646-1.768 1.642-1.768 1.035 0 1.601.776 1.601 1.707C14.443 17.33 13.773 18 12.787 18zm4.947-.055h-.802l-.721-1.302a12.64 12.64 0 0 1-.585-1.19l-.016.005c.021.445.031.921.031 1.472v1.016h-.701v-3.373h.891l.701 1.236c.2.354.4.775.552 1.155h.014c-.05-.445-.065-.9-.065-1.406v-.985h.702v3.372zM14 9h-1V4l5 5h-4z"></path></svg>',
      context: 'show-json',
      command(editor) {
        editor.Modal.setTitle('Components JSON')
          .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
          .open();
      },
      attributes: {
        title: "View JSON",
      },
    },
    {
        id: 'preview',
        className: 'btn-preview',
        label: `<svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="-8 -8 40 40" width="22" display="block"><path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"/></svg>`,
        context: 'preview',
        command: ()=> editor.runCommand("core:preview"),
        /* command() {
            togglePreviewMode();
        }, */
        attributes: {
          title: "Preview",
        },
    },
    {
        id: 'clear',
        className: 'btn-clear',
        label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="-8 -8 40 40" width="22" display="block"><path d="m7.242,7.438L12.751,1.911c1.17-1.175,3.213-1.175,4.383,0l5.935,5.955c1.206,1.21,1.206,3.179,0,4.389l-5.506,5.525L7.242,7.438Zm7.111,13.562l1.798-1.804L5.83,8.855.882,13.82c-1.206,1.21-1.206,3.179,0,4.389l4.774,4.791h18.344v-2h-9.647Z"/></svg>`,
        context: 'clear',
        command: () => clear(),
        attributes: {
          title: "Clear",
        },
    },
    {
      id: 'undo',
      className: "btn-undo",
      context: "undo",
      command: () => editor.runCommand('core:undo'),
      label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="-8 -8 40 40" width="22" display="block"><path d="M7.7,15.007a1.5,1.5,0,0,1-2.121,0L.858,10.282a2.932,2.932,0,0,1,0-4.145L5.583,1.412A1.5,1.5,0,0,1,7.7,3.533L4.467,6.7l14.213,0A5.325,5.325,0,0,1,24,12.019V18.7a5.323,5.323,0,0,1-5.318,5.318H5.318a1.5,1.5,0,1,1,0-3H18.681A2.321,2.321,0,0,0,21,18.7V12.019A2.321,2.321,0,0,0,18.68,9.7L4.522,9.7,7.7,12.886A1.5,1.5,0,0,1,7.7,15.007Z"/></svg>`,
      attributes: {
        title: "Undo",
      },
    },
    {
      id: 'redo',
      className: "btn-redo",
      context: "redo",
      command: () => editor.runCommand('core:redo'),
      label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="-8 -8 40 40" width="22" display="block"><path d="M16.3,15.007a1.5,1.5,0,0,0,2.121,0l4.726-4.725a2.934,2.934,0,0,0,0-4.145L18.416,1.412A1.5,1.5,0,1,0,16.3,3.533L19.532,6.7,5.319,6.7A5.326,5.326,0,0,0,0,12.019V18.7a5.324,5.324,0,0,0,5.318,5.318H18.682a1.5,1.5,0,0,0,0-3H5.318A2.321,2.321,0,0,1,3,18.7V12.019A2.321,2.321,0,0,1,5.319,9.7l14.159,0L16.3,12.886A1.5,1.5,0,0,0,16.3,15.007Z"/></svg>`,
      attributes: {
        title: "Redo",
      },
    },
    {
      id: "fullscreen",
      className : "fullscreen",
      context: "fullscreen",
      command() {
        fullscreen();
      },
      label: `<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="-8 -8 40 40" width="22" display="block"><path d="M19,24H17a1,1,0,0,1,0-2h2a3,3,0,0,0,3-3V17a1,1,0,0,1,2,0v2A5.006,5.006,0,0,1,19,24Z"/><path d="M1,8A1,1,0,0,1,0,7V5A5.006,5.006,0,0,1,5,0H7A1,1,0,0,1,7,2H5A3,3,0,0,0,2,5V7A1,1,0,0,1,1,8Z"/><path d="M7,24H5a5.006,5.006,0,0,1-5-5V17a1,1,0,0,1,2,0v2a3,3,0,0,0,3,3H7a1,1,0,0,1,0,2Z"/><path d="M23,8a1,1,0,0,1-1-1V5a3,3,0,0,0-3-3H17a1,1,0,0,1,0-2h2a5.006,5.006,0,0,1,5,5V7A1,1,0,0,1,23,8Z"/></svg>`,
      togglable: false
    },
    {
      id: "import",
      context: "import",
      className: "fullscreen",
      command: () => editor.runCommand('gjs-open-import-webpage'),
      label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="-8 -8 40 40" width="22" display="block"><path d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5ZM7.293,12.705l2.583,2.583c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-2.583-2.583c-.567-.566-.879-1.32-.879-2.122s.312-1.555,.879-2.122l2.583-2.583c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-2.583,2.583c-.189,.189-.293,.44-.293,.707s.104,.519,.293,.708Zm10.828,1.419l-2.583,2.583c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.583-2.583c.188-.189,.293-.44,.293-.708s-.104-.518-.293-.707l-2.583-2.584c-.391-.391-.391-1.024,0-1.414,.391-.391,1.023-.391,1.414,0l2.583,2.583c.566,.566,.879,1.32,.879,2.121s-.312,1.555-.879,2.122Z"/></svg>`,
      attributes: {
        title: "Import Code",
      }
    }
  ],
});

editor.Commands.add('show-layers', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getLayersEl(row) { return row.querySelector('.layers-container') },

  run(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = '';
  },
  stop(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = 'none';
  },
});

editor.Commands.add('show-styles', {
  getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
  getStyleEl(row) { return row.querySelector('.styles-container') },

  run(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = '';
  },
  stop(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = 'none';
  },
});


editor.Commands.add('show-traits', {
  getTraitsEl(editor) {
    const row = editor.getContainer().closest('.editor-row');
    return row.querySelector('.traits-container');
  },
  run(editor, sender) {
    this.getTraitsEl(editor).style.display = '';
  },
  stop(editor, sender) {
    this.getTraitsEl(editor).style.display = 'none';
  },
});

editor.Commands.add('show-blocks', {
  getTraitsEl(editor) {
    const row = editor.getContainer().closest('.editor-row');
    return row.querySelector('.blocks-container');
  },
  run(editor, sender) {
    this.getTraitsEl(editor).style.display = '';
  },
  stop(editor, sender) {
    this.getTraitsEl(editor).style.display = 'none';
  },
});

editor.Commands.add('gjs-open-import-webpage', {
  run: function(editor) {
    const modal = editor.Modal;

    // Set the modal's title and content for the textarea and buttons
    modal.setTitle('Import Webpage');
    modal.setContent(`
      <div style="display: flex; flex-direction: column;">
        <label for="html-area">HTML:</label>
        <textarea id="html-area" style="width:100%; height: 200px; max-width:100%; max-height: 200px;"></textarea>

        <label for="css-area" style="margin-top: 10px;">CSS:</label>
        <textarea id="css-area" style="width:100%; height: 200px; max-width: 100%; max-height: 200px;"></textarea>
        <button id="import-btn" style="margin-top:10px">Import</button>
      </div>
    `);

    // Wait for the modal to open, then add event listeners to the import button
    setTimeout(function() {
      const htmlTextarea = document.getElementById('html-area');
      const cssTextarea = document.getElementById('css-area');
      const importBtn = document.getElementById('import-btn');

      // Define what happens when the "Import" button is clicked
      importBtn.onclick = function() {
        const htmlCode = htmlTextarea.value;
        const cssCode = cssTextarea.value;

        // Clear existing components and styles from the editor
        editor.DomComponents.clear();
        editor.CssComposer.clear();

        // Add the parsed HTML components to the editor
        editor.setComponents(htmlCode);

        // Add the CSS rules to the editor's CSS Composer
        editor.CssComposer.addRules(cssCode);

        // Close the modal after importing
        modal.close();
      };
    }, 0);

    // Function to format HTML with proper indentation
    function formatHtml(html) {
      let formattedHtml = '';
      let indentLevel = 0;
      const tab = '  ';

      html.split(/(<[^>]+>)/g).forEach((element) => {
        if (element.match(/^<\/\w/)) indentLevel--;
        if (element.trim()) {
          formattedHtml += tab.repeat(indentLevel) + element.trim() + '\n';
        }
        if (element.match(/^<\w[^>]*[^\/]>$/)) indentLevel++;
      });

      return formattedHtml.trim();
    }

    // Function to format CSS with proper indentation
    function formatCss(css) {
      let formattedCss = '';
      const tab = '  ';

      css.split('}').forEach((rule) => {
        if (rule.trim() !== '') {
          formattedCss += tab + rule.trim() + ' }\n';
        }
      });

      return formattedCss.trim();
    }

    // Function to fetch and format the HTML and CSS from the editor
    function fetchPageContent() {
      const rawHtml = editor.getHtml(); // Get the current HTML from the canvas
      const rawCss = editor.getCss();   // Get the current CSS from the canvas

      // Format the HTML and CSS before displaying them
      const formattedHtml = formatHtml(rawHtml);
      const formattedCss = formatCss(rawCss);

      // Populate the textareas with the formatted HTML and CSS
      document.getElementById('html-area').value = formattedHtml;
      document.getElementById('css-area').value = formattedCss;
    }

    // Call the function to populate and format the textareas
    fetchPageContent();

    // Open the modal dialog
    modal.open();
  }
}); 


editor.Commands.add('set-device-desktop', {
  run: editor => editor.setDevice('Desktop')
});
editor.Commands.add('set-device-tablet', {
  run: editor => editor.setDevice('Tablet')
});
editor.Commands.add('set-device-mobile', {
  run: editor => editor.setDevice('Mobile')
});


// Select the target node to observe (in this case, the whole document or a specific parent container)
const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Check if the htmlModal and cssModal exist
    const htmlModal = document.getElementById("gjs-cm-htmlmixed");

    const cssModal = document.getElementById("gjs-cm-css");

    if (htmlModal && cssModal) {
        // Log them if found
        const copyHTML = document.createElement("span");
        copyHTML.className = "copyHTML";
        copyHTML.textContent = "Copy HTML";
        htmlModal.appendChild(copyHTML);

        copyHTML.addEventListener("click", () => {
          const htmlContent = editor.getHtml(); // Get HTML content from GrapesJS editor
          const formattedHtml = formatHtml(htmlContent); // Format the HTML content
          copyToClipboard(formattedHtml); // Copy to clipboard
        
          const alertHtmlCopy = document.createElement("div");
          alertHtmlCopy.className = "alertHtmlCopy";
          alertHtmlCopy.textContent = "HTML Code copied to clipboard!";
          htmlModal.appendChild(alertHtmlCopy);
        
          console.log("HTML copy");
        
          // Remove the alert after 2 seconds
          setTimeout(() => {
            if (htmlModal.contains(alertHtmlCopy)) {
              htmlModal.removeChild(alertHtmlCopy);
            }
          }, 5000);
        });

        const copyCSS = document.createElement("span");
        copyCSS.className = "copyCSS";
        copyCSS.textContent = "Copy CSS";
        cssModal.appendChild(copyCSS);

        copyCSS.addEventListener("click", () => {
          const cssContent = editor.getCss(); // Get CSS content from GrapesJS editor
          const formattedCss = formatCss(cssContent); // Format the CSS content
          copyToClipboard(formattedCss); // Copy to clipboard
        
        
          const alertCssCopy = document.createElement("div");
          alertCssCopy.className = "alertCssCopy";
          alertCssCopy.textContent = "CSS Code copied to clipboard!";
          cssModal.appendChild(alertCssCopy);
        
          console.log("CSS copy");
        
          // Remove the alert after 2 seconds
          setTimeout(() => {
            if (cssModal.contains(alertCssCopy)) {
              cssModal.removeChild(alertCssCopy);
            }
          }, 5000);
        });

        // Stop observing once we found the elements
        observer.disconnect();
    }
};

// Create a MutationObserver instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Function to format HTML with indentation and line breaks
function formatHtml(html) {
  const formatted = html
    .replace(/(>)(<)(\/*)/g, '$1\n$2$3') // Add newlines between tags
    .replace(/(\w+)=("[^"]*")/g, '\n    $1=$2') // Add indentation for attributes
    .replace(/\s{2,}/g, '\n    '); // Ensure proper indentation
  return formatted.trim();
}

// Function to format CSS with indentation and line breaks
function formatCss(css) {
  const formatted = css
    .replace(/}/g, '}\n') // Add a newline after each closing bracket
    .replace(/{/g, ' {\n    ') // Add a newline and indentation after each opening bracket
    .replace(/;\s*/g, ';\n    ') // Add newlines and indentation after each rule
    .replace(/\n\s*\n/g, '\n'); // Remove any excessive newlines
  return formatted.trim();
}
// Function to copy text to clipboard
function copyToClipboard(content) {
  const textarea = document.createElement("textarea");
  textarea.value = content;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function getEditorContent() {
  const html = editor.getHtml();
  const css = editor.getCss();
  return { html, css };
}

function enterPreviewMode() {
  const { html, css } = getEditorContent();

  const previewContainer = document.getElementById("preview-container");

  // Clear the preview container
  previewContainer.innerHTML = '';

  // Create a style element for the CSS
  const styleEl = document.createElement("style");
  styleEl.innerHTML = css;

  // Create a div or any container for the HTML content
  const contentDiv = document.createElement("div");
  contentDiv.innerHTML = html;

  // Append the HTML and CSS to the preview container
  previewContainer.appendChild(styleEl);
  previewContainer.appendChild(contentDiv);
  
  // Optionally handle scripts inside the HTML, if needed
  executePreviewScripts(contentDiv);
}
function executePreviewScripts(container) {
  const scripts = container.querySelectorAll('script');
  scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.textContent = script.textContent;
      document.body.appendChild(newScript);
  });
}

let isPreviewMode = false;

function togglePreviewMode() {
  const editorContainer = document.querySelector(".main");
  const previewContainer = document.getElementById("preview-container");
  const editBtn = document.querySelector(".edit");

  if (!isPreviewMode) {
      // Switch to preview mode
      enterPreviewMode();
      editorContainer.style.display = "none";
      previewContainer.style.display = "block";
      editBtn.style.display = "block";
  } else {
      // Switch back to edit mode
      editorContainer.style.display = "block";
      previewContainer.style.display = "none";
      editBtn.style.display = "none";
  }

  isPreviewMode = !isPreviewMode;
}

function fullscreen(){
  const mainContainer = document.querySelector('.main');  // The element you want to go fullscreen
  const fullscreen = document.querySelector(".fullscreen");

    if (!document.fullscreenElement) {
      // Enter fullscreen mode
      if (mainContainer.requestFullscreen) {
        mainContainer.requestFullscreen();
        fullscreen.style.backgroundColor = "#3a3a3a";
      } else if (mainContainer.mozRequestFullScreen) { // Firefox
        mainContainer.mozRequestFullScreen();
      } else if (mainContainer.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        mainContainer.webkitRequestFullscreen();
      } else if (mainContainer.msRequestFullscreen) { // IE/Edge
        mainContainer.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
        fullscreen.style.backgroundColor = "";
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
}

editor.on('component:selected', (model) => {
  const traitsContainer = document.querySelector('.traits-container');

  // Check if a component is selected
  if (!model || !model.get('traits').length) {
    // No component selected, show the default message
    traitsContainer.classList.remove('has-selection');
  } else {
    // A component is selected, hide the default message and let GrapesJS populate the containers
    traitsContainer.classList.add('has-selection');
  }
});

// Handle when no component is selected (deselection)
editor.on('component:deselected', () => {
  const traitsContainer = document.querySelector('.traits-container');

  // Show the default message again when no component is selected
  traitsContainer.classList.remove('has-selection');
});

function clear(){
    const clear = document.querySelector(".clearPopup");
    const container = clear.querySelector(".container");
    const cancel = container.querySelector(".b-1");
    const confirm = container.querySelector(".b-2");

    clear.style.visibility = "visible";

    clear.addEventListener("click", ()=>{
        clear.style.visibility = "collapse";
    });

    container.addEventListener("click", (e)=>{
        e.stopPropagation();
    });

    cancel.addEventListener("click", ()=>{
        clear.style.visibility = "collapse";
    });

    confirm.addEventListener("click", ()=>{
        editor.runCommand("core:canvas-clear");
        clear.style.visibility = "collapse";
    });
}