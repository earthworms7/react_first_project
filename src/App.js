import React, { Component } from 'react';
import Reward from './reward.js';
import Search from './component/search.js';
import Result from './component/result.js';
import Summary from './component/summary.js';

/* state 버전 */
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            resultList: [],
            summaryList: [],
            contentClearCheckList: [] //c : 컨텐츠 클리어 체크 리스트 
            //l : 관문 클리어 체크 리스트
            //m : 더보기 체크 리스트
        }
    }
    // 사용자 입장에서는 빠른 화면 전환 등의 장점이 있으나 아무리 생각해도 개발자입장에서는 굉장히 불편하다고 생각됨 ㅋㅋ
    // 굳이 이거까지 상태관리로 해야해? 라는 느낌이 드나,, 리액트는 이렇게 해! 아니면 안돼! 인거라.. 제이쿼리가 개발자입장에선 그냥 직접 엘리먼트 호출해서 다하니까 쉬웠던 것 같음..
    
    /* 체크박스 데이터 셋팅 */
    setCheckList = (type, count, checked) => {
        console.log("type => " + type + " count => " + count + " checked => " + checked);
        const resultList = this.state.resultList;
        let summary = [];

        if(type === "c"){
            //컨텐츠 갯수 체크
            let preGrp = null;
            let isGrp = null;
            let checkCount = 0;

            resultList.map(content=> {
                isGrp = content.group;

                if(preGrp !== isGrp && content.clear_check){
                    checkCount = checkCount + 1;
                    preGrp = isGrp;
                }
            });

            if(checkCount === 3 && checked){
                alert("군단장 레이드는 최대 3종류만 선택할 수 있습니다.");
            } else {
                const contentClearCheckList = this.state.contentClearCheckList;
                contentClearCheckList[count-1] = checked;

                let changeResultList = resultList.map(item => item.id === resultList[count-1].id ? {...item, clear_check: checked, reward: item.reward.map(level => 1===1 ?{...level, clear_check: checked} : level) } : item);

                summary = Summary(changeResultList)

                this.setState({resultList : changeResultList, summaryList : summary, contentClearCheckList : contentClearCheckList});
            }
        }else if(type === "l"){

        }else if(type === "m"){

        }
    };

    /* 조회버튼 클릭 시, input 값으로 결과 조회 */
    clickSearch = (input) => { //input = 레벨
        // 초기화
        this.setState({resultList: [], summaryList: [], contentClearCheckList: [] });
       
        let result = [];
        let summary = [];

        let dummyResult = [];
        
        Reward.map(content => {
            if(content.enterLevel <= input){
                dummyResult = dummyResult.concat(content);
            }
        });

        // 최대 3개 레이드만 가능
        let count = 0;
        let preGrp = null;
        let isGrp = null;
        let list = [];

        for (var i=dummyResult.length; i>0; i--){
            if(count === 3){
                break;
            }

            let isContent = dummyResult[i-1];
            isGrp = isContent.group;

            /* 
                변경해야하는 값의 id 를 리스트에 저장 =>
                현 위치에서 = 으로 값을 변경할 경우, Reward.js 의 데이터가 변경됨 (아마 import로 가져온 배열이라 값이 아닌 데이터 주소값이 들어가 있어서 그런 것으로 추정됨.)
                해당 위치에서 true 값으로 변경되어야하는 id 값만 가지고와서 다음단계에서 데이터 수정한 복사배열을 덮어씌우는 형식으로 처리하여야 함            
            */
            list.push(isContent.id);

            if (preGrp !== isGrp){
                preGrp = isGrp;
                count = count + 1;
            }
        }

        list.map(i => {
            dummyResult = dummyResult.map(item => item.id === i ? {...item, clear_check: true, reward: item.reward.map(level => 1===1 ?{...level, clear_check: true} : level ) } : item);
        });

        dummyResult.map(content => {
            let dummy = dummyResult.filter((selectContent) => selectContent.group === content.group && selectContent.level[1].id === content.level[1].id
                                                              &&  selectContent.id > content.id )
            
            if (dummy == ''){
                result= result.concat(content);
            }
        });

        if(result.length === 0){  //조회결과 없음
            //조회결과 없다고 노출하기
        } else {    //조회결과 있음
            summary = Summary(result);
        }
        
        let conetneClearCheck = [];

        //체크박스 상태 셋팅
        result.map(content => {
            conetneClearCheck = conetneClearCheck.concat(content.clear_check);
        });

        this.setState({resultList: result, summaryList: summary, contentClearCheckList : conetneClearCheck});
    }

    render() {
        return (
            <>
            <Search clickSearch={this.clickSearch}/>
            <Result resultList={this.state.resultList} summaryList={this.state.summaryList} setCheckList={this.setCheckList} contentClearCheckList={this.state.contentClearCheckList}/>
            </>
        );
    }
}

export default App;