import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

export default function swCustom(params) {
  // Debug mode logger for production verification on GitHub Pages
  if (params.debug) {
    console.log("[Algo-PWA][SW]: running swCustom code on GitHub Pages", params);
  }

  // 1. Cache external profile pictures and icons used on your site
  registerRoute(
    (context) => {
      return [
        /graph\.facebook\.com\/.*\/picture/,
        /netlify\.com\/img/,
        /avatars[0-9]?\.githubusercontent\.com/, // Dynamic GitHub contributor avatars
      ].some((regex) => context.url.href.match(regex));
    }, 
    new StaleWhileRevalidate({
      cacheName: 'algo-external-assets'
    })
  );

  // 2. Explicitly handle subpath routing requests for SPA navigations
  registerRoute(
    ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/algo/'),
    new StaleWhileRevalidate({
      cacheName: 'algo-local-routes'
    })
  );
}
