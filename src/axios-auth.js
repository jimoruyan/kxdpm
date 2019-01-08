import axios from 'axios'

const instance = axios.create({
  // baseURL:"https://wd8508069713buenzz.wilddogio.com/"
  baseURL:"http://www.zdsapi.com/"

})

// instance.defaults.headers.common['SOMETHING'] = 'SOMETHING'

export default instance