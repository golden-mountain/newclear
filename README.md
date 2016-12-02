# Reactjs based AX GUI Widget
## Thanks Fong given the suggestion to isolate this package

## TODO:
1. Follow airbnb as eslint rules

## DEV START COMMAND
Startup and switch AXAPI HOST:
AXAPI_HOST=192.168.105.196 npm start

## Recommend install Chrome plugins
1. Immutable.js Object Formatter , see http://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html
2. LiveReload
3. React Developer Tools
4. Redux DevTools
5. React Perf https://github.com/crysislinux/chrome-react-perf

## Module Manager
- Module Visible: license, oem
- Page switch: transition


# Editable schema
Each component if with schema props, will register to schema field


# CAUTIONS:
## Share a10-widget or a10-widget-lib
Don't need npm install seprately, if you want works with client(the main project) , 
if you did npm install under those 2 folders,maybe will cause 
```
 Error: Invariant Violation: addComponentAsRefTo(…): Only a ReactOwner can have refs.
```
But if you need only development those widgets, then you can install.