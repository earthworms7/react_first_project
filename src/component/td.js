import { Component } from "react";
import styles from '../css/table.css';


/* Td 를 호출하는 부분이 map 으로 호출되기 때문에 모든 컴포넌트에 key 값이 들어가야 함 */
class Td extends Component {
    constructor(props){
        super(props);
    }

    setCheckList = (type, count, e) => {
        console.log(this.props)

        this.props.setCheckList(type, count, e.target.checked);
    }

    /* 난이도/관문 별 보상 */
    level_reward_td = () => {
        const item = this.props.item;
        const count = this.props.count;
        const rewardList = item.reward;
        const max_level = item.level[item.level.length-1].id;
        let gold = 0;

        const reward_td = rewardList.map(reward => {
            gold = gold + reward.gold;
            let keyNum = 2 + reward.id;

            if( max_level !== 3 && reward.id === max_level){
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
        return (
            <>
            {reward_td}
            <td key={`${count}_6`} rowSpan={2} className="result_gold_td">{gold}골드</td>
            </>
        )
    }

    level_check_td = () => {
        const item = this.props.item;
        const count = this.props.count;
        const rewardList = item.reward;
        const max_level = item.level[item.level.length-1].id;

        const check_td = rewardList.map(reward => {
            let keyNum = 2 + reward.id;

            if( max_level !== 3 && reward.id === max_level){
                return (
                    <td key={`td_check_${count}_${keyNum}`} className="result_check_td" colSpan={2}>
                        <input type="checkbox" checked={reward.clear_check} onChange={(e) => this.setCheckList("l", count, e)}/> 관문진행<br/>
                        <input type="checkbox" checked={false} onChange={(e) => this.setCheckList("m", count, e)}/> 더보기
                    </td>
                )
            } else {
                return (
                    <td key={`td_check_${count}_${keyNum}`} className="result_check_td">
                        <input type="checkbox" checked={reward.clear_check} onChange={(e) => this.setCheckList("l", e)}/> 관문진행<br/>
                        <input type="checkbox" checked={false} onChange={(e) => this.setCheckList("m", count, e)}/> 더보기
                    </td>
                );
            }
        })

        return check_td
    }

    tr_result = ({item, count}) => {
        return (
            <tr key={`tr_${count}`}>
                <td key={`td_${count}_1`} className="result_td">{count})</td>
                <td key={`td_${count}_2`} rowSpan={2} className="result_td">{item.title}</td>
                {this.level_reward_td()}
            </tr>
        );
    }

    tr_check_result = ({item, count}) => {
        const contentClearCheckList = this.props.contentClearCheckList;
        return (
            <tr key={`tr_check_${count}`}>
                <td key={`td_check_${count}_1`} ><input type="checkbox" id={`contentClearCheck_${count}`} checked={contentClearCheckList[count-1]} onChange={(e) => this.setCheckList("c", count, e)}/></td>
                {this.level_check_td()}
            </tr>
        );
    }
    render() {
        const item = this.props.item;
        const count = this.props.count;
        return (
            <>
            {this.tr_result({item, count})}
            {this.tr_check_result({item, count})}
            </>
        );
    }
}

export default Td;
