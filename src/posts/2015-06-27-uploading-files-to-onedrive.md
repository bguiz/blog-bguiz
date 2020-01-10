---
title: Uploading Files to Onedrive in Cordova App
date: '2015-06-27T19:24+11:00'
comments: true
tags: [windows, cordova, javascript, onedrive, livesdk]
---

## Overview

1. Set up a Windows-Phonegap app in MSVS2015
  - Phonegap tools
  - Create a microsoft.com account
  - Create developer account
  - Registering the app
2. Authentication in using LiveSDK
  - Install via NuGet
  - Application manifest for extra Internets
  - WL.* APIs + caveats
3. Backend for uploading a file to OneDrive
  - Using the `access_token`
  - OneDrive APIs

## Set up Windows-Phonegap app in Visual Studio

### Phonegap tools to generate the solution

The first thing that we need is to generate a Visual Studio solution.

- Install Phonegap via npm
  - ```bash
    npm install --global phonegap
    ```
- Generate a Visual Studio solution for a new project
  - ```bash
    phonegap create livesdk-onedrive-demo
    cd livesdk-onedrive-demo
    phonegap platform add windows
    phonegap build windows
    ```

Now that we have generated the project,
we can build and debug the project in an IDE.

- Open Microsoft Visual Studio 2015
- Hit `Ctrl+Shift+O` to open a solution
- Open to `livesdk-onedrive-demo/platforms/windows/CordovaApp.sln`
- Note that every time you run `phonegap build windows`
  - The contents of `livesdk-onedrive-demo/platforms/windows/*` get overwritten, so be careful
  - This means that when developing the app in Visual Studio,
    we must edit the contents of the generated folder,
    and then copy back out to the root folder (`livesdk-onedrive-demo/`)
    before committing to `git` (or other VCS),
    and before running the `phonegap build windows` command again.
  - This is a major source of frustration, as it does not affect
    other platforms such as Android.

### Create a Microsoft account

In order to test that any of this works,
you will need a Microsoft account.

A Microsoft account is a OneDrive account.
Note that, confusingly enough,
neither Hotmail accounts nor an Office365 email accounts are considered Microsoft accounts.
That is the equivalent of Google deeming GMail and Google Plus accounts to not be Google accounts.
I have it on good word from developers at Microsoft that they are looking into changing this.

- Skip this step if you already have a Microsoft account
- [What is a Microsoft account?](http://www.microsoft.com/en-sg/account/default.aspx)
- [Sign up](https://signup.live.com/signup.aspx)
- Use any email address that you already own

### Create a Windows Store developer account

In order to publish your app to the Windows app store,
you will need a developer account for it.

- Skip this step if you already have a Windows Store developer account
- [Sign up](https://appdev.microsoft.com/StorePortals/en-sg/Account/signup/start)
- Use the email address of the Microsoft account that you created earlier
- You have to pay for this:
  - Approximately $20 for individuals
  - Approximately $100 for businesses

### Registering the app with the Windows app store

In order to do anything with your app which
requires that the user logs in to their Microsoft account,
you need to register the app with the Windows app store.
In order to do this, you need a developer account.
The developer account is not free,
which means that you cannot develop or test this feature without paying first.

- Menu: `Project --> Store --> Associate App with the Store`
- Dialog: Associate
- Dialog: Sign in to Microsoft Account - Password
- Dialog: Sign in to Microsoft Account - Two factor authentication
- Dialog: Waiting for developer account to load
- Dialog: Selecting an application name
- Dialog: Associate confirm
- Solution Explorer:
  - Check that the following file has been created
  - `Solution 'Cordova App' --> CordovaApp --> CordovaApp.Windows --> CordovaApp.Windows_StoreKey.pfx`

## LiveSDK for authentication

In order for your app to **know**
who a particular user is,
and for the user to give permissions to the app to access their account -
in order to do stuff such as uploading to their OneDrive -
they need to log in to their Microsoft account.
The LiveSDK plugin is how we do this.

### Install LiveSDK via NuGet

NuGet is a package manager for .NET projects.
We use it to install LiveSDK.

- Menu: `Project --> Manage NuGet packages...`
- Tab: "NuGet Package Manager"
  - Search for `LiveSDK`
  - Select latest stable version (`v5.6.2` at time of writing)
  - Install it

### Application manifest for extra Internets

We also need to modify the project configuration to allow it access to the Internet.
By default, it allows limited access,
but we can extend this to include all forms of Internet access.

- Solution Explorer:
  - Open this file
  - `Solution 'Cordova App' --> CordovaApp --> CordovaApp.Windows --> package.windows.appxmanifest`
- Tab: `package.windows.appxmanifest`
  - Select "Internet (Client & Server)"
  - Select "Private Networks (Client & Server)"

### Windows Live APIs

LiveSDK exposes several Windows Live APIs via the `window.WL` object
in a Cordova project.

- Add script tag for `/js/wl.js` immediately after `cordova.js`
  - ```html
      <!-- Platform native wrappers -->
      <script type="text/javascript" src="cordova.js"></script>
      <script type="text/javascript" src="/js/wl.js"></script>
    ```
- Scopes
  - Be very careful about which scopes you can use
  - Each scope will allow the app to access certain features
  - For uploading a file to one drive the combination that we found we needed was:
    - ```javascript
      WL
            .login({
              scope: ['wl.signin', 'wl.basic', 'wl.offline_access',
                'wl.skydrive_update', 'wl.contacts_skydrive',
                'onedrive.readwrite']
            })
      ```

Unfortunately, LiveSDK suffers from some problems which
make developing for it difficult.
These are the ones that caused me the most difficulties.

- Fractured documentation
  - The **only** [correct reference for scopes](https://msdn.microsoft.com/en-us/library/hh243646.aspx)
  - Every API will also mention the scopes that it needs, and these are often partially correct - which means that they do not work at all
  - In particular, pay attention to ["Subset and superset behavior"](https://msdn.microsoft.com/en-us/library/hh243646.aspx#subset_superset)
    - This caused me much pain, because when `WL.login()` was called with a `scope`
      containing both `wl.skydrive` and  `wl.skydrive_update`, write operations always failed authorization,
      however, when there was only `wl.skydrive_update` (which is a "suyperset" of `wl.skydrive`) went through just fine
  - Still not completely clear about what the difference is between `wl.skydrive_update` and `onedrive.readwrite`,
    or why both were needed for this case.
- Cannot log out
  - Error got was:
    - ```
      "[WL]Logging out the user is not supported in current session because the user is logged in with a Microsoft account on this computer.
      To logout, the user may quit the app or log out from the computer."
      ```
  - However, quitting the app has no effect, and I have not yet logged out of my account -
    and have no intention of doing so.
    I feel that I should be able to log out of an app at any time I feel like,
    and no app should require me to log out of my operating system in order to log out within the app
    - This has been raised with developers from Microsoft,
      and they have indicated that they *may* look into this in the future.
      For now, however, they suggested looking into `WL.basic()` as an alternative to `WL.login()`

## Upload file to OneDrive

So far, we have only managed to install the necessary libraries,
and authenticate the user.
Now we can finally get around to the original intent,
which is uploading a file to a user's OneDrive.

### Using the `access_token` on the front end

We need an access token, obtained during authentication,
in order to interact with a user's account,
including their OneDrive.

- `WL.login()` returns a promise
  - ```javascript
    WL
      .login(/* ... */)
      .then(function onLoginSuccess(result) {
        // Do something with result
      }, function onLoginFailure(err) {
        // Do something with err
      });
    ```
- In the success callback of the promise, the first parameter is the result object,
  which should look something like this:
  - ```javascript
    {
      status: 'connected',
      session: {
        access_token: 'AReallyLongBase64EncodedToken',
      },
    }
    ```
Now if we were to invoke the Windows Live APIs,
which includes the OneDrive APIs,
directly from the front end,
we have no use for these.
We can simply call `WL.api()` and have that deal with the necessary authentication related work
However, in this case, we want to call our own back end APIs,
and have the back end upload a file to OneDrive on our behalf.
This is where `session.access_token` comes into play

### Using the `access_token` on the back end

With the access token passed from the front end
and in the hands of the back end,
we can next invoke the relevant OneDrive APIs to upload the file.

- Our own back end API thus receives the `access_token`,
  along with other information about the file that it needs to upload,
  such as the file name
- The first step is to determine the folder ID that we should upload to, using a HTTP GET request
  - In C#:
    - ```csharp
      public virtual string GetUploadLocation(string accessToken) {
        // Find out the folder ID (and therefore also the upload path) of the root directory in OneDrive
          var request =
            (HttpWebRequest)WebRequest.Create(
              String.format("https://apis.live.net/v5.0/me/skydrive?access_token={0}", accessToken));
          request.Method = "GET";
          var response = (HttpWebResponse)request.GetResponse();
          var responseReader = new StreamReader(response.GetResponseStream());

          // Parse the JSON response and extract the upload_location property
          string jsonStr = responseReader.ReadToEnd();
          var json =
            (Dictionary<string, dynamic>)JsonConvert.DeserializeObject(
              jsonStr, typeof(Dictionary<string, dynamic>));
          return json["upload_location"].ToString();
      }
      ```
- The second step is to actually perform the upload, using a HTTP PUT request
  - In C#:
    - ```csharp
      public virtual HttpWebResponse UploadFile(string accessToken, string fileName, byte[] fileData) {
          // Construct the upload URL
          String folderName = GetUploadLocation(accessToken);
          var uploadFileUrl = new Uri(
            String.Format("{0}{1}?access_token={2}", folderName, fileName, accessToken));

          // Upload the file by means of a streaming writer
          var request = (HttpWebRequest)WebRequest.Create(uploadFileUrl);
          request.Method = "PUT";
          request.ContentLength = fileData.Length;
          request.AllowWriteStreamBuffering = true;
          Stream stream = request.GetRequestStream();
          stream.Write(fileData, 0, fileData.Length);
          stream.Close();

          return (HttpWebResponse) request.GetResponse();
      }
      ```

This part is the most straightforward part,
however, also the part that fails,
and thus feels like is at fault.
In implementing this, the biggest source of grief was that using
the wrong scope in `WL.login()` was the biggest cause of errors
The responses returned by the Windows Live APIs were
simply HTTP error codes (401, 403 and 405) plus their generic descriptions.
It would be much more helpful if the responses
were to include a reason as well,
such as "You need the wl.skydrive_update scope to perform this action"

Microsoft also has published some docs on the brand new "Unified APIS",
available on the subdomain, `graph.microsoft.com`,
however, these unified APIs do not cover OneDrive.
It would be great if it did though.

## Thanks

Thanks to Saurabh Pawar for the work on the back end to upload the file to OneDrive.

Thanks to Rocky Heckman, Kiril Seksenov, & Ali Al Abbas from Microsoft
for their help with navigating Windows APIs.
