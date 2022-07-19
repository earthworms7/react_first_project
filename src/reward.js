{/* 레이드 별 보상정보 */}

const Reward = [
    /* 아이라 노말 하드 */

    /* 프라바사 노말 하드 */

    /* 아르고스 123 */

    /* 군단장 */
    {
        id: 4, title: '군단장 레이드 : \'마수군단장 발탄\' [노말]', group: 'MB', level: [{id: 1}, {id: 2}], clear_check: false,
        reward: [
                    {id: 1, item: [{id: 1, item: '마수의 힘줄', qty: 3}, {id: 2, item: '마수의 뼈', qty: 1}], gold: 500, more_gold: 500, more_check: false, clear_check: false}, 
                    {id: 2, item: [{id: 1, item: '마수의 힘줄', qty: 3}, {id: 2, item: '마수의 뼈', qty: 2}], gold: 2000, more_gold: 800, more_check: false, clear_check: false}
                ],
        enterLevel: 1415
    },
    {
        id: 5, title: '군단장 레이드 : \'욕망군단장 비아키스\' [노말]', group: 'YB', level: [{id: 1}, {id: 2}, {id: 3}], clear_check: false,
        reward: [
            {id: 1, item: [{id: 1, item: '욕망의 송곳니', qty: 2}, {id: 2, item: '욕망의 날개', qty: 1}], gold: 500, more_gold: 400, more_check: false, clear_check: false}, 
            {id: 2, item: [{id: 1, item: '욕망의 송곳니', qty: 2}, {id: 2, item: '욕망의 날개', qty: 1}], gold: 600, more_gold: 600, more_check: false, clear_check: false},
            {id: 3, item: [{id: 1, item: '욕망의 송곳니', qty: 2}, {id: 2, item: '욕망의 날개', qty: 1}], gold: 1400, more_gold: 800, more_check: false, clear_check: false}
        ],
        enterLevel: 1430
    },
    {
        id: 6, title: '군단장 레이드 : \'마수군단장 발탄\' [하드]', group: 'MB', level: [{id: 1}, {id: 2}], clear_check: false,
        reward: [
            {id: 1, item: [{id: 1, item: '마수의 뼈', qty: 3}], gold: 1000, more_gold: 900, more_check: false, clear_check: false}, 
            {id: 2, item: [{id: 1, item: '마수의 뼈', qty: 3}], gold: 3500, more_gold: 1200, more_check: false, clear_check: false}
        ],
        enterLevel: 1445
    },
    {
        id: 7, title: '군단장 레이드 : \'욕망군단장 비아키스\' [하드]', group: 'YB', level: [{id: 1}, {id: 2}, {id: 3}], clear_check: false,
        reward: [
            {id: 1, item: [{id: 1, item: '욕망의 날개', qty: 2}], gold: 1000, more_gold: 700, more_check: false, clear_check: false}, 
            {id: 2, item: [{id: 1, item: '욕망의 날개', qty: 2}], gold: 1000, more_gold: 900, more_check: false, clear_check: false},
            {id: 3, item: [{id: 1, item: '욕망의 날개', qty: 2}], gold: 2500, more_gold: 1200, more_check: false, clear_check: false}
        ],
        enterLevel: 1460
    },
    {
        id: 8, title: '군단장 레이드 : \'광기군단장 쿠크세이튼\' [노말]', group: 'GK', level: [{id: 1}, {id: 2}, {id: 3}], clear_check: false,
        reward: [
            {id: 1, item: [{id: 1, item: '광기의 나팔', qty: 1}], gold: 1000, more_gold: 800, more_check: false, clear_check: false},
            {id: 2, item: [{id: 1, item: '광기의 나팔', qty: 2}], gold: 1000, more_gold: 1000, more_check: false, clear_check: false},
            {id: 3, item: [{id: 1, item: '광기의 나팔', qty: 2}], gold: 2500, more_gold: 1300, more_check: false, clear_check: false}
        ],
        enterLevel: 1475
    },
    {
        id: 9, title: '군단장 레이드 : \'몽환군단장 아브렐슈드\' [노말]', group: 'MA', level: [{id: 1}, {id: 2}], clear_check: false,
        reward: [
            {id: 1, item: [{id: 1, item: '몽환의 뿔', qty: 3}], gold: 2000, more_gold: 400, more_check: false, clear_check: false}, 
            {id: 2, item: [{id: 1, item: '몽환의 뿔', qty: 4}], gold: 2500, more_gold: 600, more_check: false, clear_check: false}
        ],
        enterLevel: 1490
    },
    {
        id: 10, title: '군단장 레이드 : \'몽환군단장 아브렐슈드\' [노말]', group: 'MA', level: [{id: 3}, {id: 4}], clear_check: false,
        reward: [
            {id: 3, item: [{id: 1, item: '몽환의 뿔', qty: 3}], gold: 700, more_gold: 700, more_check: false, clear_check: false}, 
            {id: 4, item: [{id: 1, item: '몽환의 뿔', qty: 4}], gold: 800, more_gold: 800, more_check: false, clear_check: false}
        ],
        enterLevel: 1500
    },
    {
        id: 11, title: '군단장 레이드 : \'몽환군단장 아브렐슈드\' [노말]', group: 'MA', level: [{id: 5}, {id: 6}], clear_check: false,
        reward: [
            {id: 5, item: [{id: 1, item: '몽환의 뿔', qty: 3}], gold: 1000, more_gold: 900, more_check: false, clear_check: false}, 
            {id: 6, item: [{id: 1, item: '몽환의 뿔', qty: 5}], gold: 1500, more_gold: 100, more_check: false, clear_check: false}
        ],
        enterLevel: 1520
    },
    {
        id: 12, title: '군단장 레이드 : \'몽환군단장 아브렐슈드\' [하드]', group: 'MA', level: [{id: 1}, {id: 2}], clear_check: false,
        reward: [
            {id: 1, item: [{id: 1, item: '몽환의 사념', qty: 3}], gold: 2500, more_gold: 700, more_check: false, clear_check: false}, 
            {id: 2, item: [{id: 1, item: '몽환의 사념', qty: 4}], gold: 3000, more_gold: 800, more_check: false, clear_check: false}
        ],
        enterLevel: 1540
    },
    {
        id: 13, title: '군단장 레이드 : \'몽환군단장 아브렐슈드\' [하드]', group: 'MA', level: [{id: 3}, {id: 4}], clear_check: false,
        reward: [
            {id: 3, item: [{id: 1, item: '몽환의 사념', qty: 3}], gold: 900, more_gold: 900, more_check: false, clear_check: false}, 
            {id: 4, item: [{id: 1, item: '몽환의 사념', qty: 4}], gold: 1100, more_gold: 1100, more_check: false, clear_check: false}
        ],
        enterLevel: 1550
    },
    {
        id: 14, title: '군단장 레이드 : \'몽환군단장 아브렐슈드\' [하드]', group: 'MA', level: [{id: 5}, {id: 6}], clear_check: false,
        reward: [
            {id: 5, item: [{id: 1, item: '몽환의 사념', qty: 3}], gold: 1200, more_gold: 1100, more_check: false, clear_check: false}, 
            {id: 6, item: [{id: 1, item: '몽환의 사념', qty: 5}], gold: 1800, more_gold: 1400, more_check: false, clear_check: false}
        ],
        enterLevel: 1560
    },
];

export default Reward;