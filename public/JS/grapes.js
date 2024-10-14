
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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      // User is signed in, access user email
      console.log(user.email);  // Safely access user's email
      localStorage.setItem("current", user.email);
  } else {
      // No user is signed in, handle accordingly
      console.log("No user is signed in.");
      window.location.href = "../index.html";
  }
});

const current = localStorage.getItem("current");
console.log(current);


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
    storageManager: false,
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
            label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentcolor;transform: ;msFilter:;"><path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h7v2H8v2h8v-2h-3v-2h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 14V5h16l.002 9H4z"></path></svg>',
            command: 'set-device-desktop',
            active: true,
            attributes: {
              title: "Desktop View",
            },
            togglable: false,
          },{
            id: 'device-tablet',
            label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentcolor;transform: rotate(270deg);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);"><path d="M6 2c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H6zm0 15V5h12l.002 12H6z"></path></svg>',
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
          label: `<div style="width: auto; height: 20px; display: flex; gap: 10px; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
          <path d="m14.013,13.649c.158,1.78-1.24,3.274-2.988,3.274h-4c-.681,0-1.163-.656-.961-1.307.499-1.608,1.936-4.181,4.249-4.626,1.755-.338,3.542.879,3.7,2.659ZM23.295.707c-.941-.942-2.467-.943-3.409-.002-.025.025-5.276,5.814-7.692,8.479.653.171,1.276.464,1.826.879.692.522,1.205,1.215,1.544,1.982l7.728-7.924c.943-.942.945-2.47.003-3.413Zm-7.305,13.764c-.117,1.047-.557,2.042-1.276,2.827-.945,1.033-2.29,1.625-3.688,1.625h-4c-.953,0-1.858-.457-2.422-1.223-.564-.767-.732-1.768-.449-2.678.708-2.283,2.536-5.101,5.371-5.874l2.866-3.16c1.091-1.202,1.978-2.181,2.711-2.988H5C2.243,3,0,5.243,0,8v11c0,2.757,2.243,5,5,5h11c2.757,0,5-2.243,5-5v-9.666l-5.01,5.137Z"/>
        </svg>
        <p>Styles</p>
        </div>`,
          command: 'show-styles',
          togglable: false,
        },{
          id: 'show-traits',
          active: true,
          label: `<div style="width: auto; height: 20px; display: flex; gap: 10px; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
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
          <div style="width: auto; height: 20px; display: flex; gap: 10px; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: currentcolor; display: block;transform: ;msFilter:;"><path d="m21.484 7.125-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749z"></path><path d="m12 15.856-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.971-1.748L12 15.856z"></path><path d="m12 19.856-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.971-1.748L12 19.856z"></path></svg>
          <p>Layers</p>
          </div>`,
            command: 'show-layers',
            // Once activated disable the possibility to turn it off
            togglable: false,
          },{
            id: 'show-blocks',
            active: true,
            label: `
          <div style="width: auto; height: 20px; display: flex; gap: 10px; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M14.762,11.587A5.5,5.5,0,0,1,13,12.223V23.874a4.922,4.922,0,0,0,1.5-.557l6.027-3.479a5.016,5.016,0,0,0,2.5-4.331V8.547a4.959,4.959,0,0,0-.265-1.57Z"/><path d="M10.242,9.857a3.531,3.531,0,0,0,3.521,0l8-4.61a4.983,4.983,0,0,0-1.238-1.027L14.5.737a5.015,5.015,0,0,0-5,0L3.473,4.217a4.974,4.974,0,0,0-1.2.983Z"/><path d="M11,12.223a5.493,5.493,0,0,1-1.763-.636L1.257,6.923A4.956,4.956,0,0,0,.973,8.547v6.96a5.016,5.016,0,0,0,2.5,4.331L9.5,23.317a4.922,4.922,0,0,0,1.5.557Z"/></svg>
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
        label: `<svg xmlns="http://www.w3.org/2000/svg" width="22" viewBox="0 0 24 24" display="block">
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
        label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="22" display="block"><path d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5ZM10.121,14.121l-4.041,4.041c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l4.041-4.041c.39-.39,.39-1.024,0-1.414L4.667,7.252c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l4.041,4.041c1.17,1.17,1.17,3.072,0,4.242Zm8.879,3.879h-7c-.552,0-1-.447-1-1s.448-1,1-1h7c.553,0,1,.447,1,1s-.447,1-1,1Z"/></svg>`,
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
        label: '<svg xmlns="http://www.w3.org/2000/svg" width="22" viewBox="0 0 24 24" style="fill: currentColor;" display="block"><path d="M12.823 15.122c-.517 0-.816.491-.816 1.146 0 .661.311 1.126.82 1.126.517 0 .812-.49.812-1.146 0-.604-.291-1.126-.816-1.126z"></path><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8.022 16.704c0 .961-.461 1.296-1.2 1.296-.176 0-.406-.029-.557-.08l.086-.615c.104.035.239.06.391.06.319 0 .52-.145.52-.67v-2.122h.761v2.131zm1.459 1.291c-.385 0-.766-.1-.955-.205l.155-.631c.204.105.521.211.846.211.35 0 .534-.146.534-.365 0-.211-.159-.331-.564-.476-.562-.195-.927-.506-.927-.996 0-.576.481-1.017 1.277-1.017.38 0 .659.08.861.171l-.172.615c-.135-.065-.375-.16-.705-.16s-.491.15-.491.325c0 .215.19.311.627.476.596.22.876.53.876 1.006.001.566-.436 1.046-1.362 1.046zm3.306.005c-1.001 0-1.586-.755-1.586-1.716 0-1.012.646-1.768 1.642-1.768 1.035 0 1.601.776 1.601 1.707C14.443 17.33 13.773 18 12.787 18zm4.947-.055h-.802l-.721-1.302a12.64 12.64 0 0 1-.585-1.19l-.016.005c.021.445.031.921.031 1.472v1.016h-.701v-3.373h.891l.701 1.236c.2.354.4.775.552 1.155h.014c-.05-.445-.065-.9-.065-1.406v-.985h.702v3.372zM14 9h-1V4l5 5h-4z"></path></svg>',
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
          label: `<svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="22" display="block"><path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"/></svg>`,
          context: 'preview',
          command: ()=> editor.runCommand("preview"),
          attributes: {
            title: "Preview",
          },
      },
      {
          id: 'clear',
          className: 'btn-clear',
          label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="22" display="block"><path d="m7.242,7.438L12.751,1.911c1.17-1.175,3.213-1.175,4.383,0l5.935,5.955c1.206,1.21,1.206,3.179,0,4.389l-5.506,5.525L7.242,7.438Zm7.111,13.562l1.798-1.804L5.83,8.855.882,13.82c-1.206,1.21-1.206,3.179,0,4.389l4.774,4.791h18.344v-2h-9.647Z"/></svg>`,
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
        label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="22" display="block"><path d="M7.7,15.007a1.5,1.5,0,0,1-2.121,0L.858,10.282a2.932,2.932,0,0,1,0-4.145L5.583,1.412A1.5,1.5,0,0,1,7.7,3.533L4.467,6.7l14.213,0A5.325,5.325,0,0,1,24,12.019V18.7a5.323,5.323,0,0,1-5.318,5.318H5.318a1.5,1.5,0,1,1,0-3H18.681A2.321,2.321,0,0,0,21,18.7V12.019A2.321,2.321,0,0,0,18.68,9.7L4.522,9.7,7.7,12.886A1.5,1.5,0,0,1,7.7,15.007Z"/></svg>`,
        attributes: {
          title: "Undo",
        },
      },
      {
        id: 'redo',
        className: "btn-redo",
        context: "redo",
        command: () => editor.runCommand('core:redo'),
        label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="22" display="block"><path d="M16.3,15.007a1.5,1.5,0,0,0,2.121,0l4.726-4.725a2.934,2.934,0,0,0,0-4.145L18.416,1.412A1.5,1.5,0,1,0,16.3,3.533L19.532,6.7,5.319,6.7A5.326,5.326,0,0,0,0,12.019V18.7a5.324,5.324,0,0,0,5.318,5.318H18.682a1.5,1.5,0,0,0,0-3H5.318A2.321,2.321,0,0,1,3,18.7V12.019A2.321,2.321,0,0,1,5.319,9.7l14.159,0L16.3,12.886A1.5,1.5,0,0,0,16.3,15.007Z"/></svg>`,
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
        label: `<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="22" display="block"><path d="M19,24H17a1,1,0,0,1,0-2h2a3,3,0,0,0,3-3V17a1,1,0,0,1,2,0v2A5.006,5.006,0,0,1,19,24Z"/><path d="M1,8A1,1,0,0,1,0,7V5A5.006,5.006,0,0,1,5,0H7A1,1,0,0,1,7,2H5A3,3,0,0,0,2,5V7A1,1,0,0,1,1,8Z"/><path d="M7,24H5a5.006,5.006,0,0,1-5-5V17a1,1,0,0,1,2,0v2a3,3,0,0,0,3,3H7a1,1,0,0,1,0,2Z"/><path d="M23,8a1,1,0,0,1-1-1V5a3,3,0,0,0-3-3H17a1,1,0,0,1,0-2h2a5.006,5.006,0,0,1,5,5V7A1,1,0,0,1,23,8Z"/></svg>`,
        togglable: false
      },
      {
        id: "import",
        context: "import",
        className: "fullscreen",
        command: () => editor.runCommand('gjs-open-import-webpage'),
        label: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="22" display="block"><path d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5ZM7.293,12.705l2.583,2.583c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-2.583-2.583c-.567-.566-.879-1.32-.879-2.122s.312-1.555,.879-2.122l2.583-2.583c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-2.583,2.583c-.189,.189-.293,.44-.293,.707s.104,.519,.293,.708Zm10.828,1.419l-2.583,2.583c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.583-2.583c.188-.189,.293-.44,.293-.708s-.104-.518-.293-.707l-2.583-2.584c-.391-.391-.391-1.024,0-1.414,.391-.391,1.023-.391,1.414,0l2.583,2.583c.566,.566,.879,1.32,.879,2.121s-.312,1.555-.879,2.122Z"/></svg>`,
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


const id = document.title;
if(id === "Newsletter"){
  const Newsletter = {
  "assets": [],
  "styles": [
      {
          "selectors": [],
          "selectorsAdd": "body",
          "style": {
              "font-family": "Arial, sans-serif",
              "color": "#333",
              "margin": "0",
              "padding": "0",
              "background-color": "#f4f4f4"
          }
      },
      {
          "selectors": [
              "container"
          ],
          "style": {
              "max-width": "600px",
              "margin": "20px auto",
              "background-color": "#fff",
              "padding": "20px",
              "box-shadow": "0 0 10px rgba(0, 0, 0, 0.1)"
          }
      },
      {
          "selectors": [
              "header"
          ],
          "style": {
              "background-color": "#2E6A17",
              "color": "white",
              "padding": "20px",
              "text-align": "center"
          }
      },
      {
          "selectors": [],
          "selectorsAdd": ".header h1",
          "style": {
              "margin": "0",
              "font-size": "28px"
          }
      },
      {
          "selectors": [
              "main-content"
          ],
          "style": {
              "padding": "20px"
          }
      },
      {
          "selectors": [],
          "selectorsAdd": ".main-content h2",
          "style": {
              "color": "#2E6A17",
              "font-size": "24px"
          }
      },
      {
          "selectors": [],
          "selectorsAdd": ".main-content p",
          "style": {
              "line-height": "1.6",
              "margin": "15px 0"
          }
      },
      {
          "selectors": [],
          "selectorsAdd": ".main-content img",
          "style": {
              "max-width": "100%",
              "height": "auto",
              "margin-bottom": "20px",
              "border-radius": "10px"
          }
      },
      {
          "selectors": [
              "cta"
          ],
          "style": {
              "background-color": "#9ECE89",
              "color": "#2E6A17",
              "padding": "15px",
              "text-align": "center",
              "margin": "20px 0",
              "border-radius": "5px"
          }
      },
      {
          "selectors": [],
          "selectorsAdd": ".cta a",
          "style": {
              "color": "#2E6A17",
              "text-decoration": "none",
              "font-weight": "bold",
              "font-size": "18px"
          }
      },
      {
          "selectors": [
              "footer"
          ],
          "style": {
              "text-align": "center",
              "color": "#777",
              "font-size": "14px",
              "padding": "20px 0",
              "border-top": "1px solid #ddd",
              "margin-top": "20px"
          }
      },
      {
          "selectors": [
              "social-icons"
          ],
          "style": {
              "margin": "20px 0",
              "text-align": "center"
          }
      },
      {
          "selectors": [],
          "selectorsAdd": ".social-icons img",
          "style": {
              "width": "40px",
              "margin": "0 10px"
          }
      }
  ],
  "pages": [
      {
          "frames": [
              {
                  "component": {
                      "type": "wrapper",
                      "stylable": [
                          "background",
                          "background-color",
                          "background-image",
                          "background-repeat",
                          "background-attachment",
                          "background-position",
                          "background-size"
                      ],
                      "components": [
                          {
                              "classes": [
                                  "header"
                              ],
                              "components": [
                                  {
                                      "tagName": "h1",
                                      "type": "text",
                                      "components": [
                                          {
                                              "type": "textnode",
                                              "content": "Monthly Newsletter"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "tagName": "NULL",
                              "type": "comment",
                              "content": " Main Content Section "
                          },
                          {
                              "classes": [
                                  "main-content"
                              ],
                              "components": [
                                  {
                                      "tagName": "h2",
                                      "type": "text",
                                      "components": [
                                          {
                                              "type": "textnode",
                                              "content": "Welcome to Our Latest Update!"
                                          }
                                      ]
                                  },
                                  {
                                      "tagName": "p",
                                      "type": "text",
                                      "components": [
                                          {
                                              "type": "textnode",
                                              "content": "Hello Subscriber,"
                                          }
                                      ]
                                  },
                                  {
                                      "tagName": "p",
                                      "type": "text",
                                      "components": [
                                          {
                                              "type": "textnode",
                                              "content": "We are excited to bring you the latest news and updates. This month, we have some great content lined up just for you!"
                                          }
                                      ]
                                  },
                                  {
                                      "tagName": "NULL",
                                      "type": "comment",
                                      "content": " Image "
                                  },
                                  {
                                      "type": "image",
                                      "resizable": {
                                          "ratioDefault": 1
                                      },
                                      "attributes": {
                                          "src": "https://via.placeholder.com/600x200",
                                          "alt": "Newsletter Image"
                                      }
                                  },
                                  {
                                      "tagName": "NULL",
                                      "type": "comment",
                                      "content": " Section 1 "
                                  },
                                  {
                                      "tagName": "h2",
                                      "type": "text",
                                      "components": [
                                          {
                                              "type": "textnode",
                                              "content": "What's New This Month?"
                                          }
                                      ]
                                  },
                                  {
                                      "tagName": "p",
                                      "type": "text",
                                      "components": [
                                          {
                                              "type": "textnode",
                                              "content": "Check out the latest features we've added to our platform. We've been working hard to improve your experience, and we're thrilled to share our progress with you."
                                          }
                                      ]
                                  },
                                  {
                                      "tagName": "NULL",
                                      "type": "comment",
                                      "content": " Call to Action (CTA) "
                                  },
                                  {
                                      "classes": [
                                          "cta"
                                      ],
                                      "components": [
                                          {
                                              "tagName": "p",
                                              "type": "text",
                                              "components": [
                                                  {
                                                      "type": "textnode",
                                                      "content": "Don't miss out on our exclusive offer! "
                                                  },
                                                  {
                                                      "type": "link",
                                                      "attributes": {
                                                          "href": "#"
                                                      },
                                                      "components": [
                                                          {
                                                              "type": "textnode",
                                                              "content": "Get 20% Off"
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      "type": "textnode",
                                                      "content": " your next purchase!"
                                                  }
                                              ]
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "tagName": "NULL",
                              "type": "comment",
                              "content": " Footer Section "
                          },
                          {
                              "classes": [
                                  "footer"
                              ],
                              "components": [
                                  {
                                      "tagName": "p",
                                      "type": "text",
                                      "components": [
                                          {
                                              "type": "textnode",
                                              "content": "Thank you for being part of our community. Stay tuned for more updates!"
                                          }
                                      ]
                                  },
                                  {
                                      "classes": [
                                          "social-icons"
                                      ],
                                      "components": [
                                          {
                                              "type": "link",
                                              "editable": false,
                                              "attributes": {
                                                  "href": "#"
                                              },
                                              "components": [
                                                  {
                                                      "type": "image",
                                                      "resizable": {
                                                          "ratioDefault": 1
                                                      },
                                                      "attributes": {
                                                          "src": "https://via.placeholder.com/40",
                                                          "alt": "Facebook"
                                                      }
                                                  }
                                              ]
                                          },
                                          {
                                              "type": "link",
                                              "editable": false,
                                              "attributes": {
                                                  "href": "#"
                                              },
                                              "components": [
                                                  {
                                                      "type": "image",
                                                      "resizable": {
                                                          "ratioDefault": 1
                                                      },
                                                      "attributes": {
                                                          "src": "https://via.placeholder.com/40",
                                                          "alt": "Twitter"
                                                      }
                                                  }
                                              ]
                                          },
                                          {
                                              "type": "link",
                                              "editable": false,
                                              "attributes": {
                                                  "href": "#"
                                              },
                                              "components": [
                                                  {
                                                      "type": "image",
                                                      "resizable": {
                                                          "ratioDefault": 1
                                                      },
                                                      "attributes": {
                                                          "src": "https://via.placeholder.com/40",
                                                          "alt": "Instagram"
                                                      }
                                                  }
                                              ]
                                          }
                                      ]
                                  },
                                  {
                                      "tagName": "p",
                                      "type": "text",
                                      "components": [
                                          {
                                              "type": "textnode",
                                              "content": "© 2024 Your Company Name. All rights reserved."
                                          }
                                      ]
                                  },
                                  {
                                      "tagName": "p",
                                      "type": "text",
                                      "components": [
                                          {
                                              "type": "link",
                                              "attributes": {
                                                  "href": "#"
                                              },
                                              "components": [
                                                  {
                                                      "type": "textnode",
                                                      "content": "Unsubscribe"
                                                  }
                                              ]
                                          },
                                          {
                                              "type": "textnode",
                                              "content": " | "
                                          },
                                          {
                                              "type": "link",
                                              "attributes": {
                                                  "href": "#"
                                              },
                                              "components": [
                                                  {
                                                      "type": "textnode",
                                                      "content": "Manage Preferences"
                                                  }
                                              ]
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  },
                  "id": "I5I4qsiskhEwg7N3"
              }
          ],
          "id": "ybn6NnG5DgW8PqG7"
      }
  ]
  }
  editor.loadProjectData(Newsletter);
}
else if(id === "Website"){
  const Website = {
    "assets": [],
    "styles": [
        {
            "selectors": [
                "clearfix"
            ],
            "style": {
                "clear": "both"
            }
        },
        {
            "selectors": [
                "header-banner"
            ],
            "style": {
                "padding-top": "35px",
                "padding-bottom": "100px",
                "color": "#ffffff",
                "font-family": "Helvetica, serif",
                "font-weight": "100",
                "background-image": "url(\"https://grapesjs.com/img/bg-gr-v.png\"), url(\"https://grapesjs.com/img/work-desk.jpg\")",
                "background-attachment": "scroll, scroll",
                "background-position": "left top, center center",
                "background-repeat": "repeat-y, no-repeat",
                "background-size": "contain, cover"
            }
        },
        {
            "selectors": [
                "container-width"
            ],
            "style": {
                "width": "90%",
                "max-width": "1150px",
                "margin": "0 auto"
            }
        },
        {
            "selectors": [
                "logo-container"
            ],
            "style": {
                "float": "left",
                "width": "50%"
            }
        },
        {
            "selectors": [
                "logo"
            ],
            "style": {
                "background-color": "#fff",
                "border-radius": "5px",
                "width": "130px",
                "padding": "10px",
                "min-height": "30px",
                "text-align": "center",
                "line-height": "30px",
                "color": "#4d114f",
                "font-size": "23px"
            }
        },
        {
            "selectors": [
                "menu"
            ],
            "style": {
                "float": "right",
                "width": "50%"
            }
        },
        {
            "selectors": [
                "menu-item"
            ],
            "style": {
                "float": "right",
                "font-size": "15px",
                "color": "#eee",
                "width": "130px",
                "padding": "10px",
                "min-height": "50px",
                "text-align": "center",
                "line-height": "30px",
                "font-weight": "400"
            }
        },
        {
            "selectors": [
                "lead-title"
            ],
            "style": {
                "margin": "150px 0 30px 0",
                "font-size": "40px"
            }
        },
        {
            "selectors": [
                "sub-lead-title"
            ],
            "style": {
                "max-width": "650px",
                "line-height": "30px",
                "margin-bottom": "30px",
                "color": "#c6c6c6"
            }
        },
        {
            "selectors": [
                "lead-btn"
            ],
            "style": {
                "margin-top": "15px",
                "padding": "10px",
                "width": "190px",
                "min-height": "30px",
                "font-size": "20px",
                "text-align": "center",
                "letter-spacing": "3px",
                "line-height": "30px",
                "background-color": "#d983a6",
                "border-radius": "5px",
                "transition": "all 0.5s ease",
                "cursor": "pointer"
            }
        },
        {
            "selectors": [
                "lead-btn"
            ],
            "style": {
                "background-color": "#ffffff",
                "color": "#4c114e"
            },
            "state": "hover"
        },
        {
            "selectors": [
                "lead-btn"
            ],
            "style": {
                "background-color": "#4d114f",
                "color": "#fff"
            },
            "state": "active"
        },
        {
            "selectors": [
                "flex-sect"
            ],
            "style": {
                "background-color": "#fafafa",
                "padding": "100px 0",
                "font-family": "Helvetica, serif"
            }
        },
        {
            "selectors": [
                "flex-title"
            ],
            "style": {
                "margin-bottom": "15px",
                "font-size": "2em",
                "text-align": "center",
                "font-weight": "700",
                "color": "#555",
                "padding": "5px"
            }
        },
        {
            "selectors": [
                "flex-desc"
            ],
            "style": {
                "margin-bottom": "55px",
                "font-size": "1em",
                "color": "rgba(0, 0, 0, 0.5)",
                "text-align": "center",
                "padding": "5px"
            }
        },
        {
            "selectors": [
                "cards"
            ],
            "style": {
                "padding": "20px 0",
                "display": "flex",
                "justify-content": "space-around",
                "flex-flow": "wrap"
            }
        },
        {
            "selectors": [
                "card"
            ],
            "style": {
                "background-color": "white",
                "height": "300px",
                "width": "300px",
                "margin-bottom": "30px",
                "box-shadow": "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
                "border-radius": "2px",
                "transition": "all 0.5s ease",
                "font-weight": "100",
                "overflow": "hidden"
            }
        },
        {
            "selectors": [
                "card"
            ],
            "style": {
                "margin-top": "-5px",
                "box-shadow": "0 20px 30px 0 rgba(0, 0, 0, 0.2)"
            },
            "state": "hover"
        },
        {
            "selectors": [
                "card-header"
            ],
            "style": {
                "height": "155px",
                "background-image": "url(\"https://via.placeholder.com/350x250/78c5d6/fff\")",
                "background-size": "cover",
                "background-position": "center center"
            }
        },
        {
            "selectors": [
                "card-header",
                "ch2"
            ],
            "style": {
                "background-image": "url(\"https://via.placeholder.com/350x250/459ba8/fff\")"
            }
        },
        {
            "selectors": [
                "card-header",
                "ch3"
            ],
            "style": {
                "background-image": "url(\"https://via.placeholder.com/350x250/79c267/fff\")"
            }
        },
        {
            "selectors": [
                "card-header",
                "ch4"
            ],
            "style": {
                "background-image": "url(\"https://via.placeholder.com/350x250/c5d647/fff\")"
            }
        },
        {
            "selectors": [
                "card-header",
                "ch5"
            ],
            "style": {
                "background-image": "url(\"https://via.placeholder.com/350x250/f28c33/fff\")"
            }
        },
        {
            "selectors": [
                "card-header",
                "ch6"
            ],
            "style": {
                "background-image": "url(\"https://via.placeholder.com/350x250/e868a2/fff\")"
            }
        },
        {
            "selectors": [
                "card-body"
            ],
            "style": {
                "padding": "15px 15px 5px 15px",
                "color": "#555"
            }
        },
        {
            "selectors": [
                "card-title"
            ],
            "style": {
                "font-size": "1.4em",
                "margin-bottom": "5px"
            }
        },
        {
            "selectors": [
                "card-sub-title"
            ],
            "style": {
                "color": "#b3b3b3",
                "font-size": "1em",
                "margin-bottom": "15px"
            }
        },
        {
            "selectors": [
                "card-desc"
            ],
            "style": {
                "font-size": "0.85rem",
                "line-height": "17px"
            }
        },
        {
            "selectors": [
                "am-sect"
            ],
            "style": {
                "padding-top": "100px",
                "padding-bottom": "100px",
                "font-family": "Helvetica, serif"
            }
        },
        {
            "selectors": [
                "img-phone"
            ],
            "style": {
                "float": "left"
            }
        },
        {
            "selectors": [
                "am-container"
            ],
            "style": {
                "display": "flex",
                "flex-wrap": "wrap",
                "align-items": "center",
                "justify-content": "space-around"
            }
        },
        {
            "selectors": [
                "am-content"
            ],
            "style": {
                "float": "left",
                "padding": "7px",
                "width": "490px",
                "color": "#444",
                "font-weight": "100",
                "margin-top": "50px"
            }
        },
        {
            "selectors": [
                "am-pre"
            ],
            "style": {
                "padding": "7px",
                "color": "#b1b1b1",
                "font-size": "15px"
            }
        },
        {
            "selectors": [
                "am-title"
            ],
            "style": {
                "padding": "7px",
                "font-size": "25px",
                "font-weight": "400"
            }
        },
        {
            "selectors": [
                "am-desc"
            ],
            "style": {
                "padding": "7px",
                "font-size": "17px",
                "line-height": "25px"
            }
        },
        {
            "selectors": [
                "am-post"
            ],
            "style": {
                "padding": "7px",
                "line-height": "25px",
                "font-size": "13px"
            }
        },
        {
            "selectors": [
                "blk-sect"
            ],
            "style": {
                "padding-top": "100px",
                "padding-bottom": "100px",
                "background-color": "#222222",
                "font-family": "Helvetica, serif"
            }
        },
        {
            "selectors": [
                "blk-title"
            ],
            "style": {
                "color": "#fff",
                "font-size": "25px",
                "text-align": "center",
                "margin-bottom": "15px"
            }
        },
        {
            "selectors": [
                "blk-desc"
            ],
            "style": {
                "color": "#b1b1b1",
                "font-size": "15px",
                "text-align": "center",
                "max-width": "700px",
                "margin": "0 auto",
                "font-weight": "100"
            }
        },
        {
            "selectors": [
                "price-cards"
            ],
            "style": {
                "margin-top": "70px",
                "display": "flex",
                "flex-wrap": "wrap",
                "align-items": "center",
                "justify-content": "space-around"
            }
        },
        {
            "selectors": [
                "price-card-cont"
            ],
            "style": {
                "width": "300px",
                "padding": "7px",
                "float": "left"
            }
        },
        {
            "selectors": [
                "price-card"
            ],
            "style": {
                "margin": "0 auto",
                "min-height": "350px",
                "background-color": "#d983a6",
                "border-radius": "5px",
                "font-weight": "100",
                "color": "#fff",
                "width": "90%"
            }
        },
        {
            "selectors": [
                "pc-title"
            ],
            "style": {
                "font-weight": "100",
                "letter-spacing": "3px",
                "text-align": "center",
                "font-size": "25px",
                "background-color": "rgba(0, 0, 0, 0.1)",
                "padding": "20px"
            }
        },
        {
            "selectors": [
                "pc-desc"
            ],
            "style": {
                "padding": "75px 0",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "pc-feature"
            ],
            "style": {
                "color": "rgba(255,255,255,0.5)",
                "background-color": "rgba(0, 0, 0, 0.1)",
                "letter-spacing": "2px",
                "font-size": "15px",
                "padding": "10px 20px"
            }
        },
        {
            "selectors": [
                "pc-feature"
            ],
            "style": {
                "background-color": "transparent"
            },
            "state": "nth-of-type(2n)"
        },
        {
            "selectors": [
                "pc-amount"
            ],
            "style": {
                "background-color": "rgba(0, 0, 0, 0.1)",
                "font-size": "35px",
                "text-align": "center",
                "padding": "35px 0"
            }
        },
        {
            "selectors": [
                "pc-regular"
            ],
            "style": {
                "background-color": "#da78a0"
            }
        },
        {
            "selectors": [
                "pc-enterprise"
            ],
            "style": {
                "background-color": "#d66a96"
            }
        },
        {
            "selectors": [
                "footer-under"
            ],
            "style": {
                "background-color": "#312833",
                "padding-bottom": "100px",
                "padding-top": "100px",
                "min-height": "500px",
                "color": "#eee",
                "position": "relative",
                "font-weight": "100",
                "font-family": "Helvetica,serif"
            }
        },
        {
            "selectors": [
                "led"
            ],
            "style": {
                "border-radius": "100%",
                "width": "10px",
                "height": "10px",
                "background-color": "rgba(0, 0, 0, 0.15)",
                "float": "left",
                "margin": "2px",
                "transition": "all 5s ease"
            }
        },
        {
            "selectors": [
                "led"
            ],
            "style": {
                "background-color": "#c29fca",
                "undefined": "undefined",
                "box-shadow": "0 0 5px #9d7aa5, 0 0 10px #e6c3ee",
                "transition": "all 0s ease"
            },
            "state": "hover"
        },
        {
            "selectors": [
                "copyright"
            ],
            "style": {
                "background-color": "rgba(0, 0, 0, 0.15)",
                "color": "rgba(238, 238, 238, 0.5)",
                "bottom": "0",
                "padding": "1em 0",
                "position": "absolute",
                "width": "100%",
                "font-size": "0.75em"
            }
        },
        {
            "selectors": [
                "made-with"
            ],
            "style": {
                "float": "left",
                "width": "50%",
                "padding": "5px 0"
            }
        },
        {
            "selectors": [
                "foot-social-btns"
            ],
            "style": {
                "display": "none",
                "float": "right",
                "width": "50%",
                "text-align": "right",
                "padding": "5px 0"
            }
        },
        {
            "selectors": [
                "footer-container"
            ],
            "style": {
                "display": "flex",
                "flex-wrap": "wrap",
                "align-items": "stretch",
                "justify-content": "space-around"
            }
        },
        {
            "selectors": [
                "foot-list"
            ],
            "style": {
                "float": "left",
                "width": "200px"
            }
        },
        {
            "selectors": [
                "foot-list-title"
            ],
            "style": {
                "font-weight": "400",
                "margin-bottom": "10px",
                "padding": "0.5em 0"
            }
        },
        {
            "selectors": [
                "foot-list-item"
            ],
            "style": {
                "color": "rgba(238, 238, 238, 0.8)",
                "font-size": "0.8em",
                "padding": "0.5em 0"
            }
        },
        {
            "selectors": [
                "foot-list-item"
            ],
            "style": {
                "color": "rgba(238, 238, 238, 1)"
            },
            "state": "hover"
        },
        {
            "selectors": [
                "foot-form-cont"
            ],
            "style": {
                "width": "300px",
                "float": "right"
            }
        },
        {
            "selectors": [
                "foot-form-title"
            ],
            "style": {
                "color": "rgba(255,255,255,0.75)",
                "font-weight": "400",
                "margin-bottom": "10px",
                "padding": "0.5em 0",
                "text-align": "right",
                "font-size": "2em"
            }
        },
        {
            "selectors": [
                "foot-form-desc"
            ],
            "style": {
                "font-size": "0.8em",
                "color": "rgba(255,255,255,0.55)",
                "line-height": "20px",
                "text-align": "right",
                "margin-bottom": "15px"
            }
        },
        {
            "selectors": [
                "form"
            ],
            "style": {
                "border-radius": "3px",
                "padding": "10px 15px",
                "background-color": "rgba(0,0,0,0.2)"
            }
        },
        {
            "selectors": [
                "input"
            ],
            "style": {
                "width": "100%",
                "margin-bottom": "15px",
                "padding": "7px 10px",
                "border-radius": "2px",
                "color": "#fff",
                "background-color": "#554c57",
                "border": "none"
            }
        },
        {
            "selectors": [
                "textarea"
            ],
            "style": {
                "width": "100%",
                "margin-bottom": "15px",
                "padding": "7px 10px",
                "border-radius": "2px",
                "color": "#fff",
                "background-color": "#554c57",
                "border": "none"
            }
        },
        {
            "selectors": [
                "select"
            ],
            "style": {
                "width": "100%",
                "margin-bottom": "15px",
                "padding": "7px 10px",
                "border-radius": "2px",
                "color": "#fff",
                "background-color": "#554c57",
                "border": "none",
                "height": "30px"
            }
        },
        {
            "selectors": [
                "sub-input"
            ],
            "style": {
                "width": "100%",
                "margin-bottom": "15px",
                "padding": "7px 10px",
                "border-radius": "2px",
                "color": "#fff",
                "background-color": "#554c57",
                "border": "none"
            }
        },
        {
            "selectors": [
                "label"
            ],
            "style": {
                "width": "100%",
                "display": "block"
            }
        },
        {
            "selectors": [
                "button"
            ],
            "style": {
                "width": "100%",
                "margin": "15px 0",
                "background-color": "#785580",
                "border": "none",
                "color": "#fff",
                "border-radius": "2px",
                "padding": "7px 10px",
                "font-size": "1em",
                "cursor": "pointer"
            }
        },
        {
            "selectors": [
                "sub-btn"
            ],
            "style": {
                "width": "100%",
                "margin": "15px 0",
                "background-color": "#785580",
                "border": "none",
                "color": "#fff",
                "border-radius": "2px",
                "padding": "7px 10px",
                "font-size": "1em",
                "cursor": "pointer"
            }
        },
        {
            "selectors": [
                "sub-btn"
            ],
            "style": {
                "background-color": "#91699a"
            },
            "state": "hover"
        },
        {
            "selectors": [
                "sub-btn"
            ],
            "style": {
                "background-color": "#573f5c"
            },
            "state": "active"
        },
        {
            "selectors": [
                "blk-row"
            ],
            "style": {
                "content": "\"\"",
                "clear": "both",
                "display": "block"
            },
            "state": ":after"
        },
        {
            "selectors": [
                "blk-row"
            ],
            "style": {
                "padding": "10px"
            }
        },
        {
            "selectors": [
                "blk1"
            ],
            "style": {
                "width": "100%",
                "padding": "10px",
                "min-height": "75px"
            }
        },
        {
            "selectors": [
                "blk2"
            ],
            "style": {
                "float": "left",
                "width": "50%",
                "padding": "10px",
                "min-height": "75px"
            }
        },
        {
            "selectors": [
                "blk3"
            ],
            "style": {
                "float": "left",
                "width": "33.3333%",
                "padding": "10px",
                "min-height": "75px"
            }
        },
        {
            "selectors": [
                "blk37l"
            ],
            "style": {
                "float": "left",
                "width": "30%",
                "padding": "10px",
                "min-height": "75px"
            }
        },
        {
            "selectors": [
                "blk37r"
            ],
            "style": {
                "float": "left",
                "width": "70%",
                "padding": "10px",
                "min-height": "75px"
            }
        },
        {
            "selectors": [
                "heading"
            ],
            "style": {
                "padding": "10px"
            }
        },
        {
            "selectors": [
                "paragraph"
            ],
            "style": {
                "padding": "10px"
            }
        },
        {
            "selectors": [
                "bdg-sect"
            ],
            "style": {
                "padding-top": "100px",
                "padding-bottom": "100px",
                "font-family": "Helvetica, serif",
                "background-color": "#fafafa"
            }
        },
        {
            "selectors": [
                "bdg-title"
            ],
            "style": {
                "text-align": "center",
                "font-size": "2em",
                "margin-bottom": "55px",
                "color": "#555555"
            }
        },
        {
            "selectors": [
                "badges"
            ],
            "style": {
                "padding": "20px",
                "display": "flex",
                "justify-content": "space-around",
                "align-items": "flex-start",
                "flex-wrap": "wrap"
            }
        },
        {
            "selectors": [
                "badge"
            ],
            "style": {
                "width": "290px",
                "font-family": "Helvetica, serif",
                "background-color": "white",
                "margin-bottom": "30px",
                "box-shadow": "0 2px 2px 0 rgba(0, 0, 0, 0.2)",
                "border-radius": "3px",
                "font-weight": "100",
                "overflow": "hidden",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "badge-header"
            ],
            "style": {
                "height": "115px",
                "background-image": "url(\"https://grapesjs.com/img/bg-gr-v.png\"), url(\"https://grapesjs.com/img/work-desk.jpg\")",
                "background-position": "left top, center center",
                "background-attachment": "scroll, fixed",
                "overflow": "hidden"
            }
        },
        {
            "selectors": [
                "blurer"
            ],
            "style": {
                "filter": "blur(5px)"
            }
        },
        {
            "selectors": [
                "badge-name"
            ],
            "style": {
                "font-size": "1.4em",
                "margin-bottom": "5px"
            }
        },
        {
            "selectors": [
                "badge-role"
            ],
            "style": {
                "color": "#777",
                "font-size": "1em",
                "margin-bottom": "25px"
            }
        },
        {
            "selectors": [
                "badge-desc"
            ],
            "style": {
                "font-size": "0.85rem",
                "line-height": "20px"
            }
        },
        {
            "selectors": [
                "badge-avatar"
            ],
            "style": {
                "width": "100px",
                "height": "100px",
                "border-radius": "100%",
                "border": "5px solid #fff",
                "box-shadow": "0 1px 1px 0 rgba(0, 0, 0, 0.2)",
                "margin-top": "-75px",
                "position": "relative"
            }
        },
        {
            "selectors": [
                "badge-body"
            ],
            "style": {
                "margin": "35px 10px"
            }
        },
        {
            "selectors": [
                "badge-foot"
            ],
            "style": {
                "color": "#fff",
                "background-color": "#a290a5",
                "padding-top": "13px",
                "padding-bottom": "13px",
                "display": "flex",
                "justify-content": "center"
            }
        },
        {
            "selectors": [
                "badge-link"
            ],
            "style": {
                "height": "35px",
                "width": "35px",
                "line-height": "35px",
                "font-weight": "700",
                "background-color": "#fff",
                "color": "#a290a5",
                "display": "block",
                "border-radius": "100%",
                "margin": "0 10px"
            }
        },
        {
            "selectors": [
                "quote"
            ],
            "style": {
                "color": "#777",
                "font-weight": "300",
                "padding": "10px",
                "box-shadow": "-5px 0 0 0 #ccc",
                "font-style": "italic",
                "margin": "20px 30px"
            }
        },
        {
            "selectors": [
                "foot-form-cont"
            ],
            "style": {
                "width": "400px"
            },
            "mediaText": "(max-width: 768px)",
            "atRuleType": "media"
        },
        {
            "selectors": [
                "foot-form-title"
            ],
            "style": {
                "width": "autopx"
            },
            "mediaText": "(max-width: 768px)",
            "atRuleType": "media"
        },
        {
            "selectors": [
                "foot-lists"
            ],
            "style": {
                "display": "none"
            },
            "mediaText": "(max-width: 480px)",
            "atRuleType": "media"
        }
    ],
    "pages": [
        {
            "frames": [
                {
                    "component": {
                        "type": "wrapper",
                        "stylable": [
                            "background",
                            "background-color",
                            "background-image",
                            "background-repeat",
                            "background-attachment",
                            "background-position",
                            "background-size"
                        ],
                        "components": [
                            {
                                "tagName": "header",
                                "classes": [
                                    "header-banner"
                                ],
                                "components": [
                                    {
                                        "classes": [
                                            "container-width"
                                        ],
                                        "components": [
                                            {
                                                "classes": [
                                                    "logo-container"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "text",
                                                        "classes": [
                                                            "logo"
                                                        ],
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "GrapesJS"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "nav",
                                                "classes": [
                                                    "menu"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "text",
                                                        "classes": [
                                                            "menu-item"
                                                        ],
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "BUILDER"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "text",
                                                        "classes": [
                                                            "menu-item"
                                                        ],
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "TEMPLATE"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "text",
                                                        "classes": [
                                                            "menu-item"
                                                        ],
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "WEB"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "classes": [
                                                    "clearfix"
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "classes": [
                                                    "lead-title"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Build your templates without coding"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "classes": [
                                                    "sub-lead-title"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "All text blocks could be edited easily with double clicking on it. You can create new text blocks with the command from the left panel"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "classes": [
                                                    "lead-btn"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Hover me"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "classes": [
                                    "flex-sect"
                                ],
                                "components": [
                                    {
                                        "classes": [
                                            "container-width"
                                        ],
                                        "components": [
                                            {
                                                "type": "text",
                                                "classes": [
                                                    "flex-title"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Flex is the new black"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "classes": [
                                                    "flex-desc"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "With flexbox system you're able to build complex layouts easily and with free responsivity"
                                                    }
                                                ]
                                            },
                                            {
                                                "classes": [
                                                    "cards"
                                                ],
                                                "components": [
                                                    {
                                                        "classes": [
                                                            "card"
                                                        ],
                                                        "components": [
                                                            {
                                                                "classes": [
                                                                    "card-header"
                                                                ]
                                                            },
                                                            {
                                                                "classes": [
                                                                    "card-body"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Title one"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-sub-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Subtitle one"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-desc"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "classes": [
                                                            "card"
                                                        ],
                                                        "components": [
                                                            {
                                                                "classes": [
                                                                    "card-header",
                                                                    "ch2"
                                                                ]
                                                            },
                                                            {
                                                                "classes": [
                                                                    "card-body"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Title two"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-sub-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Subtitle two"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-desc"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "classes": [
                                                            "card"
                                                        ],
                                                        "components": [
                                                            {
                                                                "classes": [
                                                                    "card-header",
                                                                    "ch3"
                                                                ]
                                                            },
                                                            {
                                                                "classes": [
                                                                    "card-body"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Title three"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-sub-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Subtitle three"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-desc"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "classes": [
                                                            "card"
                                                        ],
                                                        "components": [
                                                            {
                                                                "classes": [
                                                                    "card-header",
                                                                    "ch4"
                                                                ]
                                                            },
                                                            {
                                                                "classes": [
                                                                    "card-body"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Title four"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-sub-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Subtitle four"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-desc"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "classes": [
                                                            "card"
                                                        ],
                                                        "components": [
                                                            {
                                                                "classes": [
                                                                    "card-header",
                                                                    "ch5"
                                                                ]
                                                            },
                                                            {
                                                                "classes": [
                                                                    "card-body"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Title five"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-sub-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Subtitle five"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-desc"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "classes": [
                                                            "card"
                                                        ],
                                                        "components": [
                                                            {
                                                                "classes": [
                                                                    "card-header",
                                                                    "ch6"
                                                                ]
                                                            },
                                                            {
                                                                "classes": [
                                                                    "card-body"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Title six"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-sub-title"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Subtitle six"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "text",
                                                                        "classes": [
                                                                            "card-desc"
                                                                        ],
                                                                        "components": [
                                                                            {
                                                                                "type": "textnode",
                                                                                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "classes": [
                                    "am-sect"
                                ],
                                "components": [
                                    {
                                        "classes": [
                                            "container-width"
                                        ],
                                        "components": [
                                            {
                                                "classes": [
                                                    "am-container"
                                                ],
                                                "components": [
                                                    {
                                                        "classes": [
                                                            "am-content"
                                                        ],
                                                        "components": [
                                                            {
                                                                "type": "text",
                                                                "classes": [
                                                                    "am-pre"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "ASSET MANAGER"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "type": "text",
                                                                "classes": [
                                                                    "am-title"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Manage your images with Asset Manager"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "type": "text",
                                                                "classes": [
                                                                    "am-desc"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "You can create image blocks with the command from the left panel and edit them with double click"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "type": "text",
                                                                "classes": [
                                                                    "am-post"
                                                                ],
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Image uploading is not allowed in this demo"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "id": "imm7FFGRaID2l7Aa"
                }
            ],
            "id": "26aaQ3iI9NIljHOz"
        }
    ]
  }
  editor.loadProjectData(Website);
}
else if(id === "Blog"){
  const Blog = {
    "assets": [],
    "styles": [
        {
            "selectors": [],
            "selectorsAdd": "*",
            "style": {
                "margin": "0",
                "padding": "0",
                "box-sizing": "border-box"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "body",
            "style": {
                "font-family": "Arial, sans-serif",
                "line-height": "1.6",
                "background-color": "#f4f4f4",
                "color": "#333"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header",
            "style": {
                "background-color": "#333",
                "color": "#fff",
                "padding": "10px 0",
                "text-align": "center"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header h1",
            "style": {
                "margin-bottom": "10px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header nav ul",
            "style": {
                "list-style": "none"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header nav ul li",
            "style": {
                "display": "inline",
                "margin-right": "20px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header nav ul li a",
            "style": {
                "color": "#fff",
                "text-decoration": "none"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "main",
            "style": {
                "padding": "20px"
            }
        },
        {
            "selectors": [
                "post"
            ],
            "style": {
                "background": "#fff",
                "padding": "15px",
                "margin-bottom": "20px",
                "border-radius": "5px",
                "box-shadow": "0 0 10px rgba(0, 0, 0, 0.1)"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": ".post h2",
            "style": {
                "margin-bottom": "10px",
                "color": "#333"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": ".post .date",
            "style": {
                "font-size": "0.9em",
                "color": "#777"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button",
            "style": {
                "background-color": "#333",
                "color": "#fff",
                "padding": "10px 20px",
                "border": "none",
                "border-radius": "5px",
                "cursor": "pointer"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button:hover",
            "style": {
                "background-color": "#555"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "footer",
            "style": {
                "background-color": "#333",
                "color": "#fff",
                "text-align": "center",
                "padding": "10px 0",
                "position": "absolute",
                "bottom": "0",
                "width": "100%"
            }
        }
    ],
    "pages": [
        {
            "frames": [
                {
                    "component": {
                        "type": "wrapper",
                        "stylable": [
                            "background",
                            "background-color",
                            "background-image",
                            "background-repeat",
                            "background-attachment",
                            "background-position",
                            "background-size"
                        ],
                        "components": [
                            {
                                "tagName": "header",
                                "components": [
                                    {
                                        "tagName": "h1",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "My Blog"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "nav",
                                        "components": [
                                            {
                                                "tagName": "ul",
                                                "components": [
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Home"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "About"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Contact"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "main",
                                "components": [
                                    {
                                        "tagName": "article",
                                        "classes": [
                                            "post"
                                        ],
                                        "components": [
                                            {
                                                "tagName": "h2",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "First Blog Post"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "classes": [
                                                    "date"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Published on: August 18, 2024"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "This is the content of the first blog post. It's simple and easy to understand."
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "button",
                                                "attributes": {
                                                    "type": "button"
                                                },
                                                "text": "Like",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Like"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "article",
                                        "classes": [
                                            "post"
                                        ],
                                        "components": [
                                            {
                                                "tagName": "h2",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Second Blog Post"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "classes": [
                                                    "date"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Published on: August 17, 2024"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "This is the content of the second blog post. Stay tuned for more updates!"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "button",
                                                "attributes": {
                                                    "type": "button"
                                                },
                                                "text": "Like",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Like"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "footer",
                                "components": [
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "© 2024 My Blog. All rights reserved."
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "id": "Hx9xJwZPIGQXAwTr"
                }
            ],
            "id": "tbQlj33f9MjR1I0V"
        }
    ]
  }
  editor.loadProjectData(Blog);
}
else if(id === "Portfolio"){
  const Portfolio = {
    "assets": [],
    "styles": [
        {
            "selectors": [],
            "selectorsAdd": "body",
            "style": {
                "font-family": "Arial, sans-serif",
                "margin": "0",
                "padding": "0",
                "background-color": "#f4f4f4",
                "color": "#333"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header",
            "style": {
                "background-color": "#007bff",
                "color": "white",
                "padding": "20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul",
            "style": {
                "list-style": "none",
                "padding": "0"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li",
            "style": {
                "display": "inline",
                "margin": "0 15px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li a",
            "style": {
                "color": "white",
                "text-decoration": "none"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "section",
            "style": {
                "padding": "40px 20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "#about"
            ],
            "style": {
                "background-color": "#fff"
            }
        },
        {
            "selectors": [
                "#projects"
            ],
            "style": {
                "background-color": "#e9ecef"
            }
        },
        {
            "selectors": [
                "#contact"
            ],
            "style": {
                "background-color": "#fff"
            }
        },
        {
            "selectors": [
                "project"
            ],
            "style": {
                "margin": "20px auto",
                "max-width": "600px",
                "text-align": "left"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "footer",
            "style": {
                "background-color": "#007bff",
                "color": "white",
                "text-align": "center",
                "padding": "20px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "form",
            "style": {
                "max-width": "600px",
                "margin": "0 auto",
                "text-align": "left"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "input, textarea",
            "style": {
                "width": "100%",
                "padding": "10px",
                "margin-bottom": "10px",
                "border": "1px solid #ccc",
                "border-radius": "5px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button",
            "style": {
                "background-color": "#007bff",
                "color": "white",
                "border": "none",
                "padding": "10px 20px",
                "border-radius": "5px",
                "cursor": "pointer"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button:hover",
            "style": {
                "background-color": "#0056b3"
            }
        }
    ],
    "pages": [
        {
            "frames": [
                {
                    "component": {
                        "type": "wrapper",
                        "stylable": [
                            "background",
                            "background-color",
                            "background-image",
                            "background-repeat",
                            "background-attachment",
                            "background-position",
                            "background-size"
                        ],
                        "components": [
                            {
                                "tagName": "header",
                                "components": [
                                    {
                                        "tagName": "h1",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Your Name"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "nav",
                                        "components": [
                                            {
                                                "tagName": "ul",
                                                "components": [
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#about"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "About"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#projects"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Projects"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#contact"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Contact"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "about"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "About Me"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Brief introduction and background."
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "projects"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "My Projects"
                                            }
                                        ]
                                    },
                                    {
                                        "classes": [
                                            "project"
                                        ],
                                        "components": [
                                            {
                                                "tagName": "h3",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Project Title"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Description of the project."
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "NULL",
                                        "type": "comment",
                                        "content": " Repeat project divs as necessary "
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "contact"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Contact Me"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "form",
                                        "attributes": {
                                            "method": "get",
                                            "action": "#"
                                        },
                                        "components": [
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "name"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Name:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "input",
                                                "void": true,
                                                "attributes": {
                                                    "type": "text",
                                                    "id": "name",
                                                    "name": "name",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "email"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Email:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "input",
                                                "void": true,
                                                "attributes": {
                                                    "type": "email",
                                                    "id": "email",
                                                    "name": "email",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "message"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Message:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "textarea",
                                                "attributes": {
                                                    "id": "message",
                                                    "name": "message",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "attributes": {
                                                    "type": "submit"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Send"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "footer",
                                "components": [
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "© 2024 Your Name. All rights reserved."
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "id": "oa4OHlMD1syl2tjt"
                }
            ],
            "id": "twa1iyJjQe9xPuWC"
        }
    ]
  }
  editor.loadProjectData(Portfolio);
}
else if(id === "Business"){
  const Business = {
    "assets": [],
    "styles": [
        {
            "selectors": [],
            "selectorsAdd": "body",
            "style": {
                "font-family": "Arial, sans-serif",
                "margin": "0",
                "padding": "0",
                "background-color": "#f4f4f4",
                "color": "#333"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header",
            "style": {
                "background-color": "#333",
                "color": "white",
                "padding": "20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul",
            "style": {
                "list-style": "none",
                "padding": "0"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li",
            "style": {
                "display": "inline",
                "margin": "0 15px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li a",
            "style": {
                "color": "white",
                "text-decoration": "none"
            }
        },
        {
            "selectors": [
                "#hero"
            ],
            "style": {
                "background-color": "#007bff",
                "color": "white",
                "padding": "60px 20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "cta-button"
            ],
            "style": {
                "background-color": "white",
                "color": "#007bff",
                "padding": "10px 20px",
                "text-decoration": "none",
                "border-radius": "5px",
                "display": "inline-block",
                "margin-top": "20px"
            }
        },
        {
            "selectors": [
                "cta-button"
            ],
            "style": {
                "background-color": "#0056b3",
                "color": "white"
            },
            "state": "hover"
        },
        {
            "selectors": [],
            "selectorsAdd": "section",
            "style": {
                "padding": "40px 20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "#services"
            ],
            "style": {
                "background-color": "#e9ecef"
            }
        },
        {
            "selectors": [
                "service"
            ],
            "style": {
                "margin": "20px auto",
                "max-width": "600px",
                "text-align": "left"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "footer",
            "style": {
                "background-color": "#333",
                "color": "white",
                "text-align": "center",
                "padding": "20px"
            }
        }
    ],
    "pages": [
        {
            "frames": [
                {
                    "component": {
                        "type": "wrapper",
                        "stylable": [
                            "background",
                            "background-color",
                            "background-image",
                            "background-repeat",
                            "background-attachment",
                            "background-position",
                            "background-size"
                        ],
                        "components": [
                            {
                                "tagName": "header",
                                "components": [
                                    {
                                        "tagName": "h1",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Business Name"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "nav",
                                        "components": [
                                            {
                                                "tagName": "ul",
                                                "components": [
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#services"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Services"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#about"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "About Us"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#contact"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Contact"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "hero"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Welcome to Our Business"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Your one-stop solution for [Service]."
                                            }
                                        ]
                                    },
                                    {
                                        "type": "link",
                                        "classes": [
                                            "cta-button"
                                        ],
                                        "attributes": {
                                            "href": "#services"
                                        },
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Learn More"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "services"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Our Services"
                                            }
                                        ]
                                    },
                                    {
                                        "classes": [
                                            "service"
                                        ],
                                        "components": [
                                            {
                                                "tagName": "h3",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Service 1"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Description of service 1."
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "classes": [
                                            "service"
                                        ],
                                        "components": [
                                            {
                                                "tagName": "h3",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Service 2"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Description of service 2."
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "about"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "About Us"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Information about the company."
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "contact"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Contact Us"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "form",
                                        "attributes": {
                                            "method": "get",
                                            "action": "#"
                                        },
                                        "components": [
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "name"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Name:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "input",
                                                "void": true,
                                                "attributes": {
                                                    "type": "text",
                                                    "id": "name",
                                                    "name": "name",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "email"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Email:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "input",
                                                "void": true,
                                                "attributes": {
                                                    "type": "email",
                                                    "id": "email",
                                                    "name": "email",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "message"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Message:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "textarea",
                                                "attributes": {
                                                    "id": "message",
                                                    "name": "message",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "attributes": {
                                                    "type": "submit"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Send"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "footer",
                                "components": [
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "© 2024 Business Name. All rights reserved."
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "id": "EBmTY3FwKEslO49y"
                }
            ],
            "id": "GsQhgOrITHZcVTXF"
        }
    ]
  }
  editor.loadProjectData(Business);
}
else if(id === "E-Commerce"){
  const Ecommerce = {
    "assets": [],
    "styles": [
        {
            "selectors": [],
            "selectorsAdd": "body",
            "style": {
                "font-family": "Arial, sans-serif",
                "margin": "0",
                "padding": "0",
                "background-color": "#f4f4f4",
                "color": "#333"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header",
            "style": {
                "background-color": "#333",
                "color": "white",
                "padding": "20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul",
            "style": {
                "list-style": "none",
                "padding": "0"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li",
            "style": {
                "display": "inline",
                "margin": "0 15px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li a",
            "style": {
                "color": "white",
                "text-decoration": "none"
            }
        },
        {
            "selectors": [
                "#product"
            ],
            "style": {
                "display": "flex",
                "flex-wrap": "wrap",
                "justify-content": "center",
                "align-items": "center",
                "padding": "40px 20px",
                "background-color": "white",
                "margin": "20px",
                "border-radius": "5px",
                "box-shadow": "0 0 10px rgba(0, 0, 0, 0.1)"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": ".product-image img",
            "style": {
                "max-width": "100%",
                "border-radius": "5px"
            }
        },
        {
            "selectors": [
                "product-details"
            ],
            "style": {
                "max-width": "600px",
                "margin-left": "20px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": ".product-details h2",
            "style": {
                "color": "#007bff"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button",
            "style": {
                "background-color": "#007bff",
                "color": "white",
                "border": "none",
                "padding": "10px 20px",
                "border-radius": "5px",
                "cursor": "pointer",
                "margin-top": "20px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button:hover",
            "style": {
                "background-color": "#0056b3"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "footer",
            "style": {
                "background-color": "#333",
                "color": "white",
                "text-align": "center",
                "padding": "20px"
            }
        }
    ],
    "pages": [
        {
            "frames": [
                {
                    "component": {
                        "type": "wrapper",
                        "stylable": [
                            "background",
                            "background-color",
                            "background-image",
                            "background-repeat",
                            "background-attachment",
                            "background-position",
                            "background-size"
                        ],
                        "components": [
                            {
                                "tagName": "header",
                                "components": [
                                    {
                                        "tagName": "h1",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Online Store"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "nav",
                                        "components": [
                                            {
                                                "tagName": "ul",
                                                "components": [
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#home"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Home"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#shop"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Shop"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#contact"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Contact"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "product"
                                },
                                "components": [
                                    {
                                        "classes": [
                                            "product-image"
                                        ],
                                        "components": [
                                            {
                                                "type": "image",
                                                "resizable": {
                                                    "ratioDefault": 1
                                                },
                                                "attributes": {
                                                    "src": "product.jpg",
                                                    "alt": "Product Image"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "classes": [
                                            "product-details"
                                        ],
                                        "components": [
                                            {
                                                "tagName": "h2",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Product Name"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Price: $99.99"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Description of the product."
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "button",
                                                "attributes": {
                                                    "type": "button"
                                                },
                                                "text": "Add to Cart",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Add to Cart"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "footer",
                                "components": [
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "© 2024 Online Store. All rights reserved."
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "id": "fQDO9wy2Zv2LtKgz"
                }
            ],
            "id": "KRQEMwjg2ZoQDsVq"
        }
    ]
  }
  editor.loadProjectData(Ecommerce);
}
else if(id === "Restaurant"){
  const Restaurant = {
    "assets": [],
    "styles": [
        {
            "selectors": [],
            "selectorsAdd": "body",
            "style": {
                "font-family": "Arial, sans-serif",
                "margin": "0",
                "padding": "0",
                "background-color": "#fff",
                "color": "#333"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header",
            "style": {
                "background-color": "#d9534f",
                "color": "white",
                "padding": "20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul",
            "style": {
                "list-style": "none",
                "padding": "0"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li",
            "style": {
                "display": "inline",
                "margin": "0 15px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li a",
            "style": {
                "color": "white",
                "text-decoration": "none"
            }
        },
        {
            "selectors": [
                "#hero"
            ],
            "style": {
                "background-image": "url('restaurant.jpg')",
                "background-size": "cover",
                "color": "white",
                "padding": "100px 20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "cta-button"
            ],
            "style": {
                "background-color": "white",
                "color": "#d9534f",
                "padding": "10px 20px",
                "text-decoration": "none",
                "border-radius": "5px",
                "display": "inline-block",
                "margin-top": "20px"
            }
        },
        {
            "selectors": [
                "cta-button"
            ],
            "style": {
                "background-color": "#c9302c",
                "color": "white"
            },
            "state": "hover"
        },
        {
            "selectors": [],
            "selectorsAdd": "section",
            "style": {
                "padding": "40px 20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "#menu"
            ],
            "style": {
                "background-color": "#f7f7f7"
            }
        },
        {
            "selectors": [
                "menu-item"
            ],
            "style": {
                "margin": "20px auto",
                "max-width": "600px",
                "text-align": "left"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "footer",
            "style": {
                "background-color": "#d9534f",
                "color": "white",
                "text-align": "center",
                "padding": "20px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "form",
            "style": {
                "max-width": "600px",
                "margin": "0 auto",
                "text-align": "left"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "input, textarea",
            "style": {
                "width": "100%",
                "padding": "10px",
                "margin-bottom": "10px",
                "border": "1px solid #ccc",
                "border-radius": "5px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button",
            "style": {
                "background-color": "#d9534f",
                "color": "white",
                "border": "none",
                "padding": "10px 20px",
                "border-radius": "5px",
                "cursor": "pointer"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button:hover",
            "style": {
                "background-color": "#c9302c"
            }
        }
    ],
    "pages": [
        {
            "frames": [
                {
                    "component": {
                        "type": "wrapper",
                        "stylable": [
                            "background",
                            "background-color",
                            "background-image",
                            "background-repeat",
                            "background-attachment",
                            "background-position",
                            "background-size"
                        ],
                        "components": [
                            {
                                "tagName": "header",
                                "components": [
                                    {
                                        "tagName": "h1",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Restaurant Name"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "nav",
                                        "components": [
                                            {
                                                "tagName": "ul",
                                                "components": [
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#menu"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Menu"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#about"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "About Us"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#contact"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Contact"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "hero"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Welcome to Restaurant Name"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Experience the best dining in town."
                                            }
                                        ]
                                    },
                                    {
                                        "type": "link",
                                        "classes": [
                                            "cta-button"
                                        ],
                                        "attributes": {
                                            "href": "#menu"
                                        },
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "View Menu"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "menu"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Our Menu"
                                            }
                                        ]
                                    },
                                    {
                                        "classes": [
                                            "menu-item"
                                        ],
                                        "components": [
                                            {
                                                "tagName": "h3",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Dish Name"
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Description of the dish."
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Price: $12.99"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "NULL",
                                        "type": "comment",
                                        "content": " Repeat for more menu items "
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "about"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "About Us"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Information about the restaurant."
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "contact"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Contact Us"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "form",
                                        "attributes": {
                                            "method": "get",
                                            "action": "#"
                                        },
                                        "components": [
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "name"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Name:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "input",
                                                "void": true,
                                                "attributes": {
                                                    "type": "text",
                                                    "id": "name",
                                                    "name": "name",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "email"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Email:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "input",
                                                "void": true,
                                                "attributes": {
                                                    "type": "email",
                                                    "id": "email",
                                                    "name": "email",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "message"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Message:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "textarea",
                                                "attributes": {
                                                    "id": "message",
                                                    "name": "message",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "attributes": {
                                                    "type": "submit"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Send"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "footer",
                                "components": [
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "© 2024 Restaurant Name. All rights reserved"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "id": "raNXYH1faQLbKOEv"
                }
            ],
            "id": "MVHJvr20m1HnkV9A"
        }
    ]
  }
  editor.loadProjectData(Restaurant);
}
else if(id === "Agency"){
  const Agency = {
    "assets": [],
    "styles": [
        {
            "selectors": [],
            "selectorsAdd": "body",
            "style": {
                "font-family": "'Arial', sans-serif",
                "margin": "0",
                "padding": "0",
                "color": "#333",
                "background-color": "#f4f4f4"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "header",
            "style": {
                "background-color": "#222",
                "color": "white",
                "display": "flex",
                "justify-content": "space-between",
                "align-items": "center",
                "padding": "20px"
            }
        },
        {
            "selectors": [
                "logo"
            ],
            "style": {
                "font-size": "1.5em",
                "font-weight": "bold"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul",
            "style": {
                "list-style": "none",
                "display": "flex",
                "margin": "0",
                "padding": "0"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li",
            "style": {
                "margin": "0 15px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li a",
            "style": {
                "color": "white",
                "text-decoration": "none",
                "transition": "color 0.3s ease"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "nav ul li a:hover",
            "style": {
                "color": "#f39c12"
            }
        },
        {
            "selectors": [
                "hero"
            ],
            "style": {
                "background-size": "cover",
                "background-position": "center",
                "color": "white",
                "padding": "100px 20px",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "cta-button"
            ],
            "style": {
                "background-color": "#f39c12",
                "color": "white",
                "padding": "10px 20px",
                "text-decoration": "none",
                "border-radius": "5px",
                "display": "inline-block",
                "margin-top": "20px",
                "transition": "background-color 0.3s ease"
            }
        },
        {
            "selectors": [
                "cta-button"
            ],
            "style": {
                "background-color": "#d35400"
            },
            "state": "hover"
        },
        {
            "selectors": [
                "#services"
            ],
            "style": {
                "padding": "60px 20px",
                "background-color": "#fff",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "services-container"
            ],
            "style": {
                "display": "flex",
                "justify-content": "space-around",
                "flex-wrap": "wrap"
            }
        },
        {
            "selectors": [
                "service-item"
            ],
            "style": {
                "max-width": "300px",
                "padding": "20px",
                "margin": "10px",
                "background-color": "#f9f9f9",
                "border-radius": "8px",
                "transition": "transform 0.3s ease"
            }
        },
        {
            "selectors": [
                "service-item"
            ],
            "style": {
                "transform": "translateY(-10px)"
            },
            "state": "hover"
        },
        {
            "selectors": [],
            "selectorsAdd": ".service-item .icon",
            "style": {
                "font-size": "2em",
                "margin-bottom": "15px",
                "color": "#f39c12"
            }
        },
        {
            "selectors": [
                "#portfolio"
            ],
            "style": {
                "padding": "60px 20px",
                "background-color": "#f7f7f7",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "portfolio-gallery"
            ],
            "style": {
                "display": "flex",
                "justify-content": "space-around",
                "flex-wrap": "wrap"
            }
        },
        {
            "selectors": [
                "portfolio-item"
            ],
            "style": {
                "position": "relative",
                "width": "calc(33.333% - 20px)",
                "margin": "10px",
                "overflow": "hidden",
                "border-radius": "8px",
                "transition": "transform 0.3s ease"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": ".portfolio-item img",
            "style": {
                "width": "100%",
                "height": "auto",
                "display": "block",
                "transition": "transform 0.3s ease"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": ".portfolio-item:hover img",
            "style": {
                "transform": "scale(1.1)"
            }
        },
        {
            "selectors": [
                "overlay"
            ],
            "style": {
                "position": "absolute",
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                "background": "rgba(0, 0, 0, 0.6)",
                "color": "white",
                "opacity": "0",
                "transition": "opacity 0.3s ease",
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
                "text-align": "center",
                "padding": "20px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": ".portfolio-item:hover .overlay",
            "style": {
                "opacity": "1"
            }
        },
        {
            "selectors": [
                "#team"
            ],
            "style": {
                "padding": "60px 20px",
                "background-color": "#fff",
                "text-align": "center"
            }
        },
        {
            "selectors": [
                "team-container"
            ],
            "style": {
                "display": "flex",
                "justify-content": "space-around",
                "flex-wrap": "wrap"
            }
        },
        {
            "selectors": [
                "team-member"
            ],
            "style": {
                "max-width": "250px",
                "margin": "10px",
                "text-align": "center"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": ".team-member img",
            "style": {
                "border-radius": "50%",
                "width": "100px",
                "height": "100px",
                "object-fit": "cover",
                "margin-bottom": "10px"
            }
        },
        {
            "selectors": [
                "#contact"
            ],
            "style": {
                "padding": "60px 20px",
                "background-color": "#f39c12",
                "color": "white",
                "text-align": "center"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "form",
            "style": {
                "max-width": "600px",
                "margin": "20px auto",
                "text-align": "left"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "input, textarea",
            "style": {
                "width": "100%",
                "padding": "10px",
                "margin-bottom": "10px",
                "border": "none",
                "border-radius": "5px"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button",
            "style": {
                "background-color": "white",
                "color": "#f39c12",
                "border": "none",
                "padding": "10px 20px",
                "border-radius": "5px",
                "cursor": "pointer",
                "transition": "background-color 0.3s ease"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "button:hover",
            "style": {
                "background-color": "#e67e22"
            }
        },
        {
            "selectors": [],
            "selectorsAdd": "footer",
            "style": {
                "background-color": "#222"
            }
        }
    ],
    "pages": [
        {
            "frames": [
                {
                    "component": {
                        "type": "wrapper",
                        "stylable": [
                            "background",
                            "background-color",
                            "background-image",
                            "background-repeat",
                            "background-attachment",
                            "background-position",
                            "background-size"
                        ],
                        "components": [
                            {
                                "tagName": "header",
                                "components": [
                                    {
                                        "type": "text",
                                        "classes": [
                                            "logo"
                                        ],
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "AgencyName"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "nav",
                                        "components": [
                                            {
                                                "tagName": "ul",
                                                "components": [
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#home"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Home"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#services"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Services"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#portfolio"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Portfolio"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#team"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Team"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "li",
                                                        "components": [
                                                            {
                                                                "type": "link",
                                                                "attributes": {
                                                                    "href": "#contact"
                                                                },
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Contact"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "classes": [
                                    "hero"
                                ],
                                "attributes": {
                                    "id": "home"
                                },
                                "components": [
                                    {
                                        "tagName": "h1",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "We Create Amazing Digital Experiences"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Your vision, our expertise. Let's bring your ideas to life."
                                            }
                                        ]
                                    },
                                    {
                                        "type": "link",
                                        "classes": [
                                            "cta-button"
                                        ],
                                        "attributes": {
                                            "href": "#services"
                                        },
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Discover More"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "services"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Our Services"
                                            }
                                        ]
                                    },
                                    {
                                        "classes": [
                                            "services-container"
                                        ],
                                        "components": [
                                            {
                                                "classes": [
                                                    "service-item"
                                                ],
                                                "components": [
                                                    {
                                                        "tagName": "i",
                                                        "type": "text",
                                                        "classes": [
                                                            "icon"
                                                        ],
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "🎨"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "h3",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Design"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "p",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Creating visually stunning and user-friendly designs."
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "classes": [
                                                    "service-item"
                                                ],
                                                "components": [
                                                    {
                                                        "tagName": "i",
                                                        "type": "text",
                                                        "classes": [
                                                            "icon"
                                                        ],
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "💻"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "h3",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Development"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "p",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Building high-performance, scalable websites and apps."
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "classes": [
                                                    "service-item"
                                                ],
                                                "components": [
                                                    {
                                                        "tagName": "i",
                                                        "type": "text",
                                                        "classes": [
                                                            "icon"
                                                        ],
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "📈"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "h3",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Marketing"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "p",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Delivering data-driven strategies to grow your brand."
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "portfolio"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Our Work"
                                            }
                                        ]
                                    },
                                    {
                                        "classes": [
                                            "portfolio-gallery"
                                        ],
                                        "components": [
                                            {
                                                "classes": [
                                                    "portfolio-item"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "image",
                                                        "resizable": {
                                                            "ratioDefault": 1
                                                        },
                                                        "attributes": {
                                                            "src": "",
                                                            "alt": "Project 1"
                                                        }
                                                    },
                                                    {
                                                        "classes": [
                                                            "overlay"
                                                        ],
                                                        "components": [
                                                            {
                                                                "tagName": "h3",
                                                                "type": "text",
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Project Title"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "tagName": "p",
                                                                "type": "text",
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Short description of the project."
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "classes": [
                                                    "portfolio-item"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "image",
                                                        "resizable": {
                                                            "ratioDefault": 1
                                                        },
                                                        "attributes": {
                                                            "src": "",
                                                            "alt": "Project 2"
                                                        }
                                                    },
                                                    {
                                                        "classes": [
                                                            "overlay"
                                                        ],
                                                        "components": [
                                                            {
                                                                "tagName": "h3",
                                                                "type": "text",
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Project Title"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "tagName": "p",
                                                                "type": "text",
                                                                "components": [
                                                                    {
                                                                        "type": "textnode",
                                                                        "content": "Short description of the project."
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "NULL",
                                                "type": "comment",
                                                "content": " Add more portfolio items as needed "
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "team"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Meet the Team"
                                            }
                                        ]
                                    },
                                    {
                                        "classes": [
                                            "team-container"
                                        ],
                                        "components": [
                                            {
                                                "classes": [
                                                    "team-member"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "image",
                                                        "resizable": {
                                                            "ratioDefault": 1
                                                        },
                                                        "attributes": {
                                                            "src": "",
                                                            "alt": "Team Member"
                                                        }
                                                    },
                                                    {
                                                        "tagName": "h3",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "John Doe"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "p",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "CEO & Founder"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "classes": [
                                                    "team-member"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "image",
                                                        "resizable": {
                                                            "ratioDefault": 1
                                                        },
                                                        "attributes": {
                                                            "src": "",
                                                            "alt": "Team Member"
                                                        }
                                                    },
                                                    {
                                                        "tagName": "h3",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Jane Smith"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "p",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Lead Designer"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "classes": [
                                                    "team-member"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "image",
                                                        "resizable": {
                                                            "ratioDefault": 1
                                                        },
                                                        "attributes": {
                                                            "src": "",
                                                            "alt": "Team Member"
                                                        }
                                                    },
                                                    {
                                                        "tagName": "h3",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Mike Johnson"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "tagName": "p",
                                                        "type": "text",
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Head of Development"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "NULL",
                                                "type": "comment",
                                                "content": " Add more team members as needed "
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "section",
                                "attributes": {
                                    "id": "contact"
                                },
                                "components": [
                                    {
                                        "tagName": "h2",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Contact Us"
                                            }
                                        ]
                                    },
                                    {
                                        "tagName": "p",
                                        "type": "text",
                                        "components": [
                                            {
                                                "type": "textnode",
                                                "content": "Ready to work together? Get in touch with us!"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "form",
                                        "attributes": {
                                            "method": "get",
                                            "action": "#"
                                        },
                                        "components": [
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "name"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Name:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "input",
                                                "void": true,
                                                "attributes": {
                                                    "type": "text",
                                                    "id": "name",
                                                    "name": "name",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "email"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Email:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "input",
                                                "void": true,
                                                "attributes": {
                                                    "type": "email",
                                                    "id": "email",
                                                    "name": "email",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "attributes": {
                                                    "for": "message"
                                                },
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Message:"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "textarea",
                                                "attributes": {
                                                    "id": "message",
                                                    "name": "message",
                                                    "required": true
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "attributes": {
                                                    "type": "submit"
                                                },
                                                "text": "Send Message",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "Send Message"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "tagName": "footer",
                                "components": [
                                    {
                                        "classes": [
                                            "footer-content"
                                        ],
                                        "components": [
                                            {
                                                "classes": [
                                                    "social-media"
                                                ],
                                                "components": [
                                                    {
                                                        "type": "link",
                                                        "attributes": {
                                                            "href": "#"
                                                        },
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Facebook"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "link",
                                                        "attributes": {
                                                            "href": "#"
                                                        },
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Twitter"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "link",
                                                        "attributes": {
                                                            "href": "#"
                                                        },
                                                        "components": [
                                                            {
                                                                "type": "textnode",
                                                                "content": "Instagram"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "tagName": "p",
                                                "type": "text",
                                                "components": [
                                                    {
                                                        "type": "textnode",
                                                        "content": "© 2024 Creative Agency. All rights reserved."
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "id": "d4yi7cQgNeGyFVFN"
                }
            ],
            "id": "TPlc4A8M56OOdiIE"
        }
    ]
  }
  editor.loadProjectData(Agency);
}





// Function to save content to Firebase
function saveToFirebase() {
    const projectData = editor.getProjectData();
    console.log(projectData);

    const user = firebase.auth().currentUser;
    const Name = document.getElementById("name").value;
    

    if (!Name) {
        alert("Please enter a project name.");
        return;
    }

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

    // Save the content to Firebase Firestore



    if (user) {
        // Use the "Projects" subcollection under the current user's document
        db.collection("users").doc(user.uid).collection("Projects").add({
            // Save project content
            
            createdAt: new Date(),
            project: Name,
            //email: user.email,  // Store the current user's email
            projectData: projectData,
            isTrashed: false
        })
        .then((docRef) => {
            console.log("Project document written with ID: ", docRef.id);

            // Use html2canvas to capture the temp container
            html2canvas(tempContainer).then(function(canvas) {
                // Convert the canvas to a data URL (base64 encoded image)
                const screenshotDataUrl = canvas.toDataURL();

                // Save the screenshot in the same project document
                db.collection("users").doc(user.uid).collection("Projects").doc(docRef.id).update({
                    projectUid: docRef.id,
                    screenshot: screenshotDataUrl
                }).then(() => {
                    console.log("Screenshot added to project in Firestore");
                    
                    // Success alert logic here (optional UI feedback)
                    const katawan = document.body;

                    const alerta = document.createElement("div");
                    alerta.style.width = "500px";
                    alerta.style.height = "100px";
                    alerta.style.backgroundColor = "#10151D";
                    alerta.style.position = "absolute";
                    alerta.style.top = "50%";
                    alerta.style.left = "50%";
                    alerta.style.transform = "translate(-50%, -50%)";
                    alerta.style.zIndex = "2147483647";
                    alerta.style.opacity = "0";
                    alerta.style.transition = "opacity .5s ease";
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
                    alerta.appendChild(check);

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

    } else {
        console.error("No user is signed in. Cannot save the project.");
    }
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
