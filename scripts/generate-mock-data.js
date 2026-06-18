const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../src/data/mock-data.csv');
const outPath = path.join(__dirname, '../src/data/mock-data.generated.ts');

const csv = fs.readFileSync(csvPath, 'utf8');
const escaped = csv.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

const output = `// Auto-generated from mock-data.csv — run \`npm run generate-data\` after editing the CSV.
export const MOCK_CSV = \`${escaped}\`;
`;

fs.writeFileSync(outPath, output);
console.log('Generated src/data/mock-data.generated.ts');
