// @ts-ignore: prompt-sync has no type declarations

const promptSync = require("prompt-sync");
const promptFn = promptSync();

//const inputString = promptFn("Enter a string: ");

const numberOfWords = parseInt(promptFn("Enter the number of words: "));
if (numberOfWords < 0)

    //then
    {
    console.log("IT IS A NEGATIVE integer.");
} else{
    console.log("IT IS A POSITIVE integer.");
}
