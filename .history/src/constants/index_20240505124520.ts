export const NAV_SHORT_LENGTH = '70px';
export const NAV_LONG_LENGTH = '170px';

export const NAV_LIST = [
    {
        name: '推荐',
        path: '/',
    },
    {
        name: '影视',
        path: '/?keyword=影视',
    },
    {
        name: '游戏',
        path: '/?keyword=游戏',
    },
    {
        name: '旅游',
        path: '/?keyword=旅游',
    },
    {
        name: '美食',
        path: '/?keyword=美食',
    },
    {
        name: '我的',
        path: `/user-info/${JSON.parse(localStorage.getItem('userInfo')||'{"id":0}').id}`,
    }
];

export const SEARCH_HISTORY_LIST = [
    {
        id: 1,
        name: '周杰伦',
    },
    {
        id: 2,
        name: '薛之谦的名场面',
    },
    {
        id: 3,
        name: '一口气看完',
    },
    {
        id: 4,
        name: '过年',
    },
    {
        id: 5,
        name: '搜索历史',
    },
    {
        id: 6,
        name: '搜索历史1',
    },
    {
        id: 7,
        name: '林俊杰的江南',
    },
    {
        id: 8,
        name: '搜索2',
    },
    {
        id: 9,
        name: '搜123jklj啊手机给大家看ijkjsad就看见就看啥丢哦i阿达i偶哦屁哦iui哦而且我尽快汇款举报',
    },
    {
        id: 10,
        name: '代码不想写了',
    }
];