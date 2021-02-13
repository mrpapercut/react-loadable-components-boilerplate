import {Component} from 'react';
import {connect} from 'react-redux';

import createElement from '~/util/createElement';

const [div, h2] = ['div', 'h2'].map(createElement);

class MainWindow extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState() {
        return {

        };
    }

    render() {
        return div({},
            h2({}, 'MainWindow')
        );
    }
}

const mapStateToProps = ({mainReducer}) => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
