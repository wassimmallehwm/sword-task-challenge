import { Suspense, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@layout/Layout';

import { AppContext, AuthContext } from './contexts';
import appRoutes from './routes';
import { GuestRoute, ProtectedRoute } from '@shared/guards';
import { Spinner } from '@shared/components';

// import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
// import "primereact/resources/primereact.min.css";                  //core css
// import "primeicons/primeicons.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Toaster } from 'react-hot-toast';
import { withTranslation } from 'react-i18next';
import "./i18n/i18n";
import { GUEST, PROTECTED } from '@config/const';


function App() {
  const { user } = useContext(AuthContext)

  return (

    <BrowserRouter>
      <Toaster />
      <AppContext>
        <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" />} />
              {appRoutes.map((route, i) => {
                if (route.status == PROTECTED) {
                  return (
                    <Route key={i} path={route.path} element={
                      <Suspense fallback={(<Spinner />)}>
                        <ProtectedRoute roles={route.roles}>
                          <route.component />
                        </ProtectedRoute>
                      </Suspense>
                    } />
                  )
                } else if (route.status == GUEST) {
                  return (
                    <Route key={i} path={route.path} element={
                      <Suspense fallback={(<Spinner />)}>
                        <GuestRoute>
                          <route.component />
                        </GuestRoute>
                      </Suspense>
                    } />
                  )
                } else {
                  return (
                    <Route key={i} path={route.path} element={
                      <Suspense fallback={(<Spinner />)}>
                        <route.component />
                      </Suspense>
                    } />
                  )
                }
              })}
              <Route path="*" element={<Navigate to="/tasks" />} />
            </Routes>
        </Layout>
      </AppContext>
    </BrowserRouter>
  );
}

export default withTranslation()(App);
