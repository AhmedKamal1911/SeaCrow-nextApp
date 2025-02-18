"use client";
import { useState } from "react";
import LoginFormWrapper from "./login-form-wrapper";
import AdminTable from "./admin-table";
import { getTripOrders } from "@/lib/queries/getTripOrders";
import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/common/loading";
import ErrorViewer from "@/components/common/error-viewer";

export default function LoginFormContainer() {
  const [token, setToken] = useState<string>("");

  const {
    data: ordersResponse,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getTripOrders(token),
    queryKey: ["orders", token],
    enabled: Boolean(token), // Only run query when the user is set
    refetchOnWindowFocus: false,
  });
  return error ? (
    <ErrorViewer errorText={error.message} />
  ) : !token ? (
    <LoginFormWrapper onSubmit={setToken} />
  ) : isFetching ? (
    <Loading />
  ) : (
    ordersResponse && <AdminTable data={ordersResponse} />
  );
}
