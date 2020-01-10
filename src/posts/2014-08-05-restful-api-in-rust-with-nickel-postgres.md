---
title: Building RESTful API server in Rust with nickel-postgres
date: '2014-08-05T22:47+11:00'
comments: true
tags: [rust, postgres, nickelrs, restful, api]
---

Following on from [my first Rust program](/2014/08/02/webserver-using-nickel-rs-rust-postgres-my-first-ever-rust-program/),
I have created my first Rust library, `nickel-postgres`.

[`nickel-postgres` on Github](https://github.com/bguiz/nickel-postgres/tree/feature/init)

You can use it in your projects by adding this to `Cargo.toml`:

    [dependencies.nickel_postgres]

    git = "https://github.com/bguiz/nickel-postgres.git"
    rev = "feature/init"

Here is a [sample webserver](https://github.com/bguiz/rust-scratch/tree/master/nickel-postgres)
that demonstrates how to create a RESTful API using `Nickel.rs` and `nickel-postgres`,
and includes a demo front end to test it out.

Here is how - First off, import the crate and middlware class:

    extern crate nickel_postgres;
    use nickel_postgres::PostgresMiddleware;

Next, add instantiate `PostgresMiddleware`, and add it to your instance of `Nickel`:

    let mut server = Nickel::new();
    let postgres_middleware: PostgresMiddleware = PostgresMiddleware::new(
        "postgres://postgres:postgres@localhost", postgres::NoSsl, 5);
    server.utilize(postgres_middleware);

Finally, within each HTTP request handler functions, obtain a database connection:

    fn a_handler_function(req: &Request, response: &mut Respose) {
        let db_conn = req.map.find::<PooledPostgresConnection>().unwrap();
        // use db_conn
    }

That is all, enjoy!

Many thanks to [Christoph Burgdorf](https://github.com/cburgdorf),
creator of [Nickel.rs](https://github.com/nickel-org/nickel.rs),
and [Steve Fackler](https://github.com/sfackler),
author of [rust-postgres](https://github.com/sfackler/rust-postgres),
for giving me a number of pointers to get things going.

[Are we web yet?](http://arewewebyet.com/)
... one step closer!
