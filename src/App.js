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

    /* 체크박스 값 변경 시 결과 데이터 변경 */
    setResult = () => {

    }

    /* 체크박스 데이터 셋팅 */
    setCheckList = (type, e) => {
        if(type === "c"){

        }else if(type === "l"){

        }else if(type === "m"){

        }
    };

    /* 조회버튼 클릭 시, input 값으로 결과 조회 */
    clickSearch = (input) => { //input = 레벨
        this.setState({resultList: [], summaryList: [], contentClearCheckList: []}); //조회버튼 클릭시 초기화
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

        for (var i=dummyResult.length; i>0; i--){
            if(count === 3){
                break;
            }

            let isContent = dummyResult[i-1];
            isGrp = isContent.group;

            isContent.clear_check = true;
            isContent.reward.map(level => {
                level.clear_check = true;
            });

            if (preGrp !== isGrp){
                preGrp = isGrp;
                count = count + 1;
            }
        }

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