<br/><br/>
<img src="http://informatics.mayo.edu/phema/images/b/bc/Phema-logo.png">
<br/><br/>

# PhEMA Workbench App

[![PhEMA](./repo-badge.svg)](https://projectphema.org "PhEMA")
[![Build Status](https://travis-ci.org/PheMA/phema-workbench-app.svg?branch=master)](https://travis-ci.org/PheMA/phema-workbench-app "Travis CI build status")
[![Docker Image](https://images.microbadger.com/badges/version/phema/phema-workbench-app.svg)](https://hub.docker.com/r/phema/phema-workbench-api "Docker image version")

[PhEMA](http://projectphema.org) Workbench web application.

## Quickstart

The fastest way to get started is to run a Docker container using the
version shown in the badge above, for example:

```
docker run -p 8989:8989 phema/phema-workbench-app:0.1.0
```

To use the PhEMA Workbench application, you will also need to run the [API](https://github.com/PheMA/phema-workbench-api).

## Contributing

### Technologies

The PhEMA Workbench App is built using the following technologies:

- Node (12.16.1)
  - [Yarn](https://classic.yarnpkg.com/en/)
  - [Parcel](https://parceljs.org/)
  - [React](https://reactjs.org/)
  - Many other libraries listed in [`package.json`](./package.json)

### Workflow

> #### 1. Clone the repo

```
git clone https://github.com/phema/phema-workbench-app.git && cd phema-workbench-app
```

> #### 2. Run Parcel

Running the following will start Parcel in `watch` mode, which will
automatically rebuild when you make any changes:

```
yarn watch
```

> #### 3. Build Release

When you're done making your changes, you can run a release build:

```
yarn build
```

This will create a `dist` folder with all the release artifacts.

### Deployment

To publish a new Docker image, push a new tag to the repo.

## Acknowledgements

This work has been funded by NIGMS grant R01GM105688.

## License

[Apache 2.0](license.md)
