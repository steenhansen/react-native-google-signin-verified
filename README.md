
## Verified Google Signin for React Native on Android

This is a bare bones example of React Native Android using Gmail to
authenticate a user, and then verify the same user on a Node.js
backend server.

This example is a stripped down copy of https://github.com/invertase/react-native-firebase-authentication-example

Firebase React Native bindings are not used, but are left in place.



> ⚠️ [Please be sure your environment is set up correctly for React Native CLI.](https://reactnative.dev/docs/environment-setup)


-------------------------------

## Step A
Create C:/the-project/android/app/debug.keystore with keytool.exe

```bash
PS C:/the-project/android/app> keytool -genkeypair -v -storetype PKCS12 -keystore debug.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
Enter keystore password:yer-keystore-password
```
Put 'yer-keystore-password' into /keystore.REAL.properties twice 

-------------------------------
## Step B
Get SHA1 and SHA256 values of keystore

```bash
PS C:/the-project/android/app> keytool -keystore debug.keystore -list -v
Enter keystore password:yer-keystore-password
Certificate fingerprints:
         SHA1: 21:21:21:21:21:21:21:21:21:21:21:21:21:21:21:21:21:21:21:21
         SHA256: a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7:a7
```
-------------------------------
## Step C
Put SHA1 and SHA256 into  https://console.firebase.google.com/project/yer-project-name/settings/general/android:com.yer-project-name

  Project | Your Apps | Android Apps | Add fingerprint

![](/C-sha1-sha256-android.png)

-------------------------------
## Step D
Get webClientId from your Firebase project's authentication provider.

Go to : https://console.firebase.google.com/project/yer-project-name/authentication/providers

Project | Authentication | Sign-in method | Provider - Google| Web SDK Configuration

Copy "703366983526-rqp153lgutts5rhlhit133tuv77p0pja.apps.googleusercontent.com"

Paste value into /src/config.json

![](/D-web-client-id.png)


-------------------------------
## Step E
Get google-services.json into /android/app/

Go to : https://console.firebase.google.com/project/yer-project-name/settings/general/android:com.yer-project-name

  Project | Your Apps | Android Apps | google-services.json | DOWNLOAD file

-------------------------------
## Step F

Choose support email in yer-project-name

Go to : https://console.firebase.google.com/project/yer-project-name/settings/general/android:com.yer-project-name

-------------------------------
## Step G

Replace every 'fonecook3' instance in the project with yer-project-name.
I advise using only lowercase letters and numbers for your project name; no dashes either.

For example /src/app.json

     "name": "fonecook3",    ==>  "name": "yer-project-name",

For example /android/app/build.gradle

      applicationId "com.fonecook3"    ==>  applicationId "yer-project-name"


-------------------------------
## Step H

PS C:/the-project> yarn install

-------------------------------

## USB Run:

  Bash 1

    PS C:/the-project> yarn start

  Bash 2

    PS C:/the-project> adb devices
                            List of devices attached
                            52109e7dea7f2495        device
                       adb -s 52109e7dea7f2495 reverse tcp:8081 tcp:8081
                       yarn android


## EMLUATOR Run:

  Bash 1

    PS C:/the-project> yarn start

  Bash 2

    PS C:/the-project> yarn android

  Open in browser
    http://localhost:8081/debugger-ui/

