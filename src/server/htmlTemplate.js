const htmlTemplate = ({body, pageTitle, favicon, mainColor, scriptTags, styleTags, preloadedState}) =>
`<!doctype html>
<html>
<head>
    <meta charset="utf8">
    <title>${pageTitle}</title>
    <base href="/">
    ${styleTags}

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="${favicon}">
    <meta name="theme-color" content="${mainColor}">
</head>
<body>
    <div id="appwrapper">${body}</div>
    <script>${preloadedState}</script>
    ${scriptTags}
</body>
</html>
`;

export default htmlTemplate;
