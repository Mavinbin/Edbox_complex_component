import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/mavinbin/Sites/Edbox_complex_component/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/text",
        "exact": true,
        "component": require('../text/index.js').default,
        "_title": "Edbox_complex_component",
        "_title_default": "Edbox_complex_component"
      },
      {
        "component": () => React.createElement(require('/Users/mavinbin/Sites/Edbox_complex_component/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "Edbox_complex_component",
        "_title_default": "Edbox_complex_component"
      }
    ],
    "_title": "Edbox_complex_component",
    "_title_default": "Edbox_complex_component"
  },
  {
    "component": () => React.createElement(require('/Users/mavinbin/Sites/Edbox_complex_component/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "Edbox_complex_component",
    "_title_default": "Edbox_complex_component"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
