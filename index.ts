#! /usr/bin/env node
import inquirer from "inquirer";

class Student {
    name: string;

    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];

    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const persons = new Person();

async function programStart(persons: Person) {
    do {
        console.log("Welcome!");
        const ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "Whom would you like to interact with?",
                choices: ["staff", "student", "exit"]
            }
        ]);

        if (ans.select === "staff") {
            console.log("You approached the staff room. Feel free to ask anything.");
        } else if (ans.select === "student") {
            const ans = await inquirer.prompt([
                {
                    name: "student",
                    type: "input",
                    message: "Enter the student's name you wish to engage with:"
                }
            ]);

            const student = persons.students.find(val => val.name === ans.student);

            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(`Hey I am ${name.name}. Nice to meet you!`);
                console.log("New Student added!");
            } else {
                console.log(`Hey I am ${student.name}. Nice to meet you again.`);
            }

            console.log("Current Student List:");
            console.log(persons.students);
        } else if (ans.select === "exit") {
            console.log("Exiting the program...");
            process.exit();
        }
    } while (true);
}

programStart(persons);
