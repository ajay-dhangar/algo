import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

export default function swCustom(params) {
  if (params.debug) {
    console.log("[Algo-PWA][SW]: running swCustom code on GitHub Pages", params);
  }

  // Cache responses from external resources
  registerRoute(
    (context) =>
      [
        /graph\.facebook\.com\/.*\/picture/,
        /netlify\.com\/img/,
        /avatars[0-9]?\.githubusercontent\.com/,
      ].some((regex) => context.url.href.match(regex)),
    new StaleWhileRevalidate(),
  );
}