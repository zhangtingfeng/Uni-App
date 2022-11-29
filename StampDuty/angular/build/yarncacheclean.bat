SET currentpath=%cd%
ECHO %currentpath%
set output
for /f "delims=" %%i in ('yarn cache dir') do set output=%%i
cd %output%
for /d %%G in (".tmp*","*shared-*","*adk-*","*authentication*") do rmdir /s /q "%%G"
cd %currentpath%