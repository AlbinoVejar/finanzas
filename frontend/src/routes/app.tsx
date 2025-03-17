import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout, LandingLayout } from '../layout';
import Dashboard from '../pages/dashboard';
import Accounts from '../pages/accounts';
import Login from '../static/login';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/app" element={<AppLayout />}>
        {/* <Route path='categorias' element={<CategoriesDashboard />} /> */}
        <Route index element={<Dashboard />} />
        <Route path="cuenta/:id" element={<Accounts />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
