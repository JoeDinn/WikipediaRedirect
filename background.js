// match pattern for the URLs to redirect
var pattern = "*://*.wikipedia.org/*";

// redirect function
// returns an object with a property `redirectURL`
// set to the new URL
function redirect(requestDetails) {
    var url = new URL(requestDetails.url);
    var changeUrl = false;
    if (url.host.includes(".m.wikipedia.org"))
    {
        url.href = url.href.replace(".m.wikipedia.org", ".wikipedia.org");
        changeUrl = true;
    }
    if (url.pathname.includes("%5C_"))
    {  
        url.href = url.href.replace("%5C_", "_")
        changeUrl = true;
    }
    if (changeUrl)
    {
        console.log(url)
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
  {urls:[pattern], types:["main_frame"]},
  ["blocking"]
);
