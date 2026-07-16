// Custom entry point so Next.js can run under cPanel's Node.js App (Passenger).
// Passenger injects the port to listen on via process.env.PORT — `next start`
// alone doesn't work as a Passenger startup file, so we wrap it in a plain
// http server here. Set this file as the "Application startup file" in
// cPanel's Setup Node.js App screen.
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Frontend running on port ${port}`);
  });
});
