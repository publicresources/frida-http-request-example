function doGet(url) {
    var result = null;

    Java.perform(function () {
        var HttpParams = Java.use('org.apache.http.params.BasicHttpParams');
        var HttpConnectionParams = Java.use('org.apache.http.params.HttpConnectionParams');
        var HttpClient = Java.use('org.apache.http.client.HttpClient');
        var DefaultHttpClient = Java.use('org.apache.http.impl.client.DefaultHttpClient');
        var HttpGet = Java.use('org.apache.http.client.methods.HttpGet');
        var Log = Java.use('android.util.Log');

        try {
            var httpParameters = HttpParams.$new();
            // Set a timeout of 3 seconds.
            HttpConnectionParams.setConnectionTimeout(httpParameters, 3000);

            var httpclient = DefaultHttpClient.$new(httpParameters);
            var response = httpclient.execute(HttpGet.$new(url));

            result = convertHttpResponseToString(response);
        } catch (e) {
            Log.e('Constants.TAG', 'Failed to establish connection.');
        }
    });

    return result;
}

function convertHttpResponseToString(response) {
    var BufferedReader = Java.use('java.io.BufferedReader');
    var InputStreamReader = Java.use('java.io.InputStreamReader');
    var StringBuilder = Java.use('java.lang.StringBuilder');

    var bufferedReader = BufferedReader.$new(InputStreamReader.$new(response.getEntity().getContent()));
    var line;
    var responseStringBuilder = StringBuilder.$new();

    while ((line = bufferedReader.readLine()) !== null) {
        responseStringBuilder.append(line).append('\n');
    }

    bufferedReader.close();
    return responseStringBuilder.toString();
}

// Example of usage
var url = 'https://url/api.json';
var result = doGet(url);
console.log('Request result:', result);
