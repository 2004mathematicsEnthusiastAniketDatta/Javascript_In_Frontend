let salesData =[
    {product: 'Laptop', price: 1_20_000, quantity: 10},
    {product: 'Desktop', price: 3_00_000, quantity: 20},
    {product: 'Mobile', price: 24_000, quantity: 30},
    {product: 'Tablet', price: 50_000, quantity: 40},
    {product: 'Smartwatch', price: 6_000, quantity: 50}
];

let initialValue = 0;
let totalSales= salesData.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.quantity, initialValue);
console.log(totalSales);
//polyfill
Array.prototype.Reduce = function(callback, initialValue){
    let accumulator = initialValue;
    for(let i=0; i<this.length; i++){
        accumulator = callback(accumulator, this[i]);
    }
    return accumulator;
}
let totalSales1 = salesData.Reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.quantity, initialValue);
console.log(totalSales1);

// let totalSales2 = salesData.Reduce((accumulator, currentValue) => 0 + currentValue.price*currentValue.quantity, 0);
// console.log(totalSales2);
// initially , let accumulator = initialValue;

"Aniket".toUpperCase().split('').reduce((accumulator, currentValue) => accumulator + currentValue, '').split('').reduce((accumulator, currentValue) => accumulator + currentValue, '');

let inventory = [
    {name: "Widget A", stock:30},
    {name: "Widget B", stock:120},
    {name: "Widget C", stock:45},
    {name: "Widget D", stock:70}
]

let lowStockItems = inventory.filter((item) => 
    { return item.stock < 50 } );
console.log(lowStockItems);

//Function Sequential Piping
/**
 * Real-world example: Custom build system for web assets
 */

// Simulated file content
const jsSourceFile = `
// main.js
import { helper } from './helper.js';

const app = {
  init() {
    console.log('App initialized');
    helper.setup();
  }
};

app.init();
`;

// Build pipeline functions
const buildSteps = {
  // Parse source code
  parseSource: (source) => {
    console.log('Parsing source code...');
    return { code: source, sourceMap: null, dependencies: [] };
  },
  
  // Detect dependencies
  findDependencies: (buildState) => {
    console.log('Finding dependencies...');
    // Simple regex to find imports (in real-world would use a proper parser)
    const importRegex = /import\s+?(?:{.*?})?\s+?from\s+?['"](.+?)['"]/g;
    const dependencies = [];
    let match;
    
    while ((match = importRegex.exec(buildState.code)) !== null) {
      dependencies.push(match[1]);
    }
    
    return { ...buildState, dependencies };
  },
  
  // Transform ES6 to ES5
  transpile: (buildState) => {
    console.log('Transpiling ES6 to ES5...');
    // Simplified transpilation (would use Babel in real world)
    let code = buildState.code
      .replace(/const/g, 'var')
      .replace(/let/g, 'var')
      .replace(/import.*?from\s+?['"](.+?)['"]/g, '// require("$1")')
      .replace(/export\s+?{(.*?)}/g, '// exports: $1');
    
    return { ...buildState, code };
  },
  
  // Minify the code
  minify: (buildState) => {
    console.log('Minifying code...');
    // Simplified minification
    const code = buildState.code
      .replace(/\s+/g, ' ')
      .replace(/\/\/.*$/gm, '')
      .trim();
    
    return { ...buildState, code, minified: true };
  },
  
  // Generate source maps
  generateSourceMap: (buildState) => {
    console.log('Generating source map...');
    const sourceMap = {
      version: 3,
      sources: ['main.js'],
      mappings: 'AAAA...' // Simplified
    };
    
    return { ...buildState, sourceMap };
  },
  
  // Create output bundle
  createBundle: (buildState) => {
    console.log('Creating bundle...');
    return {
      code: buildState.code,
      sourceMap: buildState.sourceMap,
      dependencies: buildState.dependencies,
      size: buildState.code.length,
      minified: buildState.minified
    };
  }
};

// Development build pipeline - no minification
const createDevBuild = (source) => {
  return [
    buildSteps.parseSource,
    buildSteps.findDependencies,
    buildSteps.transpile,
    buildSteps.generateSourceMap,
    buildSteps.createBundle
  ].reduce((buildState, step) => step(buildState), source);
};

// Production build pipeline - with minification
const createProdBuild = (source) => {
  return [
    buildSteps.parseSource,
    buildSteps.findDependencies,
    buildSteps.transpile,
    buildSteps.minify,
    buildSteps.generateSourceMap,
    buildSteps.createBundle
  ].reduce((buildState, step) => step(buildState), source);
};

// Build for development
console.log('=== DEVELOPMENT BUILD ===');
const devBundle = createDevBuild(jsSourceFile);
console.log(`Dev bundle size: ${devBundle.size} bytes`);
console.log(`Dependencies: ${devBundle.dependencies.join(', ')}`);

console.log('\n=== PRODUCTION BUILD ===');
const prodBundle = createProdBuild(jsSourceFile);
console.log(`Production bundle size: ${prodBundle.size} bytes`);
console.log(`Size reduction: ${((1 - prodBundle.size / devBundle.size) * 100).toFixed(2)}%`);


let userActivity = [
    {user: 'Alice',date: '2020-01-01', minutes: 30},
    {user:'Bob',date: '2020-01-02', minutes: 40},
    {user:'Charlie',date: '2020-01-03', minutes: 60},
    {user:'Charles',date: '2020-01-04', minutes: 120},
    {user:'Devin',date: '2020-01-05', minutes: 150},
];
leastUserActivity= userActivity.reduce((accumulator, currentValue) => {
    if(accumulator.minutes < currentValue.minutes){
        return accumulator;
    }else{
        return currentValue;
    }
});
let mostActiveUser = userActivity.reduce((accumulator, currentValue) => {
return currentValue.minutes > accumulator.minutes ? currentValue : accumulator;
}
);
console.log(leastUserActivity);
console.log(mostActiveUser);

