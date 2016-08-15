# A example using Webpack 2.0 , we use System.import in place of require.ensure in CMD
# Tech points

## Webpack
  - Webpack dev server config

## Redux Form V6
   
## Bootstrap.loader
  - .bootstraprc can support YAML or JSON config
  - Customized the bootstrap theme
  	If we don't config bootstrap.loader, we have to install jQuery
  	```
	styles: true

	scripts: false

	preBootstrapCustomizations: ./client/theme/variables.scss
	appStyles: ./client/theme/general.scss
  	```

## React Router
  Webpack System.import can't import module by expression, if if you fill a variable inside System.import, will cause a issue

## Redux Research
  - Create a middleware 