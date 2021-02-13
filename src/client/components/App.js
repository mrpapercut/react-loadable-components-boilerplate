import {Component, createElement as E} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';
import loadable from '@loadable/component';

import {isLoading} from '~/actions/mainActions';

const NotFound404   = loadable(() => import(/* webpackChunkName: "MainWindow" */'~/components/NotFound404'));
const MainWindow    = loadable(() => import(/* webpackChunkName: "MainWindow" */'~/components/MainWindow'));

class App extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            isLoading: this.props.isLoading
        };
    }

    componentDidMount() {
        // Initialize loading
    }

    componentDidUpdate() {
        if (this.props.isLoading !== this.state.isLoading) {
            this.setState({
                isLoading: this.props.isLoading
            });
        }
    }

    render() {
        const nonAuthRoutes = [{
            path: '*',
            component: NotFound404
        }];

        const mappedNonAuthRoutes = nonAuthRoutes.map((r, key) => {
            return E(Route, {
                path: r.path,
                render: () => E(r.component),
                key
            });
        });

        return [
            E(Switch, {
                key: 'mainSwitch'
            },
                E(Route, {
                    key: 'mainWindow',
                    path: '/',
                    exact: true,
                    render: () => E(MainWindow)
                }),
                mappedNonAuthRoutes
            )
        ];
    }
};

const mapStateToProps = ({mainReducer}) => ({
    isLoading: mainReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
    setLoading: bool => dispatch(isLoading(bool))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
