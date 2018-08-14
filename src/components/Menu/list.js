export default [{
        id: "0",
        name: "商家认证",
        path: "finance",
        icon: "resource",
        children: [{
                id: 1,
                name: "商家资质",
                path: "aptitude",
                icon: "resource",
                children: []
            },
            {
                id: 2,
                name: "店铺信息",
                path: "store",
                icon: "resource",
                children: []
            },

        ]
    },
    {
        id: "1",
        name: "boss圈",
        path: "invitation",
        icon: 'resource',
        children: [
            { id: 0, name: "帖子管理", path: 'examine', icon: 'resource', children: [] }
        ]
    }

];