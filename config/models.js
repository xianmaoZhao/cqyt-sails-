module.exports.models = {
    schema: true, //严格匹配数据表的模式,
    migrate: 'alter', //在尽量不丢失数据的情况下，允许sails修改表的结构
    attributes: {
        createdAt: { type: 'number', autoCreatedAt: true, },
        updatedAt: { type: 'number', autoUpdatedAt: true, },
        id: { type: 'number', autoIncrement: true, },


    },
    dataEncryptionKeys: {
        default: 'bDg64BbxqEQqvjXg+9umxASD8aMeRfoPkL3zNPzyc8Q='
    },
    cascadeOnDestroy: true
};