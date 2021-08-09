import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainRoutes from 'src/routes/MainRoutes';
import AuthRoutes from 'src/routes/AuthRoutes';

function App() {
    return (
        <Router>
            <AuthRoutes />
            <MainRoutes />
        </Router>
    );
}

export default App;
