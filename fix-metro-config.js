// load the module.
const replaceInFile = require('replace-in-file')
// path for metro config file.
const METRO_CONFIG_PATH =
  "./node_modules/metro-config/src/defaults/blacklist.js"
// options for editing the file.
const options = [
  { from: "modules[/", to: "modules[\\/" },
  { from: "react[/", to: "react[\\/" },
  { from: "dist[/", to: "dist[\\/" }
]

try {
  // looping on each option
  options.forEach((option, index) => {
    // append the files key for each option.
    const [{ hasChanged }] = replaceInFile.sync({
      ...option,
      files: METRO_CONFIG_PATH
    })
    // logger.
    console.log(
      `The iteration number ${index + 1} handled with status ${hasChanged}`
    )
  })
} catch (error) {
  // logger.
  console.error("Error occurred:", error)
}