"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateAuthFromStorage } from "./app-redux/features/AppData/authSlice";

export default function AuthHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateAuthFromStorage());
  }, [dispatch]);

  return null;
}