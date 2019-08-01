# Postman External Require

Use Node packages not bundled into Postman's sandbox.

## Setup

Clone this repo.

`npm i`

`node index.js`

Add the following script to the `Pre-Request Script` of your collection:

```js
const reqs = pm.globals.get('require');
const pkgs = pm.globals.get('packages');
const installed = pm.globals.get('installedPackages');

if (pkgs && (reqs === installed)) {
    eval(pkgs)
} else {
    pm.sendRequest({
        url: `localhost:3000?packages=${reqs}`,
        method: 'GET'
    }, (err, res) => {
        eval(res.text());
        pm.globals.set('installedPackages', reqs);
        pm.globals.set('packages', res.text());
    });
}
```

Create a global variable in Postman called `require`. Provide a comma separated listed of packages you need e.g. `uniq,slapdash,pad-left`.

`require` your packages in the usual way from within folder/request scripts!
