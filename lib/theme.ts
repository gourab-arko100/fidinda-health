// Shared theme settings. Kept outside the client component so the server layout can read the script text.
export const THEME_KEY = "fidinda-theme";

// Runs before the page paints, so there is no flash of the wrong theme. Light is the default.
export const themeScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='dark'&&t!=='light'){t='light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`;
