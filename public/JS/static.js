
const domc = editor.DomComponents;

editor.BlockManager.add('cell',{
    category: 'Customize blocks',
    label: 'Column/s',
    media: `
    <svg width="50" height="50">
      <rect width="50" height="20" y="0"style="fill:#444;stroke-width:1;stroke:white" />
      <rect width="50" height="20" y="25"style="fill:#444;stroke-width:1;stroke:white" />
    </svg>
    `,
    content: `
      <table style="width: 100%; height: 100px; padding: 10px; "> 
        <tr style="display: flex;">
        </tr>
      </table>
    `,
  }); 

  editor.BlockManager.add('div',{
    category: 'Basic',
    media:"<svg viewBox=\"0 0 23 24\">\n        <path fill=\"currentColor\" d=\"M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z\"/>\n      </svg>",
    label: 'div',
    content: `
      <div style="width: 100%; min-height: 100px; padding: 10px; display: flex;"> 
        
        <div style="min-height: 76px; flex-grow: 1; flex-basis: 100%; "><p>Insert text Here</p></div>
        
      </div>
    `,
    
  }); 

    editor.BlockManager.add('practice', {
    // ...
    
    label: 'pratice',
    category: 'Customize blocks',
    content: {
      tagName: 'div',
      draggable: true,
      attributes: { 'some-attribute': 'some-value' },
      components: [
        {
          tagName: 'span',
          content: '<b>Some static content</b>',
        }, {
          tagName: 'div',
          // use `content` for static strings, `components` string will be parsed
          // and transformed in Components
          components: `
          <span>HTML at some point</span>
          `,
        }, {
          tagName: 'span',
          // use `content` for static strings, `components` string will be parsed
          // and transformed in Components
          components: `
            <table>
                <td><span>Practice</span>
          `,
        }
      ]
    }
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