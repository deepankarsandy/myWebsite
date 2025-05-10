// utils/navigation.js
export function getRedirectUrl(target) {
  const { hostname, port, protocol } = window.location;

  const isLocalhostWithPort = port && (hostname === 'localhost' || hostname === '127.0.0.1');

  if (isLocalhostWithPort) {
    if (target === 'photo') return `${protocol}//localhost:3000`;
    if (target === 'media') return `${protocol}//localhost:8080/media`;
  } else {
    if (target === 'photo') return '/photo';
    if (target === 'media') return '/media';
  }

  return '/'; // fallback
}
