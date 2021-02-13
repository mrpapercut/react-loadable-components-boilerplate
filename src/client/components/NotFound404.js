import {Component} from 'react';

import createElement from '~/util/createElement';

const [div, h2] = ['div', 'h2'].map(createElement);

class NotFound404 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return div({
            className: 'notfound404'
        },
            h2({
                key: 'pagetitle',
                className: 'pagetitle'
            }, '404 - Page not found')
        );
    }
}

export default NotFound404;
