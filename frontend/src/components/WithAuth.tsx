import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { LoadingScreen } from "./Loading";

/**
   Taken from https://dev.to/justincy/detecting-a-user-s-authenticated-state-client-side-in-next-js-using-an-httponly-cookie-and-static-optimization-6ib
 
 * Support client-side conditional redirecting based on the user's
 * authenticated state.*
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param expectedAuth Whether the user should be authenticated for
 * the component to be rendered.
 * @param screen The screen to redirect to.
 */
function withAuthRedirect({
  WrappedComponent,
  LoadingComponent = LoadingScreen,
  expectedAuth,
  screen,
}) {
  const WithAuthRedirectWrapper = (props: any) => {
    const { isLoading, isAuthenticated } = useAuth();
    useEffect(() => {
      if (
        !isLoading &&
        typeof window !== "undefined" &&
        expectedAuth !== isAuthenticated
      ) {
        props.navigation.navigate(screen);
      }
    });

    if (isLoading) {
      return <LoadingComponent />;
    }

    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirectWrapper;
}

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given screen.
 */
export function withAuth(WrappedComponent, screen = "Login") {
  return withAuthRedirect({
    WrappedComponent,
    screen,
    expectedAuth: true,
  });
}

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given screen.
 */
export function withoutAuth(WrappedComponent, screen = "HomeStack") {
  return withAuthRedirect({
    WrappedComponent,
    screen,
    expectedAuth: false,
  });
}
