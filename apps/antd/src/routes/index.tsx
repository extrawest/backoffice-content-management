import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthLayout, Loader, PageLayout, PrivateRoute, PublicRoute } from "@antlib";
import { privateRoutes } from "./privateRotes";
import { commonRoutes } from "./commonRotes";
import { LayoutEnum } from "@lib/shared/types";
import { Layout } from "antd";
import { loaderBox } from "./routes.sx";
import { useAuth } from "@lib/shared";

export const AppRoutes: FC = () => {
  const me = useAuth();
  const token = localStorage.getItem('token');

  return (
    <Suspense
      fallback={
        <Layout.Content
          style={loaderBox}
        >
          <Loader />
        </Layout.Content>
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
