const currentGitBranch = require('current-git-branch')
const pkg = require('./package')

const branch = currentGitBranch()
let continueIfBranch = pkg['continue-if-branch']

if (continueIfBranch) {
  if (typeof continueIfBranch === 'string') {
    continueIfBranch = [ continueIfBranch ]
  } else if (!Array.isArray(continueIfBranch)) {
    // not a string and not an array, not set up
    process.stdout.write("The 'continue-if-branch' property in the package.json file should be a string or an array.\n")
    process.exit(1)
  }
  if (continueIfBranch.includes(branch)) {
    process.stdout.write(`${branch} matches the test condition(s).\n`)
    process.exit(0)
  }
} else {
  process.stdout.write("No 'continue-if-branch' property found in the package.json file.\n")
  process.exit(1)
}
