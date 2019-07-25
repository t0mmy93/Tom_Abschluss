# Abschlussaufgabe-EIA2-SS19

Vorweg: alle Dateien und Ordner ausserhalb von /Abschluss 19, könnt ihr komplett ignorieren, das sind die ganzen alten Dateien von letztem Semester.

Es gibt 3 verschiedene Seiten die sich untereinander mit Buttons verlinken: **index.html**, **orders.html**, **buyer.html**, wobei index die Konfiguration der Kategorien für die Verkäufer ist. 

## Installation

1. Um das Projekt zum starten zu bekommen solltet ihr den Abschluss 19 Ordner herunterladen.

2. Öffnet den Ordner im Terminal und startet einmal ```npm install```.

3. Jetzt im Terminal ```npm install --global gulp-cli``` starten und installieren.

4. Ich habe das ganze Projekt mit einem kleinen Taskrunner ausgestattet, der ein paar simple Programme automatisch im Hintergrund ausführt. Wenn das Terminal mit installieren durch ist, müsst ihr den Unterordner src im Terminal auswählen und dort einfach den Befehl ```gulp```  starten, und es sollte sich automatisch das Browserfenster öffnen. Gulp lädt die Internetseite bei jeder Änderung im HTML, SCSS, oder Javascript von alleine neu. 

## Bootstrap

Es gibt fast kein eigenes CSS, weil plain CSS schreiben Cancer ist. Für das Page Design habe ich Bootstrap benutzt. Bootstrap funktioniert so, dass man quasi ein weiteres CSS file mit einbindet, das einem sehr viele Klassen schon vorgibt. Hier die [Dokumentation](https://getbootstrap.com/docs/4.3/getting-started/introduction/) falls ihr mehr darüber wissen wollt.
Kurz zusammengefasst kann man mit Bootstrap schon beim HTML-Aufbau einigermaßen strukturiert arbeiten. Dazu gibt man den einzelnen Elementen einfach Bootstrap-Classes. Nur falls ihr euch wundert warum da so viele unübersichtliche Klassen rumlungern. 

## SCSS 

Natürlich kommt man nie ganz ohne eigenes CSS aus, aber wie gesagt versuche ich das zu vermeiden. Für das CSS was ich von Hand tippe, benutze ich Sass. Das ist eine etwas umfangreichere Stylesheet-Sprache die in normales CSS kompiliert wird. Sehr praktisch, weil man dadurch auch im CSS mit Variablen und Verschachtelungen arbeiten kann. Und die nutzlosen Selektoren spart man sich auch. Die Files die in Sass programmiert sind, enden mit .scss. 

## Gulp 

Wie gesagt ist Gulp ein Taskrunner, der einem unliebsame Aufgaben abnimmt. Auch die .scss files werden per Gulp kompiliert. Am Ende könnt ihr ganz einfach den scss-Ordner ignorieren und nur den css-Ordner übernehmen. 








# Have fun mit euren Konzepten!

![Noice](https://media1.tenor.com/images/0490c28b2d33d0ae40f823e53f6a2c15/tenor.gif?itemid=5439517)
