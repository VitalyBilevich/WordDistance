@echo off
echo Retrieving two random words from an English dictionary for testing. 
echo The original starts first, then the new one. The results should match.

for /F %%C in ('^< "words.txt" find /C /V ""') do set "COUNT=%%C"
set /A "NUMBER=%RANDOM%%%%COUNT%"
if %NUMBER% gtr 0 (set "SKIP=skip=%NUMBER%") else (set "SKIP=")

for /F usebackq^ %SKIP:skip=skip^%^ delims^=^ eol^= %%L in ("words.txt") do (   
	set "resultWord=%%L"	
    goto :endLoop
)
:endLoop

set /A "NUMBER2=%RANDOM%%%%COUNT%"
if %NUMBER2% gtr 0 (set "SKIP=skip=%NUMBER2%") else (set "SKIP=")
for /F usebackq^ %SKIP:skip=skip^%^ delims^=^ eol^= %%L in ("words.txt") do (   
	set "wordToConvert=%%L"
    goto :endLoop
)
:endLoop


npm start -- "%resultWord%" "%wordToConvert%" & echo: & echo Starting new one & npm test -- "%resultWord%" "%wordToConvert%" & echo: & set /p DUMMY=Hit ENTER to test again. Close window to exit. & start test.bat & exit



