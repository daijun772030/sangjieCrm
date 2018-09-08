export default [{
        id: "0",
        name: "商家认证",
        path: "finance",
        icon: "resource",
        children: [{
            id: 0,
            name: "商家资质详情",
            path: "aptitude",
            icon: "resource"
        }]
    },
    {
        id: "1",
        name: "boss圈",
        path: "invitation",
        icon: 'resource',
        children: [
            { id: 0, name: "帖子管理", path: 'examine', icon: 'resource', children: [] }
        ]
    },
    {
        id: '2',
        name: '耗材管理',
        path: 'material',
        icon: 'resource',
        children: [
            { id: 1, name: "待接单", path: "take", icon: "resource" },
            { id: 2, name: "待发货", path: "deliver", icon: "resource" },
            { id: 3, name: "已完成", path: "accomplish", icon: "resource" },
            { id: 4, name: "退款", path: "refunded", icon: "resource" },
            { id: 5, name: "商品管理", path: "upshop", icon: "resource" },
            { id: 6, name: "活动管理", path: "activity", icon: "resource" },
            { id: 7, name: " 财务管理", path: "consumable", icon: "resource" }
        ]
    },
    {
        id: '3',
        name: '商家订单管理',
        path: 'shopOrder',
        icon: 'resource',
        children: [
            { id: 1, name: "订单管理", path: "orderSystem", icon: "resource" },
            { id: 2, name: "财务管理", path: "financial", icon: "resource" }
        ]
    },
    {
        id: '4',
        name: '退款管理',
        path: 'refund',
        icon: 'resource',
        children: [
            { id: 1, name: "商家退款", path: "refundOrder", icon: "resource" }
        ]
    },
    {
        id: '5',
        name: '添加商品类型',
        path: 'addShop',
        icon: 'resource',
        children: [
            { id: 1, name: "添加洗衣类型", path: "addShopType", icon: "resource" },
            { id: 2, name: "添加耗材类型", path: "addConsumable", icon: "resource" }
        ]
    }

];