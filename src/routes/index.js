import Logger from 'js-logger';
import React from 'react';
// import {
//   createRoutesFromChildren,
//   Navigate,
//   resolvePath,
//   Route,
//   UNSAFE_NavigationContext,
//   UNSAFE_RouteContext,
//   useLocation,
//   useOutlet,
//   useRoutes,
// } from 'react-router-dom';
// import { parsePath } from 'history';

import PageOne from '../pages/page-one';
import PageOneOne from '../pages/page-one-one';
import PageOneThree from '../pages/page-one-three';
import PageOneTwo from '../pages/page-one-two';
import PageOneZero from '../pages/page-one-zero';
import PageThree from '../pages/page-three';
import PageTwo from '../pages/page-two';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

const AppRoutes = () => {
  const location = useLocation();

  Logger.info('AppRoutes location::', location);

  if (location.key === 'default') {
    return (
      <Routes location={location}>
        <Route path="*" element={<Navigate to="/page1" />} />
        <Route path="/page1" element={<PageOne />}>
          <Route path="/page1/zero" element={<PageOneZero />} />
          <Route path="/page1/one" element={<PageOneOne />} />
          <Route path="/page1/two" element={<PageOneTwo />} />
          <Route path="/page1/three" element={<PageOneThree />} />
        </Route>
        <Route path="/page2" element={<PageTwo />} />
        <Route path="/page3" element={<PageThree />} />
      </Routes>
    );
  }
  return (
    <TransitionGroup>
      <CSSTransition timeout={250} classNames="fade" key={location.key}>
        <Routes location={location}>
          <Route path="*" element={<Navigate to="/page1" />} />
          <Route path="/page1" element={<PageOne />}>
            <Route path="/page1/zero" element={<PageOneZero />} />
            <Route path="/page1/one" element={<PageOneOne />} />
            <Route path="/page1/two" element={<PageOneTwo />} />
            <Route path="/page1/three" element={<PageOneThree />} />
          </Route>
          <Route path="/page2" element={<PageTwo />} />
          <Route path="/page3" element={<PageThree />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

// export function Outlet(props) {
//   const retVal = useOutlet(props.context);

//   Logger.info('Outlet::', retVal);
//   return retVal;
// }

// export function Routes({ children, location }) {
//   Logger.info('Routes::', location);

//   return useRoutes(createRoutesFromChildren(children), location);
// }

// export function useNavigate() {
//   invariant(
//     useInRouterContext(),
//     // TODO: This error is probably because they somehow have 2 versions of the
//     // router loaded. We can help them understand how to avoid that.
//     `useNavigate() may be used only in the context of a <Router> component.`
//   );

//   let { basename, navigator } = React.useContext(UNSAFE_NavigationContext);
//   let { matches } = React.useContext(UNSAFE_RouteContext);
//   let { pathname: locationPathname } = useLocation();

//   let routePathnamesJson = JSON.stringify(
//     matches.map((match) => match.pathnameBase)
//   );

//   let activeRef = React.useRef(false);
//   React.useEffect(() => {
//     activeRef.current = true;
//   });

//   let navigate = React.useCallback(
//     (to, options = {}) => {
//       // warning(
//       //   activeRef.current,
//       //   `You should call navigate() in a React.useEffect(), not when ` +
//       //     `your component is first rendered.`
//       // );

//       if (!activeRef.current) return;

//       if (typeof to === 'number') {
//         navigator.go(to);
//         return;
//       }

//       let path = resolveTo(
//         to,
//         JSON.parse(routePathnamesJson),
//         locationPathname
//       );

//       Logger.info('useNavigate::', path, navigator);

//       if (basename !== '/') {
//         path.pathname = joinPaths([basename, path.pathname]);
//       }

//       (!!options.replace ? navigator.replace : navigator.push)(
//         path,
//         options.state
//       );
//     },
//     [basename, navigator, routePathnamesJson, locationPathname]
//   );

//   return navigate;
// }

// function resolveTo(toArg, routePathnames, locationPathname) {
//   let to = typeof toArg === 'string' ? parsePath(toArg) : toArg;
//   let toPathname = toArg === '' || to.pathname === '' ? '/' : to.pathname;

//   // If a pathname is explicitly provided in `to`, it should be relative to the
//   // route context. This is explained in `Note on `<Link to>` values` in our
//   // migration guide from v5 as a means of disambiguation between `to` values
//   // that begin with `/` and those that do not. However, this is problematic for
//   // `to` values that do not provide a pathname. `to` can simply be a search or
//   // hash string, in which case we should assume that the navigation is relative
//   // to the current location's pathname and *not* the route pathname.
//   let from;
//   if (toPathname == null) {
//     from = locationPathname;
//   } else {
//     let routePathnameIndex = routePathnames.length - 1;

//     if (toPathname.startsWith('..')) {
//       let toSegments = toPathname.split('/');

//       // Each leading .. segment means "go up one route" instead of "go up one
//       // URL segment".  This is a key difference from how <a href> works and a
//       // major reason we call this a "to" value instead of a "href".
//       while (toSegments[0] === '..') {
//         toSegments.shift();
//         routePathnameIndex -= 1;
//       }

//       to.pathname = toSegments.join('/');
//     }

//     // If there are more ".." segments than parent routes, resolve relative to
//     // the root / URL.
//     from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : '/';
//   }

//   let path = resolvePath(to, from);

//   // Ensure the pathname has a trailing slash if the original to value had one.
//   if (
//     toPathname &&
//     toPathname !== '/' &&
//     toPathname.endsWith('/') &&
//     !path.pathname.endsWith('/')
//   ) {
//     path.pathname += '/';
//   }

//   return path;
// }

// const joinPaths = (paths) => paths.join('/').replace(/\/\/+/g, '/');

// export function useOutlet(context) {
//   let outlet = React.useContext(RouteContext).outlet;
//   if (outlet) {
//     return (
//       <OutletContext.Provider value={context}>{outlet}</OutletContext.Provider>
//     );
//   }
//   return outlet;
// }

export default AppRoutes;
