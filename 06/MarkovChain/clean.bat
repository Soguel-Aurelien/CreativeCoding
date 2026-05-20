@echo off
set "input=shakespeare.txt"
set "output=cleaned.txt"

(
  for /f "usebackq delims=" %%A in ("%input%") do (
    echo %%A | findstr /C:"THIS ELECTRONIC VERSION OF THE COMPLETE WORKS OF WILLIAM" >nul && continue
    echo %%A | findstr /C:"SHAKESPEARE IS COPYRIGHT" >nul && continue
    echo %%A | findstr /C:"PROVIDED BY PROJECT GUTENBERG" >nul && continue
    echo %%A | findstr /C:"PERSONAL USE ONLY" >nul && continue
    echo %%A | findstr /C:"NOT DISTRIBUTED OR USED COMMERCIALLY" >nul && continue
    echo %%A | findstr /C:"SERVICE THAT CHARGES FOR DOWNLOAD TIME" >nul && continue

    echo %%A
  )
) > "%output%"

echo Nettoyage terminé !
echo Fichier généré : %output%
