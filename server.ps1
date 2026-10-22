param (
    [int]$Port = 5500
)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Output "SWIFT_SERVER_STARTED: http://localhost:$Port/"
} catch {
    Write-Error "Failed to start listener: $_"
    exit 1
}

$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".mp4"  = "video/mp4"
    ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        # Remove leading slash and normalize slashes
        $relPath = $urlPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        $filePath = [System.IO.Path]::Combine($root, $relPath)

        if ([System.IO.File]::Exists($filePath)) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $contentType = $mimeTypes[$ext]
            }
            $response.ContentType = $contentType
            $response.AddHeader("Access-Control-Allow-Origin", "*")

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.StatusCode = 200
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # ignore client disconnect errors
    }
}
