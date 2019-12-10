const myRequest = new Request('./api.json');

fetch(myRequest)
  .then(response => response.json())
  .then(value => {
    const importMap = {
      imports: {
        "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@4.3.7/lib/system/single-spa.min.js",
        "eev": 'https://cdn.jsdelivr.net/npm/eev@0.1.5/eev.min.js'
      }
    };

    let spaJs = `
    import myHandler from './helper.js';

    System.import('single-spa').then(function (singleSpa) {
    System.import('eev').then(function (eev) {
      var e = new eev();
    `;

    value.endpoints.forEach(element => {
      importMap.imports[`${element.name}`] = element.endpoint;

      if (element.name !== 'parcel') {
        spaJs += `singleSpa.registerApplication(
          '${element.name}',
          () => System.import('${element.name}'),
          location => ${element.alwaysPresent ? true : 'location.pathname.startsWith("/' + element.name + '")'},
          {eev: e ${element.name === 'menu' ? ', endpoints:' + JSON.stringify(value.endpoints) : ''},
          parcel: () => System.import('parcel')}
        );
        `;
      } else {
        // spaJs += `singleSpa.registerApplication(
        //   '${element.name}',
        //   () => System.import('${element.name}'),
        //   location => ${element.alwaysPresent ? true : 'location.pathname.startsWith("/' + element.name + '")'},
        //   {eev: e ${element.name === 'menu' ? ', endpoints:' + JSON.stringify(value.endpoints) : ''}}
        // );
        // `;
      }

    });

    const im = document.createElement('script');
    im.type = 'systemjs-importmap';
    im.name = 'imports'
    im.textContent = JSON.stringify(importMap);
    const target = document.body.appendChild(im);

    spaJs += `

      e.on('menuIsExpanded', myHandler)

      singleSpa.start();
      })
    })
    `;
    const spa = document.createElement('script');
    spa.type = 'module';
    spa.textContent = spaJs;
    target.after(spa);
  })


