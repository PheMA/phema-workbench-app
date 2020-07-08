<br/><br/>
<img src="http://informatics.mayo.edu/phema/images/b/bc/Phema-logo.png">
<br/><br/>

# PhEMA Workbench App

[![PhEMA](./repo-badge.svg)](https://projectphema.org "PhEMA")
[![Build Status](https://travis-ci.org/PheMA/phema-workbench-app.svg?branch=master)](https://travis-ci.org/PheMA/phema-workbench-app "Travis CI build status")
[![Docker Image](https://images.microbadger.com/badges/version/phema/phema-workbench-app.svg)](https://hub.docker.com/r/phema/phema-workbench-api "Docker image version")

[PhEMA](http://projectphema.org) Workbench web application and related
components.

## Quickstart

The fastest way to get started is to run a Docker container using the
version shown in the badge above, for example:

```
docker run -p 8989:8989 phema/phema-workbench-app:0.4.3
```

To use the PhEMA Workbench application, you will also need to run the [API](https://github.com/PheMA/phema-workbench-api).

## Contributing

### Technologies

The PhEMA Workbench App is built using the following technologies:

- Node (12.16.1)
  - [Yarn](https://classic.yarnpkg.com/en/) (including [workspaces](https://classic.yarnpkg.com/en/docs/workspaces/))
  - [Parcel v2](https://v2.parceljs.org/)
  - [React](https://reactjs.org/)
  - Many other libraries listed in `package.json` for each package

### Monorepo Layout

This repository is a [Yarn
workspace](https://classic.yarnpkg.com/en/docs/workspaces/), which means it is a
monorepo that contains multiple packages. Each package is in a separate
directory under [`packages`](./packages), and is its own module under the
`@phema` namespace.

The idea is to encourage the development of small modules with well-defined
interfaces that can be re-used, while at the same time having the convenience of
all the code being in one place. The `workbench-app` package is the main entry
point of the application. It is responsible for layout, state management,
authentication, etc. This package should include include the others as follows:

```jsx
import { CqlEditor } from "@phema/cql-editor";
```

The other packages should, as much as possible, be
[`PureComponent`](https://reactjs.org/docs/react-api.html#reactpurecomponent)s
and have well-defined interfaces that are independent of the Workbench
application. Using the workflow below will allow you to work on both the app and
the components in convenient way.

### Workflow

> #### 1. Clone the repo

```
git clone https://github.com/phema/phema-workbench-app.git && cd phema-workbench-app
```

> #### 2. Run Parcel

Running the following will start Parcel in `serve` mode, which will
automatically rebuild when you make any changes:

```
yarn start
```

> #### 3. Build Release

When you're done making your changes, you can run a release build:

```
yarn build
```

This will create a `dist` folder in the [`workbench-app`](./packages/workbench-app) package with all the
release artifacts.

### Deployment

To publish a new Docker image, push a new tag to the repo.

## Acknowledgements

This work has been funded by NIGMS grant R01GM105688.

## License

[Apache 2.0](license.md)
