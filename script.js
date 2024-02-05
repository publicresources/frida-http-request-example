
function httpGet(targetUrl: string, onReceive: (response: string) => void = function (response: string) { console.log("response: " + response); }) {
    Java.perform(function () {
        var HttpURLConnection = Java.use("java.net.HttpURLConnection");
        var URL = Java.use("java.net.URL");
        var BufferedReader = Java.use("java.io.BufferedReader");
        var InputStreamReader = Java.use("java.io.InputStreamReader");
        var url = URL.$new(Java.use("java.lang.String").$new(targetUrl));
        var conn = url.openConnection();
        conn = Java.cast(conn, HttpURLConnection);
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "text/plain");

        conn.setConnectTimeout(5000);
        conn.setReadTimeout(5000);
        conn.setDoInput(true);

        conn.connect();
        var code = conn.getResponseCode();
        var ret = null;
        if (code == 200) {
            var inputStream = conn.getInputStream();
            var buffer = BufferedReader.$new(InputStreamReader.$new(inputStream));
            var sb = []
            var line = null;
            while ((line = buffer.readLine()) != null) {
                sb.push(line);
            }
            ret = sb.join("\n");
        } else {
            ret = "error: " + code;
        }
        conn.disconnect();
        onReceive(ret);
    });
}
