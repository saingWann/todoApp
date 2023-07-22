
# just run this line in terminal

purgecss --css css/newStyle.css --content index.html  --output css/purged.css

# sass with no source map Run this code
sass sass/style-input.scss css/newStyle.css --watch --no-source-map --style=compressed