import React from 'react';
import { Filters, Preview } from './components';

import './index.scss';

const Main = ({ file }) => {

    return (
        <main className="app-main">
            <Filters />
            <Preview
                file={file}
            />
        </main>
    );
};

export default Main;
