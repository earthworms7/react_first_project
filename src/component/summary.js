
function Summary( rewards ) {
    let SummaryList = [];
    // rewardNm : 보상명 , rewardQty : 보상수량, rewardUnit : 보상단위
    let count = 0;

    function addNUpdate (nm, unit, qty) {
        count = count + 1;

        //원건 데이터 확인
        let oriReward = SummaryList.filter((data) => {
            return data.rewardNm === nm;
        });
        
        let state = 'I';

        if (oriReward.length > 0) {  // 존재할 경우 수량 업데이트
            state = 'U';
        }
        
        let resultList = [];
        // state == I >> 추가 state == U >> 수정
        if(state === 'I') {
            resultList = SummaryList.concat([{id : count, rewardNm : nm, rewardQty : qty, rewardUnit : unit}]);
        } else if (state === 'U') {
            resultList = SummaryList.map((reward) => reward.rewardNm === nm ? { ...reward, rewardQty: reward.rewardQty+qty } : reward);
        }

        SummaryList = resultList;
    }

    
    rewards.map(content => {
        if(content.clear_check === true){
            content.reward.map(reward => {
                if(reward.clear_check === true){
                    // 골드 추가
                    addNUpdate("골드", "골드", reward.gold);

                    // 보상 추가
                    reward.item.map(item => {
                        addNUpdate(item.item, "개", item.qty);
                    });

                    if(reward.more_check === true){ //더보기 시 보상 한 번더 지급 및 더보기 골드 차감
                        // 골드 차감
                        addNUpdate("골드", "골드", -1 * reward.more_gold);
                        // 보상 추가
                        reward.item.map(item => {
                            addNUpdate(item.item, "개", item.qty);
                        });
                    }
                }
            });
        }
    });
    
    return SummaryList;
}

export default Summary ;