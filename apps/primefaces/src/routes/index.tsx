import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
	AuthLayout, PageLayout, PrivateRoute, PublicRoute 
} from "@primelib";
import { privateRoutes } from "./privateRoutes";
import { commonRoutes } from "./commonRoutes";

export const AppRoutes: FC = () => {
	return (
    <Suspense>
      <Routes>
        {[...privateRoutes, ...commonRoutes].map((
route, index
) => (
          <Route
            {...route}
            key={`r_${index}_${route.path}`}
            element={
              route.isAuth ? (
                <PrivateRoute>
                  <PageLayout>
                    {route.element}
                  </PageLayout>
                </PrivateRoute>
              ) : (
                <PublicRoute>
                  <AuthLayout>
                    {route.element}
                  </AuthLayout>
                </PublicRoute>
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
	);
};
