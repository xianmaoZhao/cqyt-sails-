// 根据标签名称进行事件代理
// 父 事件 代理对象
function agent1(parentId, eventType, label, fun) {
    let oParent = document.getElementById(parentId);
    oParent['on' + eventType] = function(e) {
        e.stopPropagation();
        let child = e.target; //目标
        label = label.toUpperCase();
        // child.nodeName 目标名字
        // 未找到标签，未找到顶级对象
        while (child.nodeName != label && child.nodeName != oParent.nodeName) {
            // 找到父节点
            child = child.parentNode;
        }
        if (child.nodeName === label) {
            // 将方法赋给孩子
            fun.call(child)
        }
    }


}

// 根据类名
function agent2(parentId, eventType, clsName, fun) {
    let oParent = document.getElementById(parentId);
    oParent['on' + eventType] = function(e) {
        let child = e.target; //目标
        // label = label.toUpperCase();
        // child.nodeName 目标名字
        // 未找到标签，未找到顶级对象
        while (child.className != clsName && child.nodeName != oParent.nodeName) {
            child = child.parentNode;
        }
        if (child.className === clsName) {
            // 将方法赋给孩子
            fun.call(child)
        }
    }

}

//多个class代理  classList
function agent3(parentId, eventType, clsName, fun) {
    let oParent = document.getElementById(parentId);
    oParent['on' + eventType] = function(e) {
        let child = e.target; //目标
        // label = label.toUpperCase();
        // child.nodeName 目标名字
        // 未找到标签，未找到顶级对象
        while (!child.classList.contains(clsName) && child.nodeName != oParent.nodeName) {
            child = child.parentNode;
        }
        if (child.classList.contains(clsName)) {
            // 将方法赋给孩子
            fun.call(child)
        }
    }

}


// 清除className
// 父级，子级（代理对象），清除的样式名字
function clearCls(parentId, label, className) {
    let oParent = document.getElementById(parentId);
    let aLabel = oParent.querySelectorAll(label);
    for (let i = 0; i < aLabel.length; i++) {
        if (aLabel[i].className === className) {
            aLabel[i].className = '';
            break;
        }
    }
}