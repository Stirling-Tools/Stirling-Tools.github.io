// Fix anchor scrolling on client-side navigation
export function onRouteDidUpdate({location}) {
  // Small delay to ensure content is rendered
  if (location.hash) {
    setTimeout(() => {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }, 100);
  }
}
