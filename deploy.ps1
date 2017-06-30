$ErrorActionPreference = "Stop"

Push-Location $PSScriptRoot
git pull
Remove-Item -Recurse -ErrorAction Ignore .\docs\
Copy-Item -Recurse .\public\ .\docs\
git add -f docs
git commit -m '[SCRIPT] Updated site'
Remove-Item -Recurse .\docs\
git push
Pop-Location
echo 'Deployed!'
