@echo off
setlocal enabledelayedexpansion

set OUTPUT_FILE=output.txt
set PROJECT_PATH=%~dp0

rem 1. Generate project structure
echo Project Structure: > %OUTPUT_FILE%
tree /f /a "%PROJECT_PATH%" >> %OUTPUT_FILE%
echo. >> %OUTPUT_FILE%
echo File Data: >> %OUTPUT_FILE%
echo. >> %OUTPUT_FILE%

rem 2. Extract data from JS, TS, TSX, CSS, SCSS, CJS, JSON, JSX files
for /r "%PROJECT_PATH%" %%i in (*.js *.ts *.tsx *.css *.scss) do (
    echo File: %%~nxi >> %OUTPUT_FILE%
    type "%%i" >> %OUTPUT_FILE%
    echo. >> %OUTPUT_FILE%
)

echo Done! The project structure and data have been saved to %OUTPUT_FILE%.
