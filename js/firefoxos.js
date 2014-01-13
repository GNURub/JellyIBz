url_manifest = "manifest.webapp" || "manifest.json";
var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox/') > -1;
if (is_firefox) 
{
    var request = navigator.mozApps.checkInstalled(url_manifest);
    request.onsuccess = function() {
      if (request.result) {
        // está instalada
        $("#firefox_OS").hide();
      } else {
        // no está instalada
        var install = navigator.mozApps.install(url_manifest);
      }
    };
    request.onerror = function() {
      alert('Error verificando estado de la instalación: ' + this.error.message);
    };
}else
{
    $("#firefox_OS").hide();
}