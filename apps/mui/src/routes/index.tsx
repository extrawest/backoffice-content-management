import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { privateRoutes } from "./privateRotes";
import { commonRoutes } from "./commonRotes";
import { AuthLayout, Loader, PageLayout, PrivateRoute, PublicRoute } from "@lib/muiapp";
import { LayoutEnum } from "@lib/shared/types";

export const AppRoutes: FC = () => {
  const isAuthed = true

  return (
    <Suspense
      fallback={
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Loader />
        </Box>
      }
    >
      <CssBaseline />
      <Routes>
        {[...privateRoutes, ...commonRoutes].map((route, index) => (
          <Route
            {...route}
            key={`r_${index}_${route.path}`}
            element={
              route.isAuth ? (
                <PrivateRoute isAuthed={isAuthed}>{route.layout}
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
                <PublicRoute isAuthed={isAuthed}>
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
