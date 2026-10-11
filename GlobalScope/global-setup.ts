
// global-setup.ts

function generateRandomNumber(length: number): string {
  return Math.floor(
    Math.random() * Math.pow(10, length)
  )
    .toString()
    .padStart(length, '0');
}

async function globalSetup() {
  const projectNoPart1 = generateRandomNumber(4);
  const projectNoPart2 = generateRandomNumber(4);

  const uniqueProjectNo = `${projectNoPart1}-${projectNoPart2}`;

  process.env.UniqueProject_ID = uniqueProjectNo;

  console.log(`Project ID: ${uniqueProjectNo}`);
}

export default globalSetup;