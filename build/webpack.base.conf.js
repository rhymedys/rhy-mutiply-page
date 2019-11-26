const fs = require("fs");
const path = require("path");
const VueLoader = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const log = require('./log')


log.yellowLog('=====current_env=======')
log.yellowLog(process.env)
log.greenLog('=====argv=======')
log.greenLog(process.argv)





const toPackPage = []

try {
  let npmConfigArgv = process.env.npm_config_argv
  npmConfigArgv = JSON.parse(npmConfigArgv)

  npmConfigArgv = npmConfigArgv.original.splice(2)
  npmConfigArgv.forEach(val => {
    toPackPage.push(val.replace(/^\-/, ''))
  })

  log.greenLog('=====config argv=======')
  log.greenLog(npmConfigArgv)

} catch (error) {

}
log.greenLog('=====toPackPage=======')
log.greenLog(toPackPage)

const mode = process.env.NODE_ENV;
const devMode = mode === "development";

const pagesDirPath = path.resolve(__dirname, "../src/pages");


const getToBuildPage = () => {
  let result = []
  if (!toPackPage.length || devMode) {
    result = fs.readdirSync(pagesDirPath);
  } else {
    result = toPackPage
  }

  return result
}

/**
 * 通过约定，降低编码复杂度
 * 每新增一个入口，即在src/pages目录下新增一个文件夹，以页面名称命名，内置一个index.js作为入口文件
 * 通过node的文件api扫描pages目录
 * 这样可以得到一个形如{page1: "入口文件地址", page2: "入口文件地址", ...}的对象
 */
const getEntries = () => {

  let entry = {};
  const result = getToBuildPage()


  result.forEach(item => {
    entry[item] = path.resolve(__dirname, `../src/pages/${item}/index.js`);
  });
  return entry;
}

// getEntries();
/**
 * 扫描pages文件夹，为每个页面生成一个插件实例对象
 */
const generatorHtmlWebpackPlugins = () => {
  const arr = [];
  const fileNames = []
  const result = getToBuildPage()
  result.forEach(item => {
    //判断页面目录下有无自己的index.html
    let templatePath;
    let selfTemplatePath = pagesDirPath + `/${item}/index.html`;
    let publicTemplatePath = path.resolve(__dirname, "../src/public/index.html");
    try {
      fs.accessSync(selfTemplatePath);
      templatePath = selfTemplatePath;
    } catch (err) {
      templatePath = publicTemplatePath;
    }

    let distSrc = !devMode ? `${item}/` : ''

    distSrc += `${item}`

    const filename = `${distSrc}${devMode ? '' : '.html'}`

    fileNames.push(
      filename
    )

    arr.push(
      new HtmlWebpackPlugin({
        template: templatePath,
        filename,
        chunks: ['manifest', "vendor", item]
      })
    );


  });


  // if(!devMode){
  //     arr.push(
  //         new PreloadWebpackPlugin({
  //             excludeHtmlNames:fileNames
  //         })
  //     )
  // }
  return arr;
}

const getJsModuleRules = () => {
  const res = {
    test: /\.js$/,
    use: [
      'babel-loader',

    ]
  }

  if (!devMode) {
    res.use.unshift({
      loader: 'rhy-chunkfilename-loader',
      options: {
        appPageRoot: path.join('src', 'pages')
      }
    })
  }

  return res
}

const getVueModuleRules = () => {
  const res = {
    test: /\.vue$/,
    use: [
      "vue-loader",
    ]
  }


  return res
}

module.exports = {
  mode,
  entry: getEntries(),
  output: {
    publicPath: devMode ? "" : "/",
    filename: devMode ? "[name].js" : "[name]/static/js/[name].[chunkhash].js",
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: !devMode ? '[name].[chunkhash].js' : undefined
  },
  module: {
    rules: [
      getJsModuleRules(),
      getVueModuleRules(),
      {
        test: /\.(le|sc|sa|c)ss$/,
        use: [
          devMode ? "style-loader" : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (file, context) => {
                let mapFileDir = file.replace(/.*pages\\/, '')
                // console.log('file-loader', mapFileDir.match(/page.*?\\assets/))

                mapFileDir = mapFileDir.replace(/\\index.*/, '')


                const res = path.join(__dirname, '../', 'dist', `${mapFileDir.replace(/\..*?$/, '')}`, 'static', 'css', '/')

                log.blueLog(`MiniCssExtractPlugin.loader input: ${file} \n output:${res}`)

                return res
              }
            }
          },
          "css-loader",
          "sass-loader",
          "less-loader",
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: "file-loader",
          options: {
            limit: 8192,
            name(file) {
              let mapFileDir = file.replace(/.*pages(\\|\/)/, '')
              // console.log('file-loader', mapFileDir.match(/page.*?\\assets/))

              mapFileDir = mapFileDir.replace(/(\\|\/)assets.*/, '')

              // console.log(mapFileDir)

              if (devMode) {
                return "[name].[hash:8].[ext]"
              } else {
                log.blueLog(`file-loader  output:${mapFileDir}`)
                return `${mapFileDir}/static/images/[name].[hash:8].[ext]`
              }
            },
          }
        }]
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve('src'), path.resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    ]
  },
  plugins: [
    new VueLoader(),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      // chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
      moduleFilename: (obj) => {
        console.log('MiniCssExtractPlugin.moduleFilename', obj.name)
        if (devMode) {
          return `${obj.id}.css`
        }
        return `./${obj.name}/static/css/${obj.id}.${obj.hash}.css`
      }
    }),
    // new CleanWebpackPlugin(path.resolve(__dirname, "../dist")),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "../src/public/static"),
      to: path.resolve(__dirname, "../dist/static")
    }]),
    ...generatorHtmlWebpackPlugins(),
    // new HtmlWebpackPlugin()
  ],
  resolve: {
    extensions: [".js", ".vue"]
  }
}
