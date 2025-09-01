import PrivateRoute from '@/components/PrivateRoute';
import PublicRoute from '@/components/PublicRoute';
import DashboardLayout from '@/pages/Admin/DashboardLayout';
import Home from '@/pages/Admin/Home';
import Layout from '@/pages/Frontend/Layout';
import UpdatePassword from '@/pages/Frontend/UpdatePassword';
import NotFound from '@/pages/NotFound';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Layout from '@/pages/Frontend/Layout';
// import DashboardLayout from '@/pages/Admin/DashboardLayout';
// import NotFound from '@/pages/NotFound';
// import Home from '@/pages/Admin/Home';
// import Vouchers from '@/pages/Admin/Vouchers';
// import Transactions from '@/pages/Admin/Transactions';
// import Payout from '@/pages/Admin/Payout';
// import Stores from '@/pages/Admin/Stores';
// import Subscription from '@/pages/Admin/Subscription';

// import Developers from '@/pages/Admin/Developers';
// import Apps from '@/pages/Admin/Integration';
// import Customization from '@/pages/Admin/Customization';
// import { getProfile } from '@/api/auth';
// import PublicRoute from '@/components/PublicRoute';
// import PrivateRoute from '@/components/PrivateRoute';
// import UpdatePassword from '@/pages/Frontend/UpdatePassword';
// import PublicRoute from '@/components/PublicRoute';
// import PrivateRoute from '@/components/PrivateRoute';
// import DashboardLayout from '@/pages/Admin/DashboardLayout';
// import Layout from '@/pages/Frontend/Layout';
// import Home from '@/pages/Admin/Home';
// import NotFound from '@/pages/NotFound';
// import NotFound from '@/pages/Frontend/NotFound';
// import DashboardLayout from '@/pages/Frontend/Admin/DashboardLayout';
// import UpdatePassword from '@/pages/Frontend/UpdatePassword';
// import BillingSuccess from '@/pages/Admin/Billing/Success';
// import BillingFailure from '@/pages/Admin/Billing/Failure';
// import Billing from '@/pages/Admin/Billing';
// import UpdatePassword from '@/pages/Frontend/UpdatePassword';

interface ProtectedRouteProps {
   children: React.ReactNode;
}

const RoutesIndex: React.FC = () => {
   // Use useLocation hook to get the current route
   const location = useLocation();
   const currentRoute = location.pathname; // Get current path
   return (
      <Routes>
         {/* <Route path="/" element={<Layout />} /> */}

         <Route element={<PublicRoute />}>
            <Route path="/" element={<Layout />} />
            <Route
               path="/update-password"
               element={<UpdatePassword handleForm={() => {}} />}
            />
         </Route>

         <Route element={<PrivateRoute />}>
            <Route
               path="/admin"
               element={
                  <DashboardLayout active={currentRoute} children={<Home />} />
               }
            />
         </Route>

         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};

export default RoutesIndex;
