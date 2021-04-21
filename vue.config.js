module.exports = {
    devServer: {
      port: 8081,
      proxy: {
        "/api/" : {
          target: "https://ksmart-springboot-mongodb.herokuapp.com/",
          logLevel: "debug"
        }
      }
    },
/*
    publicPath: process.env.NODE_ENV === 'production'
    ? '/kSmart-web/'
    : '/'
 */   
  }