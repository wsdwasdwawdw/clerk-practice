const firebaseConfig = {
  apiKey: "AIzaSyD6zhFT1FZyRnH8nybAT4ZPYBexHPqD5TM",
  authDomain: "capstone-8f915.firebaseapp.com",
  databaseURL: "https://capstone-8f915-default-rtdb.firebaseio.com",
  projectId: "capstone-8f915",
  storageBucket: "capstone-8f915.appspot.com",
  messagingSenderId: "193487820156",
  appId: "1:193487820156:web:707358816c42fb25d4c0f9",
  measurementId: "G-NN9YWS88J5"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const taong = localStorage.getItem("pangSave");
const named = sessionStorage.getItem("name");
//const laman = sessionStorage.getItem("laman");
//const muka = sessionStorage.getItem("css");
console.log(taong);
/* const styleElement = document.createElement("style");
styleElement.textContent = muka;
document.head.appendChild(styleElement); */

document.getElementById('title').innerText = named;

console.log(named);


const pD = JSON.parse(sessionStorage.getItem("projectData"));

const pU = sessionStorage.getItem("projectUid");
console.log(pU);

const editor = grapesjs.init({
  // Indicate where to init the editor. You can also pass an HTMLElement
  container: '#gjs',
  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  fromElement: true,
  // Size of the editor
  height: '100%',
  width: '100%',
  // Disable the storage manager for the moment
  storageManager: {
    type: 'local', // Type of the storage, available: 'local' | 'remote'
    autosave: true, // Store data automatically
    autoload: true, // Autoload stored data on init
    stepsBeforeSave: 1, // Trigger save after each change
    options: {
      local: {
        key: pU, // Replace with your dynamic ID if needed
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
        keyWidth: 'flex-basis',
      },
    
    },
    {
      id: 'panel-devices',
      el: '.panel__devices',
      buttons: [{
        id: 'device-desktop',
        label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ffffff;transform: ;msFilter:;"><path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h7v2H8v2h8v-2h-3v-2h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 14V5h16l.002 9H4z"></path></svg>',
        command: 'set-device-desktop',
        active: true,
        attributes: {
          title: "Desktop View",
        },
        togglable: false,
      },{
        id: 'device-tablet',
        label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ffffff;transform: rotate(270deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);"><path d="M6 2c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H6zm0 15V5h12l.002 12H6z"></path></svg>',
        command: 'set-device-tablet',
        attributes: {
          title: "Tablet View",
        },
        togglable: false,
      }, {
        id: 'device-mobile',
        label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;transform: ;msFilter:;"><path d="M17 2H7c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM7 16.999V5h10l.002 11.999H7z"></path></svg>',
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
        label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor; display: block;transform: rotate(180deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);"><path d="m21.207 11.278-2.035-2.035-1.415-1.415-5.035-5.035a.999.999 0 0 0-1.414 0L6.151 7.949 4.736 9.363a2.985 2.985 0 0 0-.878 2.122c0 .802.313 1.556.879 2.121l.707.707-2.122 2.122a2.925 2.925 0 0 0-.873 2.108 2.968 2.968 0 0 0 1.063 2.308 2.92 2.92 0 0 0 1.886.681c.834 0 1.654-.341 2.25-.937l2.039-2.039.707.706c1.133 1.133 3.107 1.134 4.242.001l.708-.707.569-.569.138-.138 5.156-5.157a.999.999 0 0 0 0-1.414zm-7.277 5.865-.708.706a1.021 1.021 0 0 1-1.414 0l-1.414-1.413a.999.999 0 0 0-1.414 0l-2.746 2.745a1.192 1.192 0 0 1-.836.352.914.914 0 0 1-.595-.208.981.981 0 0 1-.354-.782.955.955 0 0 1 .287-.692l2.829-2.829a.999.999 0 0 0 0-1.414l-1.414-1.415c-.189-.188-.293-.438-.293-.706s.104-.519.293-.708l.707-.707 3.536 3.536 3.536 3.535z"></path></svg>',
        command: 'show-styles',
        togglable: false,
      },{
        id: 'show-traits',
        active: true,
        label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentcolor; display: block;transform: rotate(180deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);"><path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path></svg>',
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
          label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentcolor; display: block;transform: ;msFilter:;"><path d="m21.484 7.125-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749z"></path><path d="m12 15.856-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.971-1.748L12 15.856z"></path><path d="m12 19.856-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.971-1.748L12 19.856z"></path></svg>',
          command: 'show-layers',
          // Once activated disable the possibility to turn it off
          togglable: false,
        },{
          id: 'show-blocks',
          active: true,
          label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor; display:block; transform: ;msFilter:;"><path d="m21.406 6.086-9-4a1.001 1.001 0 0 0-.813 0l-9 4c-.02.009-.034.024-.054.035-.028.014-.058.023-.084.04-.022.015-.039.034-.06.05a.87.87 0 0 0-.19.194c-.02.028-.041.053-.059.081a1.119 1.119 0 0 0-.076.165c-.009.027-.023.052-.031.079A1.013 1.013 0 0 0 2 7v10c0 .396.232.753.594.914l9 4c.13.058.268.086.406.086a.997.997 0 0 0 .402-.096l.004.01 9-4A.999.999 0 0 0 22 17V7a.999.999 0 0 0-.594-.914zM12 4.095 18.538 7 12 9.905l-1.308-.581L5.463 7 12 4.095zm1 15.366V11.65l7-3.111v7.812l-7 3.11z"></path></svg>',
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
editor.loadProjectData(pD);

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
      label: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="fill: currentcolor; display: block;"><path d="M9 21h12V3H3v18h6zm10-4v2h-6v-6h6v4zM15 5h4v6h-6V5h2zM5 7V5h6v6H5V7zm0 12v-6h6v6H5z"></path></svg>',
      command: 'sw-visibility', // Built-in command
      attributes: {
        title: "Toggle Borders",
      },
    }, 
    {
      id: 'export',
      className: 'btn-open-export',
      label: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="fill: #ffffff;display: block;"><path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"></path></svg>',
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
      label: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="fill: #ffffff; display: block;"><path d="M12.823 15.122c-.517 0-.816.491-.816 1.146 0 .661.311 1.126.82 1.126.517 0 .812-.49.812-1.146 0-.604-.291-1.126-.816-1.126z"></path><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8.022 16.704c0 .961-.461 1.296-1.2 1.296-.176 0-.406-.029-.557-.08l.086-.615c.104.035.239.06.391.06.319 0 .52-.145.52-.67v-2.122h.761v2.131zm1.459 1.291c-.385 0-.766-.1-.955-.205l.155-.631c.204.105.521.211.846.211.35 0 .534-.146.534-.365 0-.211-.159-.331-.564-.476-.562-.195-.927-.506-.927-.996 0-.576.481-1.017 1.277-1.017.38 0 .659.08.861.171l-.172.615c-.135-.065-.375-.16-.705-.16s-.491.15-.491.325c0 .215.19.311.627.476.596.22.876.53.876 1.006.001.566-.436 1.046-1.362 1.046zm3.306.005c-1.001 0-1.586-.755-1.586-1.716 0-1.012.646-1.768 1.642-1.768 1.035 0 1.601.776 1.601 1.707C14.443 17.33 13.773 18 12.787 18zm4.947-.055h-.802l-.721-1.302a12.64 12.64 0 0 1-.585-1.19l-.016.005c.021.445.031.921.031 1.472v1.016h-.701v-3.373h.891l.701 1.236c.2.354.4.775.552 1.155h.014c-.05-.445-.065-.9-.065-1.406v-.985h.702v3.372zM14 9h-1V4l5 5h-4z"></path></svg>',
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
        label: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="fill: #ffffff; display: block;"><path d="M7 6v12l10-6z"></path></svg>',
        context: 'preview',
        command: ()=> editor.runCommand("preview"),
        attributes: {
          title: "Preview",
        },
    },
    {
        id: 'clear',
        className: 'btn-clear',
        label: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="fill: #ffffff; display: block;"><path d="M12.48 3 7.73 7.75 3 12.59a2 2 0 0 0 0 2.82l4.3 4.3A1 1 0 0 0 8 20h12v-2h-7l7.22-7.22a2 2 0 0 0 0-2.83L15.31 3a2 2 0 0 0-2.83 0zM8.41 18l-4-4 4.75-4.84.74-.75 4.95 4.95-4.56 4.56-.07.08z"></path></svg>',
        context: 'clear',
        command: () => editor.runCommand("core:canvas-clear"),
        attributes: {
          title: "Clear",
        },
    },
    {
      id: 'undo',
      className: "btn-undo",
      context: "undo",
      command: () => editor.runCommand('core:undo'),
      label: `<svg viewBox="0 0 24 24" style="display: block; width: 22;">
          <path fill=" #ffffff" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
      </svg>`,
      attributes: {
        title: "Undo",
      },
    },
    {
      id: 'redo',
      className: "btn-redo",
      context: "redo",
      command: () => editor.runCommand('core:redo'),
      label: `<svg viewBox="0 0 24 24" style="display: block; width: 22;">
          <path fill=" #ffffff" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
      </svg>`,
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
      label: `<svg viewBox="0 0 24 24" style="display: block; width: 22; height: 22;">
          <path fill=" currentcolor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
      </svg>`,
      togglable: false
    },
    {
      id: "import",
      context: "import",
      className: "fullscreen",
      command: () => editor.runCommand('gjs-open-import-webpage'),
      label: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentcolor; display: block; transform: rotate(180deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);"><path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"></path><path d="M9.293 9.293 5.586 13l3.707 3.707 1.414-1.414L8.414 13l2.293-2.293zm5.414 0-1.414 1.414L15.586 13l-2.293 2.293 1.414 1.414L18.414 13z"></path></svg>`,
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



document.querySelector(".project").innerHTML = "Project name: " + named;




function saveToFirebase() {
    // Get the project name from the input field
    const projectName = named;
    const pD = editor.getProjectData();
    const user = firebase.auth().currentUser;
    // Ensure the project name is not empty
    /* if (!projectName) {
        alert("Please enter a project name.");
        return;
    } */

    // Get the HTML and CSS from the editor
    const htmlContent = editor.getHtml();
    const cssContent = editor.getCss();

    // Create a temporary container to render the content
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '-10000px'; // Move it offscreen
    tempContainer.style.height = "100%";
    tempContainer.style.width = "100%";
    tempContainer.innerHTML = htmlContent;

    // Apply the extracted CSS
    const styleElement = document.createElement('style');
    styleElement.innerHTML = cssContent;
    tempContainer.appendChild(styleElement);

    // Append the temp container to the body
    document.body.appendChild(tempContainer);

    if(user){
      db.collection("users").doc(user.uid).collection("Projects").where("project", "==", projectName).get()
      .then((querySnapshot) => {
          if (!querySnapshot.empty) {
              // If document exists, update it
              querySnapshot.forEach((doc) => {
                  db.collection("users").doc(user.uid).collection("Projects").doc(doc.id).update({
                      //content: htmlContent,
                      //css: cssContent,
                      projectData: pD,
                      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                  })
                  .then(() => {
                      console.log("Document successfully updated!");
                      const katawan = document.body;
  
                      const alerta = document.createElement("div");
                      alerta.style.width = "500px";
                      alerta.style.height = "100px";
                      alerta.style.backgroundColor = "#9ECE89";
                      alerta.style.position = "absolute";
                      alerta.style.top = "50%";
                      alerta.style.left = "50%";
                      alerta.style.transform = "translate(-50%, -50%)";
                      alerta.style.zIndex = "2147483647";
                      alerta.style.opacity = "0";
                      alerta.style.transition = " opacity .5s ease";
                      alerta.style.textAlign = "center";
                      alerta.style.borderRadius = "10px";
                      katawan.appendChild(alerta);
                
                      const check = document.createElement("img");
                      check.src = "IMG/alert check.png";
                      check.style.width = "15%";
                      check.style.position = "absolute";
                      check.style.left = "10px";
                      check.style.top = "10px";
                      check.style.zIndex = "2147483647";
                      alerta.appendChild(check)
                
                      const message = document.createElement("p");
                      message.textContent = "Project Successfully Saved!";
                      message.style.color = "#2E6A17";
                      message.style.zIndex = "2147483647";
                      message.style.margin = "6.5% 0 0 10%";
                      message.style.fontSize = "28px";
                      alerta.appendChild(message);
                
                      requestAnimationFrame(() => {
                        alerta.style.opacity = "1";
                      });
                
                      setTimeout(() => {
                        alerta.style.opacity = "0"; 
                        setTimeout(() => {
                            katawan.removeChild(alerta); 
                        }, 2000); 
                      }, 2000);
  
                      // Use html2canvas to capture the temp container
                      html2canvas(tempContainer).then(function(canvas) {
                          // Convert the canvas to a data URL (base64 encoded image)
                          const screenshotDataUrl = canvas.toDataURL();
  
                          // Save the screenshot in Firestore along with the document
                          db.collection("users").doc(user.uid).collection("Projects").doc(doc.id).update({
                              screenshot: screenshotDataUrl
                          }).then(() => {
                              console.log("Screenshot added to Firestore");
                          }).catch((error) => {
                              console.error("Error adding screenshot: ", error);
                          });
  
                          // Clean up by removing the temporary container
                          document.body.removeChild(tempContainer);
                      });
                  })
                  .catch((error) => {
                      console.error("Error updating document: ", error);
                  });
              });
          } else {
              // If document does not exist, create a new one
              db.collection("users").doc(user.uid).collection("Projects").add({
                  //content: htmlContent,
                  //css: cssContent,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  project: projectName,
                  user: taong,
                  projectData: pD
              })
              .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
  
                  // Use html2canvas to capture the temp container
                  html2canvas(tempContainer).then(function(canvas) {
                      // Convert the canvas to a data URL (base64 encoded image)
                      const screenshotDataUrl = canvas.toDataURL();
  
                      // Save the screenshot in Firebase Firestore along with the document
                      db.collection("users").doc(user.uid).collection("Projects").doc(docRef.id).update({
                          screenshot: screenshotDataUrl
                      }).then(() => {
                          console.log("Screenshot added to Firestore");
                      }).catch((error) => {
                          console.error("Error adding screenshot: ", error);
                      });
  
                      // Clean up by removing the temporary container
                      document.body.removeChild(tempContainer);
                  });
  
                  // Clear the input field
                  document.getElementById("name").value = "";
              })
              .catch((error) => {
                  console.error("Error adding document: ", error);
              });
          }
      })
      .catch((error) => {
          console.error("Error getting document: ", error);
      });
    }
    else{

    }
    // Find the document based on the project name
    
}

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
