import {createElement as E} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import DOM from 'react-dom';
import {loadableReady} from '@loadable/component';

import createStore from '~/reducers/createStore';

import routes from '~/routes';

// Load CSS
require('../scss/main.scss');

const store = createStore();

loadableReady(() => {
    DOM.hydrate(E(Provider, {
        store
    },
        E(BrowserRouter, {}, renderRoutes(routes))
    ), document.getElementById('appwrapper'));
});
