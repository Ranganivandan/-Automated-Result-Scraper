const axios = require("axios");
const { JSDOM } = require("jsdom"); // Import JSDOM for DOM manipulation in Node.js
const fs = require("fs");

async function getresult(seatno) {
  await axios
    .get(url)
    .then((response) => {
      console.log(response);
      const dom = new JSDOM(response.data);
      console.log(response);
      const sgpa = dom.window.document.querySelector(
        "body > table > tbody > tr:nth-child(11) > td > span"
      );
      const cgpa = dom.window.document.querySelector(
        "body > table > tbody > tr:nth-child(12) > td > span"
      );
      const name = dom.window.document.querySelector(
        "body > table > tbody > tr:nth-child(5) > td:nth-child(2)"
      );
      const backlog = dom.window.document.querySelector(
        "body > table > tbody > tr:nth-child(14) > td > span"
      );
      const institute = dom.window.document.querySelector(
        "body > table > tbody > tr:nth-child(6) > td:nth-child(2)"
      );
      if (sgpa) {
        // Write the result to a file
        fs.appendFile(
          "resultdata1.txt",
          `student name:${name.textContent}, Seat No: ${seatno}, Result(sgpa): ${sgpa.textContent},Result(cgpa):${cgpa.textContent} ,Number of Backlog: ${backlog.textContent},
          Institute Name: ${institute.textContent} 
          \n`,
          (err) => {
            if (err) {
              console.error(
                `Error writing to file for seat no ${seatno}:`,
                err
              );
            } else {
              console.log(
                `student name:${name.textContent}, Seat No: ${seatno}, Result: ${sgpa.textContent},Result(cgpa):${cgpa.textContent},Number of backlog:${backlog.textContent},Institute Name: ${institute.textContent} `
              );
            }
          }
        );
      } else {
        console.log(`Element not found for seat no ${seatno}`);
      }
    })
    .catch((error) => {
      console.error(
        `Error fetching the URL for seat no ${seatno}:`,
        error.message
      );
    });
}

// Loop through seat numbers
for (let index = 0; index < 200; index++) {
  const seatno = startinseatnumber + index;
  getresult(seatno);
}
