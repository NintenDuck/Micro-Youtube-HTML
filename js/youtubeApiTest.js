var apiKey = "AIzaSyCveHlrpaGLt35eFLOrX2WeemPJS1GZDv4"
var personalID = "VP6isH0l3nLU-NIJs875nw"

function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
        'apiKey': apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
        // clientId and scope are optional if auth is not required.
        'clientId': personalID + '.apps.googleusercontent.com',
        'scope': 'profile',
    }).then(function () {
        // 3. Initialize and make the API request.
        return gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
        });
    }).then(function (response) {
        console.log(response.result);
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};
// 1. Load the JavaScript client library.
gapi.load('client', start);


function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({
            scope: "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtubepartner"
        })
        .then(function () {
                console.log("Sign-in successful");
            },
            function (err) {
                console.error("Error signing in", err);
            });
}


function loadClient() {
    gapi.client.setApiKey(personalKey);
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () {
                console.log("GAPI client loaded for API");
            },
            function (err) {
                console.error("Error loading GAPI client for API", err);
            });
}


// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    return gapi.client.youtube.search.list({
            "order": "rating",
            "q": "minecraft"
        })
        .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
            function (err) {
                console.error("Execute error", err);
            });
}
gapi.load("client:auth2", function () {
    gapi.auth2.init({
        client_id: personalID
    });
});
