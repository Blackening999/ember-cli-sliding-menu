# Ember-cli-sliding-menu

This is another convenient component representing the side sliding-menu (left or right).
Originally was inspired by similar existing addons/libraries.
It has some features since it was designed for mobile applications at first:

- Performance optimized for mobile applications (tested for cordova app on iOS)
- It has the effect of inertia
- Highly customizable
- Separated handler so your app won't experience any conflict
- Easy to use (see below)
- For desktop apps there is a commented frost-glass effect logic (beta)

## Dependencies
- [Hammer](https://github.com/hammerjs/hammer.js)

## Usage
1. Install the addon
```bash
  $ ember install:addon ember-cli-sliding-menu
```

2. Use the component where you need it
```js
  {{#sliding-menu appIdentifier='.app'}}
    //... your menu items goes here
  {{/sliding-menu}}
```

3. That's all. Now everything you need is decorate your menu

*P.S. In order to get rid from any possible glitches it's highly recommended to set
property appIdentifier not to '.ember-application' container itself(default) but to its descendant.
In the example above I'm using className - '.app' for Application's View*


## Example
Here you can find convenient example with bucket of supporting features, like:
- **background-overlay** which gives an opportunity to close menu by clicking to the free of opened menu
- **toggle-menu** which helps to handle menu open/close via buttons click/action
[EXAMPLE](https://github.com/Blackening999/testing-menu)

## Options
There are plenty of options available.

1. Transition trough menu item with menu-closing

In your application controller:
```js
  import Ember from 'ember';
  import MenuHelper from 'testing-menu/mixins/menu-helper';
  
  export default Ember.Controller.extend(MenuHelper, {});
```

Add menu item
```js
      <div class="menu">
          <div {{action "transitionFromMenu" "home"}} class="menu-item">Home page</div>
    </div>
```

2. Options represented by properties you can pass to component:
- slideDirection: @String 'toLeft|toRight' default: 'toLeft' - menu placement, toLeft means from right to left
- pannableWidth: @Number  > 0              default: 40       - width of zone where menu can be invoked
- defaultSpeed: @Double   > 0.00 && < 1.00 default: 0.03     - menu animation speed


## Author

  [Vladimir Katansky](http://github.com/Blackening999)

## License

(The MIT License)

Copyright (c) 2015 Vladimir Katansky

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
