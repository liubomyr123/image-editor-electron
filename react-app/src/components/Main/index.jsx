import React from 'react';
import { Filters, Preview } from './components';

import './index.scss';

const Main = () => {
    return (
        <main className="app-main">
            <Filters />
            <Preview />
        </main>
    );
};

export default Main;
