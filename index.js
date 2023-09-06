const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',  // IF YOU WANT TO WATCH LIVE BROWSER SCRAPIGN
    ignoreHTTPSErrors: true,
    timeout: 120000, // Increase the timeout to 30 seconds (or as needed)
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
  });
  const page = await browser.newPage();
 
  
   // Your Puppeteer code
   await page.goto('https://whatismyip.uno');
  
   // get the ip of the proxy
   const ipAddress = await page.evaluate(() => {
     const ipElement = document.querySelector('.elementor-element-16097e2 b');
     return ipElement.textContent;
   });

   console.log('IP Address:', ipAddress);  



  res.send(ipAddress);

  await browser.close();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("starting....");
});
