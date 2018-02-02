var fork = require('child_process').fork;
var fs = require('fs');
// nodemon bin/www node服务自动重启
fis.set('namespace', 'logsite');

var PATH = '../dist';// 打包默认目录

fis.match('*', {
  deploy: fis.plugin('local-deliver', {
    to: PATH
  })
})

// 设置 *.scss 配置配置项
fis.match('*.css', {
    rExt: '.css',
    useHash: false,
    parser: fis.plugin('node-sass', {
 
    })
});

fis.match('*.css', {
  postprocessor: fis.plugin('postcss', {
    autoprefixer: true
  })
});




fis.match('/public/js/**.js', {
  parser: fis.plugin('babel-5.x',{
    stage:3
  })
})


//处理打包
fis.match('/public/**.js', {
  useHash: false
})
.match('/public/**.css', {
  useSprite: true,
  useHash: false
})




//发布产品库
fis.media('prod').match('/public/**.js', {
    optimizer: fis.plugin('uglify-js')
})
.match('/public/**.css', {
    optimizer: fis.plugin('clean-css', {
        'keepBreaks': true //保持一个规则一个换行
    })
});




var work;
fs.watch('./src',()=>{
  console.log('aaaa');
  work.kill();
  work = fork('bin/www');
})

fis.release({},(ret)=>{
  console.log('编译结束')
  work = fork('bin/www');
})
