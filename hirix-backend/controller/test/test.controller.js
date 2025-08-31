const Test = (req, res) => {
  res.send(`
   <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Server Status</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #0b1220;
          color: #e5e7eb;
        }
        .card {
          background: #101827;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,.3);
        }
        .status {
          font-size: 22px;
          font-weight: bold;
          color: #10b981;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="status">✅ Server is working fine</div>
        <p>Environment: production</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      </div>
    </body>
    </html>
    `);
};

module.exports = {
  Test,
};
