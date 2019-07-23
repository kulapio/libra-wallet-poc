const axios = require('axios')

async function recordStat (stats) {
  axios.post('https://libraservice3.kulap.io/recordStats', {
    stats: stats
  })
}

export default recordStat
