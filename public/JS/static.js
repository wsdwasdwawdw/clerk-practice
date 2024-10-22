
const domc = editor.DomComponents;

editor.BlockManager.add('cell',{
  label: 'Link Block',
  category: "Basic",
  media: `<svg viewBox="-18 0 60 25">
      <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"></path>
    </svg>`,
    content: {
      type: 'link',
      editable: false,
      droppable: true,
      style: {
        display: 'inline-block',
        padding: '5px',
        'min-height': '50px',
        'min-width': '50px'
      }
    },
  }); 

  editor.BlockManager.add('Quote',{
    label: 'Quote',
    category: "Basic",
    media: `<svg viewBox="-18 0 60 25">
        <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
    </svg>`,
    content: `<blockquote class="quote">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
      </blockquote>`
    
  }); 

    editor.BlockManager.add('Section', {
    label: 'Section',
    category: 'Basic',
    media: `<svg viewBox="-18 0 60 25">
        <path fill="currentColor" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z" />
    </svg>`,
    content: `<section class="bdg-sect">
      <h1 class="heading">Insert title here</h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </section>`
  });

  editor.BlockManager.add('section',{
    category: 'Customize blocks',
    label: '<b>Section</b>', // You can use HTML/SVG inside labels
    attributes: { class:'gjs-block-section' },
    content: `<section class="gjs-block-section-sect">
      <h1>This is a simple title</h1>
      <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
    </section>`,
  }); 

  editor.BlockManager.add('text',{
    category: 'blocks',
    label: 'Text',
    content: '<div data-gjs-type="text">Insert your text here</div>',
  }); 

  editor.BlockManager.add('image',{
    category: 'Customize blocks',
    label: 'Image',
    // Select the component once it's dropped
    select: true,
    // You can pass components as a JSON instead of a simple HTML string,
    // in this case we also use a defined component type `image`
    content: { type: 'image' },
    // This triggers `active` event on dropped components and the `image`
    // reacts by opening the AssetManager
    activate: true,
  }); 



  editor.BlockManager.add('heading',{
    category: 'Customize blocks',
    label: 'Heading',
    content: {
      tagName: 'Heading', 
      components: `<h1>Insert your heading here</h1>`
    
  }}
  ); 


  
    
    
  domc.addType('component-css', {
    model: {
      defaults: {
        tagName: 'helo',
        attributes: { class: 'cmp-css' },
        components: `
          <span>Component with styles<span>
          <div class="cmp-css-a">Component A</div>
          <div class="cmp-css-b">Component B</div>
        `,
        styles: `
          .cmp-css { color: red }
          .cmp-css-a { color: green }
          .cmp-css-b { color: blue }
  
          @media (max-width: 992px) {
            .cmp-css{ color: darkred; }
            .cmp-css-a { color: darkgreen }
            .cmp-css-b { color: darkblue }
          }
        `,
      },
    },
  });