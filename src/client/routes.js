import App          from '~/components/App';
import MainWindow   from '~/components/MainWindow';
import NotFound404  from '~/components/NotFound404';

const routes = [{
    component: App,
    routes: [{
        path: '/',
        exact: true,
        component: MainWindow
    }, {
        path: '*',
        component: NotFound404
    }]
}];

export default routes;
