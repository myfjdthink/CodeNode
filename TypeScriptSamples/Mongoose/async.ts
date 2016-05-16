/**
 * Created by nick on 16/5/14.
 */

"use strict";
// printDelayed is a 'Promise'
async function printDelayed(elements: string[]) {
  for (const element of elements) {
    await delay(200);
    console.log(element);
  }
}

async function delay(milliseconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

printDelayed(["Hello", "beautiful", "asynchronous", "world"]).then(() => {
  console.log();
  console.log("Printed every element!");
});