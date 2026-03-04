// utils/navigation.js
export function getRedirectUrl(target) {
  const { hostname, port, protocol } = window.location;

  const isLocalhostWithPort = port && (hostname === 'localhost' || hostname === '127.0.0.1');

  if (isLocalhostWithPort) {
    if (target === 'gallery') return `${protocol}//localhost:2283`;
    if (target === 'media') return `${protocol}//localhost:8080/media`;
  } else
    if (target === 'gallery') return `http://${hostname}:2283`;
    if (target === 'media') return '/media';


  return `/${target}`; // fallback
}
