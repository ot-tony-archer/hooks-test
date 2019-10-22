const currentGitBranch = require('current-git-branch')
const pkg = require('./package')

const branch = currentGitBranch()
let protectedBranches = pkg.protectedBranches

if (protectedBranches) {
  if (typeof protectedBranches === 'string') {
    protectedBranches = [ protectedBranches ]
  } else if (!Array.isArray(protectedBranches)) {
    process.stdout.write('This branch requires tests.\n')
    process.exit(1)
  }
  if (protectedBranches.includes(branch)) {
    process.stdout.write('This branch requires tests.\n')
    process.exit(1)
  }
} else {
  process.stdout.write("No 'protectedBranches' property found in the package.json file.\n")
  process.exit(1)
}
process.stdout.write(`This branch, '${branch},' is not protected.\n`)
