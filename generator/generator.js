const readline = require("readline"); 
const type = Number(process.argv[2]);

console.log("\x1b[37m", '- tab-bomber/generator.js')

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const { promisify } = require('util');
r1.question[promisify.custom] = (question) => {
  return new Promise((resolve) => {
    r1.question(question, resolve);
  });
};

async function generator() {

if(type === 1) {
console.log("\x1b[37m", `> Создание секвенции (fox1, fox2, fox3...)`);
let prefix = await promisify(r1.question)('Укажите приставку > ');
if(prefix.length < 3 || prefix.length > 12) {
 console.log(`! Приставка должна быть от 3 до 12 символов`);
 return restart();
};
let count = Number(await promisify(r1.question)('Укажите кол-во > '));
if(count < 2 || count > 200) {
 console.log(`! Кол-во может быть от 2 до 200`);
 return restart();
};

let nicks = []; let i = 0;
while(count > 0) {
 count -= 1; i += 1;
 nicks.push(prefix + i)
};

nicks = nicks.join('\r\n');
require('fs').writeFileSync('../nicks.txt', nicks);
console.log(`! Саксес`);

return;
};


};

function restart() {
console.log('');
generator();
};

generator();
