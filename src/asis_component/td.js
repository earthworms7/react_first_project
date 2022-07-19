import styles from './css/table.css';
import { SummaryList, Summary } from './summary.js';

/* 최종 보상 데이터 저장용 함수 */
function summary_data_set (rewards) {
    /* (추가작업필요) 체크 박스 체크 여부 확인 필요 */

    Summary(rewards);
}

/* Td 를 호출하는 부분이 map 으로 호출되기 때문에 모든 컴포넌트에 key 값이 들어가야 함 */
const Td = ({item, count}) => {
    let gold = 0;
    /* 난이도/관문 별 보상 */
    const level_reward_td = () => {
        const rewardList = item.reward;
        const max_level = item.level.length;

        const reward_td = rewardList.map(reward => {
            /* 최종 보상 데이터 저장 */
            summary_data_set(reward);

            gold = gold + reward.gold;
            let keyNum = 2 + reward.id;

            if( max_level < 3 && reward.id === max_level){
                return (
                <td key={`td_${count}_${keyNum}`} className="result_td" colSpan={2}>
                    {reward.id}관문
                    {reward.item.map(item => <div key={`div_${count}_${keyNum}_${item.id}`}>{item.item} {item.qty}개</div>)}
                    {reward.gold}골드
                </td>
                );
            } else {
                return (
                <td key={`td_${count}_${keyNum}`} className="result_td">
                    {reward.id}관문
                    {reward.item.map(item => <div key={`div_${count}_${keyNum}_${item.id}`}>{item.item} {item.qty}개</div>)}
                    {reward.gold}골드
                </td>
                );
            }
        })

        return reward_td
    }

    return (
        <tr key={`tr_${count}`} className="result_td">
            <td key={`td_${count}_1`} className="result_td">{count})</td>
            <td key={`td_${count}_2`} className="result_td">{item.title}</td>
            {level_reward_td()}
            <td key={`${count}_6`} className="result_td">{gold}골드</td>
        </tr>
    );
}

export default Td;
