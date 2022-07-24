module.exports = {

    index: async function(req, res) {
        res.view({
            layout: false,
        });
    },
    addNotice: async function(req, res) {
        //接收前端发送的数据
        let obj = req.allParams();
        let record = await Notice.create(obj).fetch();
        res.json(record);
        //显示在终端
        // console.log(obj);
        //返回给前端log
        // res.json('ok');
    },
    
    getCars: async function(req, res) {
        let curPage = req.query.curPage;
        let arr = await Lbt.find().sort('id desc').skip(curPage * 4).limit(4);
        arr = arr.map(el => {
            let d = new Date(el.updatedAt);
            el.date = d.getFullYear() + '/' + (d.getMonth() + 1) + "/" + d.getDate();
            return el
        })
        res.json(arr)
    },
    delCar: async function(req, res) {
        let id = req.query.id;
        let arr = await Lbt.destroy({ id }).fetch();
        if (arr.length === 1) {
            res.json(true)
        } else {
            res.json(false)
        }
    },
    getCarNum: async function(req, res) {
        let num = await Lbt.count();
        res.json(num)
    },
    ediUSer: async function(req, res) {
        let obj = req.allParams();
        let rows = await userLogin.update(
            //找到的条件
            { id: obj.id },
            //修改的数据
            { name:obj.name }
        ).fetch();
        res.json(rows);
    },
    findUserEditor: async function(req, res) {
        let id = req.query.id;
        let rows = await userLogin.find({ id });
        res.json(rows);
    },
    searchUser: async function(req, res) {
        let obj = req.query.searchUser;
        // console.log(obj);
        const rows = await userLogin.find({
            //模糊查询
            loginname: {
                'contains': obj
            }
        });
        res.json(rows);
    },
    searchList: async function(req, res) {
        let obj = req.query.searchValue;
        // console.log(obj);
        const rows = await Notice.find({
            //模糊查询
            title: {
                'contains': obj
            }
        });
        res.json(rows)
    },
    findListEditor: async function(req, res) {
        let id = req.query.id;
        let rows = await Notice.find({ id });
        res.json(rows);
    },
    ediNotice: async function(req, res) {
        let obj = req.allParams();
        let rows = await Notice.update(
            //找到的条件
            { id: obj.id },
            //修改的数据
            { title: obj.title, source: obj.source, content: obj.content }
        ).fetch();
        res.json(rows);
    },
    addImage: async function(req, res) {
        req.file('image').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/newImage')
            },
            function(err, files) {
                if (err)
                    return res.serverError(err);
                let path = files[0].fd.split('\\');
                filename = path[path.length - 1];
                res.json(filename);
            });
    },
    addImageLbt: async function(req, res) {
        req.file('lbt').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/lbtImage')
            },
            async function(err, files) {
                if (err)
                    return res.serverError(err);
                let path = files[0].fd.split('\\');
                filename = path[path.length - 1];
                let obj = {};
                obj.img = filename;
                let record = await Lbt.create(obj).fetch();
                res.json(record);
                // res.json(filename);
            });
    },
    addNew: async function(req, res) {
        req.file('small').upload({
                dirname: require('path').resolve(sails.config.appPath, 'assets/smallImage')
            },
            async function(err, files) {
                if (err)
                    return res.serverError(err);
                let path = files[0].fd.split('\\');
                filename = path[path.length - 1];
                //接收前端发送的数据
                let obj = req.allParams();
                obj.small = filename;
                let record = await News.create(obj).fetch();
                res.json(record);
            });

    },
    deleteName:async function(req, res) {
        req.session.userId ='';
        res.json('ok');
    },

    

};