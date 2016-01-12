# queueball

An overengineered queue for handling office hours. Designed for streamlining UC Berkeley's introductory computer science course.

## Installation

`queueball` uses [PostgreSQL](http://www.postgresql.org/) as a database backend, and [Redis](http://redis.io/) as a session store. Ensure that they are both installed and configured before following the rest of the instructions.

```bash
$ git clone https://github.com/kvchen/queueball.git
$ cd queueball
$ npm install
```

## Getting started

To run the development server, simply enter the command

```bash
$ npm run dev
```

For production servers, run

```bash
$ npm run prod
```

It is recommended that you run the server from a service that can manage restarts of the system on failures, such as an init script for [systemd](https://wiki.freedesktop.org/www/Software/systemd/) or [forever](https://github.com/foreverjs/forever).
