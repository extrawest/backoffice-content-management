import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
	AuthLayout, Loader, PageLayout, PrivateRoute, PublicRoute
} from "@primelib";
import { privateRoutes } from "./privateRoutes";
import { commonRoutes } from "./commonRoutes";
import { LayoutEnum } from "@lib/shared/types";
import { useAuth } from "@lib/shared";

export const AppRoutes: FC = () => {
	const me = useAuth();
	const token = localStorage.getItem("token");

	return (
    <Suspense
      fallback={
        <div className="flex justify-content-center align-items-center h-screen">
          <Loader />
        </div>
      }
    >
      <Routes>
        {[...privateRoutes, ...commonRoutes].map((
route, index
) => (
          <Route
            {...route}
            key={`r_${index}_${route.path}`}
            element={
              route.isAuth ? (
                <PrivateRoute isAuthed={!!token || !!me.user}>
                  {route.layout === LayoutEnum.AUTH && (
                    <AuthLayout>
                      {route.element}
                    </AuthLayout>
                  )}
                  {route.layout === LayoutEnum.DEFAULT && (
                    <PageLayout>
                      {route.element}
                    </PageLayout>
                  )}
                </PrivateRoute>
              ) : (
                <PublicRoute isAuthed={!!token || !!me.user}>
                  {route.layout === LayoutEnum.AUTH && (
                    <AuthLayout>
                      {route.element}
                    </AuthLayout>
                  )}
                  {route.layout === LayoutEnum.DEFAULT && (
                    <PageLayout>
                      {route.element}
                    </PageLayout>
                  )}
                </PublicRoute>
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
	);
};
