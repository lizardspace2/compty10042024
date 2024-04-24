// src/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {supabase} from './supabaseClient';

const PrivateRoute = ({ children }) => {
  const session = supabase.auth.session();

  return session ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
