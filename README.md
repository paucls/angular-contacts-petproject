# Introduction
A pet project application that shows how to implement large angular projects following a modular design, good practices, TDD with unit and e2e tests, etc.
Uses Angular 1.4, ES6, Bootstrap, Gulp 4, Sass/Compass.

# Setup
Make sure you have installed Node, Gulp 4 and Sass/Compass.

Install local dependencies
```bash
npm install
bower install
```

# Usage
Build and start development server
```bash
gulp --debug
```

# Running tests
## Unit Tests
```bash
gulp karma

# watch for file changes and rerun
gulp karma -w
```

## Protractor E2E Tests
```bash
gulp ui
```
