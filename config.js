const API_KEY = 'a235ec90-fefb-4ba5-a665-d4b4805c2de9'
const CLIENT_ID = 'bb959322-f530-4630-854e-c80e16eb0580'
const CLIENT_SECRET = '5203ca09-0865-4229-ba3a-f88805698835'
const BDI_TIMESTAMP = new Date().toISOString()
const SF_USERNAME = 'aldi@amalan.org'
const SF_PASSWORD = '123@Amalan123iEVzB5xSNlLfvSJ2neXP9XVo'

const config = {
    "development": {
        BASE_URL : 'https://sandbox.danamon.co.id',
        API_KEY : API_KEY,
        CLIENT_ID : CLIENT_ID,
        CLIENT_SECRET : CLIENT_SECRET,
        BDI_SIGNATURE : 'f4e4d374c813fd1689bdb1bf1f51653f',
        BDI_TIMESTAMP : BDI_TIMESTAMP,
        SF_USERNAME : SF_USERNAME,
        SF_PASSWORD : SF_PASSWORD
    },
    "production": {
        BASE_URL : '',
        API_KEY : API_KEY,
        CLIENT_ID : CLIENT_ID,
        CLIENT_SECRET : CLIENT_SECRET,
        BDI_SIGNATURE : 'f4e4d374c813fd1689bdb1bf1f51653f',
        BDI_TIMESTAMP : BDI_TIMESTAMP,
        SF_USERNAME : SF_USERNAME,
        SF_PASSWORD : SF_PASSWORD
    }
}

module.exports = config.development