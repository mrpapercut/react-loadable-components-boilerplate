import express from 'express';
import path from 'path';

import {createElement as E} from 'react';
import {renderToString}     from 'react-dom/server';
import {Provider}           from 'react-redux';
import {StaticRouter}       from 'react-router-dom';
import {renderRoutes}       from 'react-router-config';
import {ChunkExtractor}     from '@loadable/server';

import htmlTemplate from './htmlTemplate';

import routes from '../client/routes';
import createStore from '../client/reducers/createStore';

const port = 7000;
const server = express();
const router = express.Router();

const store = createStore();
const preloadedState = `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`;

// Static paths
server.use('/dist', express.static('dist'));
server.use('/public', express.static('public'));

// Disable default headers
server.set('etag', false);
server.set('x-powered-by', false);

// Add default headers
server.use((req, res, next) => {
    // CORS header
    res.append('Access-Control-Allow-Origin', ['*']);

    // Blocks incorrect MIME-types
    res.append('X-Content-Type-Options', 'nosniff');

    next();
});

// Specific requests

// All other requests
router.get('*', (req, res) => {
    const htmlBody = renderToString(
        E(Provider, {
            store
        },
            E(StaticRouter, {
                location: req.url,
                context: {}
            },
                renderRoutes(routes)
            )
        )
    );

    // Page defaults
    const favicon = '/favicon.ico';
    const pageTitle = 'My great app';
    const mainColor = '#333';

    // Loadable Components setup
    const chunkStatsFile = path.resolve(__dirname, '../../dist/loadable-stats.json');
    const extractor = new ChunkExtractor({statsFile: chunkStatsFile});

    res.send(htmlTemplate({
        body: htmlBody,
        scriptTags: extractor.getScriptTags(),
        styleTags: extractor.getStyleTags(),
        favicon,
        pageTitle,
        mainColor,
        preloadedState
    }));
});

server.use(router);

server.listen(port, () => console.log(`Server listening on port ${port}`));
