export function isMobile() {
  const isMobile =
    (typeof window !== "undefined" &&
      /Mobi|Android/i.test(navigator.userAgent)) ||
    window.innerWidth <= 768;
  return isMobile;
}
