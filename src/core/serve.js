import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})

export default{
    post(data){
        return instance.post('/post',data)
    },
    get() {
        return instance.get('/get')
    },
    save(data){
        return instance.post('/save',data)
    }
}