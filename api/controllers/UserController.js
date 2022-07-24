module.exports = {
        search: async function(req, res) {
    //keyword input的name ，先获取表单的值
        const keyword = req.query.keyword;
    //将表单的值存入session
        req.session.keyword = keyword
        res.view();
    },
    getSearch: async function(req, res) {
        //取出session的值
        const keyword = req.session.keyword;
        let arr = [];

        const news = await News.find({ title: { contains: keyword } }).sort('id desc');
        news.forEach(el => {
            let date = new Date(el.createdAt).toLocaleDateString();
            arr.push({ id: el.id, title: el.title, date, detailName: 'detail', source: el.source })
        })

        const notices = await Notice.find({ title: { contains: keyword } }).sort('id desc');
        notices.forEach(el => {
            let date = new Date(el.createdAt).toLocaleDateString();
            arr.push({ id: el.id, title: el.title, date, detailName: 'list', source: el.source })
        })

        res.json(arr);
    },
    index: async function(req, res) {
        let newData = await News.find().sort("id desc").limit(1);
        // console.log(newData);
        let newObj = { title: newData[0].title, id: newData[0].id };
        newObj.small = newData[0].small;
        newObj.p0 = newData[0].content.match(/<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/gi)[0];
        newObj.p1 = newData[0].content.match(/<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/gi)[1];
        newObj.p2 = newData[0].content.match(/<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/gi)[2];
        newObj.src0 = newData[0].content.match(/<img[^>]+src=['"]([^'"]+)['"]+/g)[0];
        newObj.src1 = newData[0].content.match(/<img[^>]+src=['"]([^'"]+)['"]+/g)[1];
        // console.log(newObj.src0);
        // console.log(newObj.small);
        let lbtImg = await Lbt.find().sort("id desc").limit(3);
        lbtImg.lbt0 = lbtImg[0].img;
        lbtImg.lbt1 = lbtImg[1].img;
        lbtImg.lbt2 = lbtImg[2].img;

        res.view({ newOne: newObj, newTwo: lbtImg });
    },
    getlist: async function(req, res) {
        let listData = await Notice.find().sort('id desc').limit(5);
        res.json(listData);
    },
    getNotice: async function(req, res) {
        let curPage = req.query.curPage;
        let arr = await Notice.find().sort('id desc').skip(curPage * 5).limit(5);
        res.json(arr)
    },
    getNoticeNum: async function(req, res) {
        let num = await Notice.count();
        res.json(num)
    },
    list: async function(req, res) {
        let newData = await Notice.find().sort("id desc").limit(5);
        let newObj = [];
        for (let i = 0; i < newData.length; i++) {
            newObj[i] = { title: newData[i].title, content: newData[i].content };
            newObj[i].timer = createDate(newData[i].createdAt)
        }
        // console.log(newObj);
        // res.json(newObj);
        res.view({ newObj });
    },
    getdetail: async function(req, res) {
        let detailData = await Notice.find().sort('id desc').limit(1);
        res.json(detailData);
    },
    detail: async function(req, res) {

        let newData = await News.find().sort("id desc").limit(1);
        let newObj = { title: newData[0].title, id: newData[0].id };
        newObj.p0 = newData[0].content.match(/<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/gi)[0];
        newObj.p1 = newData[0].content.match(/<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/gi)[1];
        newObj.p2 = newData[0].content.match(/<p[^>]*>(?:(?!<\/p>)[\s\S])*<\/p>/gi)[2];
        newObj.src0 = newData[0].content.match(/<img[^>]+src=['"]([^'"]+)['"]+/g)[0];
        newObj.src1 = newData[0].content.match(/<img[^>]+src=['"]([^'"]+)['"]+/g)[1];
        res.view({ newOne: newObj });
    },

    //------------------------------------------------------------------------------------------------------
    getUserZhLogin: async function(req, res) {
        let loginData = await userLogin.find().sort('id desc');
        res.json(loginData);
    },

    //接收从前端的数据，发给数据库，将结果发给前端
    addUserLogin: async function(req, res) {
        //接收数据
        let obj = req.allParams();
        let record = await userLogin.create(obj).fetch();
        res.json(record);
    },
    //从数据库收取数据，前端通过$.getJSON('/user/getLogin', function(result) {}获取后台收取的数据
    getUserLogin: async function(req, res) {
        let loginData = await userLogin.find().sort('id desc');
        res.json(loginData);
    },

    login: async function(req, res) {
        let captcha = require("svg-captcha").create();
        req.session.yzmText = captcha.text;
        res.view({ layout: false, imgData: captcha.data });
    },
    getYzm: async function(req, res) {
        let captcha = require("svg-captcha").create();
        req.session.yzmText = captcha.text;
        res.json(captcha.data);
    },
    dl:async function(req, res) {
        let obj = req.allParams();
        let objYzm=obj.yzm.toLowerCase();
        delete obj.yzm;
        let reqYzm=req.session.yzmText.toLowerCase();
        try {
            let user=await userLogin.find({loginname:obj.loginname,loginpass:obj.loginpass});
            if(objYzm===reqYzm) {
                if(obj.loginname==='admin'&&obj.loginpass==='123'){
                    req.session.userId = 'admin'
                    res.json('2')
                }else{
                    if(obj.loginname==user[0].loginname && obj.loginpass==user[0].loginpass){
                        req.session.userId = user[0].name;
                        res.json('3')
                    }else{
                        res.json('4')
                    }
                }
            }else{
                res.json('1');
            }
        } catch (error) {
            res.json('5')
        }
        
    },
    getname:async function(req, res) {
       let name=req.session.userId
        res.json(name)
    },
    deleteName:async function(req, res) {
        req.session.userId ='';
        res.json('ok');
    },
    Newpass: async function(req, res) {
        let obj = req.allParams();
        let newPass=obj.xloginpass;
        try {
            let user=await userLogin.find({loginname:obj.yloginname,loginpass:obj.yloginpass});
            if(obj.yloginname===user[0].loginname && obj.yloginpass===user[0].loginpass){
            let rows = await userLogin.update(
                //找到的条件
                { id: user[0].id },
                //修改的数据
                { loginpass:newPass }
            ).fetch();
            res.json('1')
            }else{
                res.json('2')
            }
        } catch (error) {
            res.json('3')
        }
       
       
    },
};

function createDate(t) {
    let d = new Date(t);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}