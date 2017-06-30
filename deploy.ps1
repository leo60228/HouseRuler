$ErrorActionPreference = "Stop"

Push-Location $PSScriptRoot
git diff-index --quiet HEAD --
$unsaved = $LASTEXITCODE
if ($unsaved) {git stash}
git pull
Remove-Item -Recurse -ErrorAction Ignore .\docs\
Copy-Item -Recurse .\public\ .\docs\
git add -f docs
git commit -m '[SCRIPT] Updated site'
git push
if ($unsaved) {git stash pop}
Pop-Location
echo 'Deployed!'
