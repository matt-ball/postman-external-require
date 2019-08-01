const express = require('express')
const app = express()
const childProcess = require('child_process')

app.get('/', (req, res) => {
  try {
    const packages = req.query.packages.split(',')
    const browserify = require('browserify')()

    for (let i = 0; i < packages.length; i++) {
      const pkg = packages[i]

      childProcess.execSync(`npm install ${pkg}`)
      browserify.require(pkg)
    }

    browserify.bundle((err, buf) => {
      if (err) console.log(err)
      res.send(buf.toString())
    })
  } catch (e) {
    res.send('Something went wrong!')
  }
})

app.listen(3000, () => console.log(`Running!`))
