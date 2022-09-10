import React from 'react';
import { Filters, Preview } from './components';

import './index.scss';

const Main = ({ canvasRef }) => {
    return (
        <main className="app-main">
            <Filters />
            <Preview
                canvasRef={canvasRef}
            />
        </main>
    );
};

export default Main;
