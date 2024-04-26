#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 22000; // DOLLARS
let myPin = 8227;
console.log(chalk.greenBright.bold("Welcome to Khan ATM"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter your pin",
        type: "number",
    },
]);

if (pinAnswer.pin === myPin) {
    console.log(chalk.redBright.bold("Your pin is correct !!"));
    let operator = await inquirer.prompt([
        {
            name: "operation",
            message: "Please select operation",
            type: "list",
            
            choices: ["withdraw", "check balance", "fast cash", "exit"],
        },
    ]);

    if (operator.operation === "withdraw") {
        let amount = await inquirer.prompt([
            {
                name: "myAmount",
                message: "Enter withdraw amount",
                type: "number",
            },
        ]);

        if (myBalance >= amount.myAmount) {
            myBalance -= amount.myAmount;
            console.log(chalk.yellowBright.italic(`Remaining balance is ${myBalance}`));
        } else {
            console.log(chalk.magenta.italic("Insufficient balance"));
        }
    } else if (operator.operation === "check balance") {
        console.log(chalk.yellowBright.bold.italic(`Your balance is ${myBalance}`));
    } else if (operator.operation === "fast cash") {
        let selectAmount = await inquirer.prompt([
            {
                name: "select",
                message: "Please select your amount",
                type: "rawlist",
                choices: ["500", "1000", "5000", "10000"],
            },
        ]);

        (myBalance -= selectAmount.select)
        console.log(chalk.yellowBright.bold.italic(`Your remaining balance is ${myBalance}`));
    } else if (operator.operation === "exit") {
        console.log(chalk.yellowBright.italic("Thank you"));
    }
} else {
    console.log(chalk.redBright.italic("Your pin is incorrect"));
}
