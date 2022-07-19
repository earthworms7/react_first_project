import React from 'react';
import styles from '../css/table.css';

const TrSummary = ({list}) => {
    let resultGold = 0;
    let resultReward = '';

    if (list.length > 0) {
        list.map(item => {
            if(item.rewardNm === '골드'){
                resultGold = resultGold + item.rewardQty;
            } else {
                resultReward = resultReward === '' ? resultReward + item.rewardNm + ' ' + item.rewardQty + item.rewardUnit 
                                                : resultReward + ' ' + item.rewardNm + ' ' + item.rewardQty + item.rewardUnit;
            }

            return (resultGold, resultReward);
        });

        return (
            <tr>  
                <td className="result_td">최종 보상</td>
                <td colSpan={4} className="result_td">
                    {resultReward}
                </td>
                <td className="result_gold_td">
                    {resultGold} 골드
                </td>

            </tr>
        );
    } else {
        return (
            <tr>
                <td colSpan={6} className="summart_no_td">검색 결과가 존재하지 않습니다.</td>
            </tr>
        );
    }
}

export default TrSummary;
