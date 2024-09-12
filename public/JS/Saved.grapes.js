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

const taong = localStorage.getItem("pangSave");

const named = sessionStorage.getItem("name");
const laman = sessionStorage.getItem("laman");
const muka = sessionStorage.getItem("css");
console.log(taong);

const db = firebase.firestore();
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

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
        key: named, // Replace with your dynamic ID if needed
      },
    }
  },
  // Avoid any default panel
  layerManager: {
    appendTo: '.layers-container'
  },
  panels: { defaults: [{
    id: 'layers',
    el: '.panel__right',
    // Make the panel resizable
      resizable: {
        maxDim: 350,
        minDim: 200,
        tc: 0, // Top handler
        cl: 1, // Left handler
        cr: 0, // Right handler
        bc: 0, // Bottom handler
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
          label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ffffff;transform: ;msFilter:;"><path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h7v2H8v2h8v-2h-3v-2h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 14V5h16l.002 9H4z"></path></svg>',
          command: 'set-device-desktop',
          active: true,
          togglable: false,
        }, {
          id: 'device-mobile',
          label: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ffffff;transform: ;msFilter:;"><path d="M17 2H7c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM7 16.999V5h10l.002 11.999H7z"></path></svg>',
          command: 'set-device-mobile',
          togglable: false,
      }],
    },
    {
      id: 'panel-switcher',
      el: '.panel__switcher',
      buttons: [{
          id: 'show-layers',
          active: true,
          label: 'Layers',
          command: 'show-layers',
          // Once activated disable the possibility to turn it off
          togglable: false,
        }, {
          id: 'show-style',
          active: true,
          label: 'Styles',
          command: 'show-styles',
          togglable: false,
        },{
          id: 'show-traits',
          active: true,
          label: 'Traits',
          command: 'show-traits',
          togglable: false,
        },{
          id: 'show-blocks',
          active: true,
          label: 'Blocks',
          command: 'show-blocks',
          togglable: false,
        }],
    },
  ] 
  },
  blockManager: {
    appendTo: '.blocks-container',
    
    blocks: []
  },
  traitManager: {
    appendTo: '.traits-container',
  },
  // The Selector Manager allows to assign classes and
  // different states (eg. :hover) on components.
  // Generally, it's used in conjunction with Style Manager
  // but it's not mandatory
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
    'grapesjs-plugin-export',
    'grapesjs-tabs',
    'grapesjs-custom-code',
    'grapesjs-touch',
    'grapesjs-parser-postcss',
    'grapesjs-tooltip',
    'grapesjs-tui-image-editor',
    'grapesjs-typed',
    'grapesjs-style-bg',
    'grapesjs-preset-webpage',
  ],
  pluginsOpts: {
    'gjs-blocks-basic': { flexGrid: true },
    'grapesjs-tui-image-editor': {
      script: [
        //'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
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
      label: '<u>B</u>',
      command: 'sw-visibility', // Built-in command
      attributes: {
        title: 'Toggle Borders', // Tooltip text
      },
    }, {
      id: 'export',
      className: 'btn-open-export',
      label: '{...}',
      command: 'export-template',
      context: 'export-template', // For grouping context of buttons from the same panel
      attributes: {
        title: 'View Code',
      }
    }, {
      id: 'show-json',
      className: 'btn-show-json',
      label: 'JSON',
      context: 'show-json',
      command(editor) {
        editor.Modal.setTitle('Components JSON')
          .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
          .open();
      },
      attributes: {
        title: 'View JSON'
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

editor.Commands.add('set-device-desktop', {
  run: editor => editor.setDevice('Desktop')
});
editor.Commands.add('set-device-mobile', {
  run: editor => editor.setDevice('Mobile')
});


document.querySelector(".project").innerHTML = "Project name: " + named;


const styleElement = document.createElement("style");
styleElement.textContent = muka;
document.head.appendChild(styleElement);

document.getElementById('title').innerText = named;

console.log(named);
console.log(laman);
console.log(muka);
 
/* const lamanLaman = `<style>${muka}</style>`;

editor.addComponents(laman);
editor.addComponents(lamanLaman); */
const pD = JSON.parse(sessionStorage.getItem("projectData"));
editor.loadProjectData(pD);

// Check if both user and project name exist
/* if (taong && named) {
  // Query Firestore for the document where user and project match
  db.collection("htmlFiles")
    .where("user", "==", taong)
    .where("project", "==", named)
    .get()
    .then((querySnapshot) => {
      // Check if a document is found
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          // Log the projectData field from the document
          console.log("Project Data:", doc.data().projectData);
          editor.loadProjectData(doc.data().projectData);
        });
      } else {
        console.log("No matching documents found for this user and project.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving document: ", error);
    });
} else {
  console.log("User or project name is missing.");
} */

function saveToFirebase() {
    // Get the project name from the input field
    const projectName = named;
    const pD = editor.getProjectData();

    // Ensure the project name is not empty
    if (!projectName) {
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

    // Find the document based on the project name
    db.collection("htmlFiles").where("project", "==", projectName).get()
    .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            // If document exists, update it
            querySnapshot.forEach((doc) => {
                db.collection("htmlFiles").doc(doc.id).update({
                    content: htmlContent,
                    css: cssContent,
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
                        db.collection("htmlFiles").doc(doc.id).update({
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
            db.collection("htmlFiles").add({
                content: htmlContent,
                css: cssContent,
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
                    db.collection("htmlFiles").doc(docRef.id).update({
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

const codeEditor = document.querySelector(".gjs-mdl-dialog");

const copy = document.createElement("div");
copy.style.width = "100%";
copy.style.height = "50px";
copy.style.bottom = "-30px";
copy.style.position = "absolute";
copy.style.backgroundColor = "#444444";
codeEditor.appendChild(copy);

const copyHTML = document.createElement("button");
copyHTML.style.backgroundColor = "#777272";
copyHTML.style.position = "absolute";
copyHTML.style.left = "14px";
copyHTML.style.bottom = "-20px";
copyHTML.style.padding = "5px 10px";
copyHTML.style.color = "#ffffff";
copyHTML.textContent = "Copy HTML";
codeEditor.appendChild(copyHTML);


const copyCSS = document.createElement("button");
copyCSS.style.backgroundColor = "#777272";
copyCSS.style.position = "absolute";
copyCSS.style.right = "14px";
copyCSS.style.bottom = "-20px";
copyCSS.style.padding = "5px 10px";
copyCSS.style.color = "#ffffff";
copyCSS.textContent = "Copy CSS";
codeEditor.appendChild(copyCSS);

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

// Event listener to copy formatted HTML content
copyHTML.addEventListener("click", () => {
  const htmlContent = editor.getHtml(); // Get HTML content from GrapesJS editor
  const formattedHtml = formatHtml(htmlContent); // Format the HTML content
  copyToClipboard(formattedHtml); // Copy to clipboard

  const htmlMirror = document.getElementById("gjs-cm-htmlmixed")

  const alertHtmlCopy = document.createElement("div");
  alertHtmlCopy.style.width = "46%";
  alertHtmlCopy.style.height = "100px";
  alertHtmlCopy.style.display = "flex";
  alertHtmlCopy.style.justifyContent = "center";
  alertHtmlCopy.style.alignItems = "center";
  alertHtmlCopy.style.backgroundColor = "#9ECE89";
  alertHtmlCopy.style.position = "absolute";
  alertHtmlCopy.style.top = "45%";
  alertHtmlCopy.style.left = "19px";
  alertHtmlCopy.style.color = "#2E6A17";
  alertHtmlCopy.style.fontSize = "24px";
  alertHtmlCopy.style.fontWeight = "700";
  alertHtmlCopy.textContent = "HTML Code copied to clipboard!";
  htmlMirror.appendChild(alertHtmlCopy);

  console.log("HTML copy");

  // Remove the alert after 2 seconds
  setTimeout(() => {
    if (htmlMirror.contains(alertHtmlCopy)) {
      htmlMirror.removeChild(alertHtmlCopy);
    }
  }, 5000);
});

// Event listener to copy formatted CSS content
copyCSS.addEventListener("click", () => {
  const cssContent = editor.getCss(); // Get CSS content from GrapesJS editor
  const formattedCss = formatCss(cssContent); // Format the CSS content
  copyToClipboard(formattedCss); // Copy to clipboard

  const cssMirror = document.getElementById("gjs-cm-css")

  const alertCssCopy = document.createElement("div");
  alertCssCopy.style.width = "46%";
  alertCssCopy.style.height = "100px";
  alertCssCopy.style.display = "flex";
  alertCssCopy.style.justifyContent = "center";
  alertCssCopy.style.alignItems = "center";
  alertCssCopy.style.backgroundColor = "#9ECE89";
  alertCssCopy.style.position = "absolute";
  alertCssCopy.style.top = "45%";
  alertCssCopy.style.right = "19px";
  alertCssCopy.style.color = "#2E6A17";
  alertCssCopy.style.fontSize = "24px";
  alertCssCopy.style.fontWeight = "700";
  alertCssCopy.textContent = "CSS Code copied to clipboard!";
  cssMirror.appendChild(alertCssCopy);

  console.log("CSS copy");

  // Remove the alert after 2 seconds
  setTimeout(() => {
    if (cssMirror.contains(alertCssCopy)) {
      cssMirror.removeChild(alertCssCopy);
    }
  }, 5000);
});
