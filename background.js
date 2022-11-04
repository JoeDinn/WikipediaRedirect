// match pattern for the URLs to redirect
let urlPattern = "*://*.wikipedia.org/*";
let backslashRE = new RegExp(/%5C_|\\_|\/_/g);
browser = (typeof browser !== 'undefined')? browser: chrome;

// redirect function
// returns an object with a property `redirectURL`
// set to the new URL
function redirect(requestDetails) {
    let url = new URL(requestDetails.url);
    console.log(url)

    // Check needed to prevent infinite loops
    if (url.host.includes(".m.wikipedia.org") || backslashRE.test(url.pathname))
    {
        url.href = url.href.replace(".m.wikipedia.org", ".wikipedia.org");
        url.href = url.href.replace(backslashRE, "_")
        
        console.log("Redirecting: " + url.href);
        return {
            redirectUrl: url.href
        };
    }
}

// add the listener,
// passing the filter argument and "blocking"
browser.webRequest.onBeforeRequest.addListener (
  redirect,
  {urls:[urlPattern], types:["main_frame"]},
  ["blocking"]
);
