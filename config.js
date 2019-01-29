const API_KEY = 'a235ec90-fefb-4ba5-a665-d4b4805c2de9'
const CLIENT_ID = 'bb959322-f530-4630-854e-c80e16eb0580'
const CLIENT_SECRET = '5203ca09-0865-4229-ba3a-f88805698835'
const BDI_TIMESTAMP = new Date().toISOString()
const SF_USERNAME = 'aldi@amalan.org'
const SF_PASSWORD = '123@Amalan123iEVzB5xSNlLfvSJ2neXP9XVo'
const AC_API_ID = 'ea34f205dd5c9d6638bf194f11ec0d18'
const AC_API_TOKEN = '5270d0f51bd9b431a2f2e2709e2b5f85'

const config = {
    "development": {
        BASE_URL: 'https://sandbox.danamon.co.id',
        API_KEY: API_KEY,
        CLIENT_ID: CLIENT_ID,
        CLIENT_SECRET: CLIENT_SECRET,
        BDI_SIGNATURE: 'f4e4d374c813fd1689bdb1bf1f51653f',
        BDI_TIMESTAMP: BDI_TIMESTAMP,
        SF_USERNAME: SF_USERNAME,
        SF_PASSWORD: SF_PASSWORD,
        AC_API_ID: AC_API_ID,
        AC_API_TOKEN: AC_API_TOKEN
    },
    "production": {
        BASE_URL: '',
        API_KEY: API_KEY,
        CLIENT_ID: CLIENT_ID,
        CLIENT_SECRET: CLIENT_SECRET,
        BDI_SIGNATURE: 'f4e4d374c813fd1689bdb1bf1f51653f',
        BDI_TIMESTAMP: BDI_TIMESTAMP,
        SF_USERNAME: SF_USERNAME,
        SF_PASSWORD: SF_PASSWORD,
        AC_API_ID: AC_API_ID,
        AC_API_TOKEN: AC_API_TOKEN
    }
}

module.exports = config.development