# l10n-demo-calendar

This is a demo for the @lxg/l10n library. To learn more about this library, please read the [main l10n documentation](https://github.com/lxg/l10n). This demo is a showcase for different features of that library:

1. How to translate simple strings using the `l10n.t()` function.
2. How to translate month and weekday names.
3. How to create localised date expressions. (For those who don’t know, it’s not enough to translate month/weekday names, but the notation differs across languages as well.)


## Get it running

Check out the repo, then run:

```
npm install
npm run dev
```

This will start a development server and allow you to open the index.html page in your browser.

If you want to modify or add your own translation strings, you can run `npx l10n -ec` from the command line, then edit the files in the `l10n/` folder. Do **not** modify the `translations.json`, it will be overwritten!
