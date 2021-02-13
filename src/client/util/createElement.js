import {createElement as E} from 'react';

const getRandomKey = () => parseInt(Math.random() * 0xffffffff, 10).toString(16);

const createElement = element => {
    return (props = {}, ...children) =>
        E(element, Object.assign({}, {
            key: getRandomKey()
        }, props), children.length > 0 ? children : null);
};

export default createElement;
