import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes } from "./privateRotes";
import { commonRoutes } from "./commonRotes";
import { LayoutEnum } from "@lib/shared/types";
import { useAuth } from "libs/shared/context/Auth";
import { AuthLayout, Loader, PageLayout, PrivateRoute, PublicRoute } from "@libs/semantic";

export const AppRoutes: FC = () => {
  const me = useAuth();
  const token = localStorage.getItem('token');

  return (
    <Suspense
      fallback={
          <Loader />
      }
    >
      <Routes>
        {[...privateRoutes, ...commonRoutes].map((route, index) => (
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
