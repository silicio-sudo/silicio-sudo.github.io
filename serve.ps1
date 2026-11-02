$root = "C:\Users\NEO\silicio-portfolio"
$port = 8765
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Output "Serving $root on http://localhost:$port/"

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $path = $req.Url.AbsolutePath
  if ($path -eq "/") { $path = "/index.html" }
  $file = Join-Path $root ($path.TrimStart("/").Replace("/", "\"))
  if ((Test-Path $file -PathType Leaf) -and $file.StartsWith($root)) {
    $res = $ctx.Response
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    $mime = switch ($ext) {
      ".html" { "text/html" }
      ".css"  { "text/css" }
      ".js"   { "application/javascript" }
      ".svg"  { "image/svg+xml" }
      ".png"  { "image/png" }
      ".jpg"  { "image/jpeg" }
      ".jpeg" { "image/jpeg" }
      ".ico"  { "image/x-icon" }
      default { "application/octet-stream" }
    }
    $res.ContentType = "$mime; charset=utf-8"
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
    $res.OutputStream.Close()
  } else {
    $res = $ctx.Response
    $res.StatusCode = 404
    $res.Close()
  }
}
