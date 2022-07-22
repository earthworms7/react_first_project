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
            contentClearCheckList: [], //c : 컨텐츠 클리어 체크 리스트 
            levelClearCheckList: [],//l : 관문 클리어 체크 리스트
            moreCheckList: []//m : 더보기 체크 리스트
        }
    }
    // 사용자 입장에서는 빠른 화면 전환 등의 장점이 있으나 아무리 생각해도 개발자입장에서는 굉장히 불편하다고 생각됨 ㅋㅋ
    // 굳이 이거까지 상태관리로 해야해? 라는 느낌이 드나,, 리액트는 이렇게 해! 아니면 안돼! 인거라.. 제이쿼리가 개발자입장에선 그냥 직접 엘리먼트 호출해서 다하니까 쉬웠던 것 같음..

    /* 체크박스 데이터 셋팅 */
    // 체크박스 이렇게 할 줄 모르고 같은 데이터를 reward 에서도 체크박스용 list 에서도 데이터를 관리하다보니.... 쓸데없이 중복 코드가 많음..
    // 중복 코드 + 수정할 때 자꾸 하나 빠져서 고장남..
    setCheckList = (type, count, level_count, checked) => {
        const resultList = this.state.resultList;
        let contentClearCheckList = this.state.contentClearCheckList;
        let levelClearCheckList = this.state.levelClearCheckList;
        let moreCheckList = this.state.moreCheckList;

        let summary = [];

        if(type === "c"){ //레이드별 진행 체크
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
                contentClearCheckList[count-1] = checked;
                const chageId = resultList[count-1].id;

                let changeResultList = resultList.map(item => item.id === chageId ? {...item, clear_check: checked, reward: item.reward.map(level => 1===1 ?{...level, clear_check: checked, more_check: !checked ? checked : level.more_check} : level) } : item);
                let changeResultLevelList = levelClearCheckList.map((item, index) => index === count-1 ? item.map(level => level = checked) : item);

                let changeMoreCheckList = moreCheckList;
                if(!checked){
                    changeMoreCheckList = moreCheckList.map((item, index) => index === count-1 ? item.map(level => level = checked) : item);
                }
                summary = Summary(changeResultList);

                this.setState({resultList : changeResultList, summaryList : summary, contentClearCheckList : contentClearCheckList, levelClearCheckList : changeResultLevelList, moreCheckList : changeMoreCheckList});
            }
        }else if(type === "l"){ //관문별 진행 체크
            //레이드 별 진행도 체크 안되어있을 경우 체크 불가능
            if(!resultList[count-1].clear_check){
                alert("군단장 레이드 진행도 체크를 하지 않은 레이드는 관문별 진행도를 체크할 수 없습니다.");
            } else {
                let changeLevelClearCheckList = levelClearCheckList.map((item, index) => index === count-1 ? checked ? item.map((level, i) => i <= level_count ? level = checked : level) : item.map((level, i) => i >= level_count ? level = checked : level) : item);

                let changeResultList = resultList.map(item => item.id === resultList[count-1].id ? {...item, reward: item.reward.map((level, index) => checked ? index <= level_count ?{...level, clear_check: checked} : level : index >= level_count ?{...level, clear_check: checked} : level) } : item);

                summary = Summary(changeResultList)

                this.setState({resultList : changeResultList, summaryList : summary, levelClearCheckList : changeLevelClearCheckList});
            }
        }else if(type === "m"){ //더보기 체크
            if(!resultList[count-1].clear_check){
                alert("군단장 레이드 진행도 체크를 하지 않은 레이드는 관문별 진행도를 체크할 수 없습니다.");
            } else {
                let changeMoreCheckList = moreCheckList.map((item, index) => index === count-1 ? item.map((level, i) => i === level_count ? level = checked : level) : item);
                let changeResultList = resultList.map(item => item.id === resultList[count-1].id ? {...item, reward: item.reward.map((level, index) => index === level_count ?{...level, more_check: checked} : level) } : item);

                summary = Summary(changeResultList)

                this.setState({resultList : changeResultList, summaryList : summary, moreCheckList : changeMoreCheckList});
            }
        }
    };

    /* 조회버튼 클릭 시, input 값으로 결과 조회 */
    clickSearch = (input) => { //input = 레벨
        // 초기화
        this.setState({resultList: [], summaryList: [], contentClearCheckList: [], levelClearCheckList: [],  moreCheckList: []});
       
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
        let levelClearCheckList = [];
        let moreCheckList = [];
        let check_count = 0;
        //체크박스 상태 셋팅
        result.map(content => {
            //레이드별 진행도 체크
            conetneClearCheck = conetneClearCheck.concat(content.clear_check);
            
            //관문별 진행도 체크 + 더보기는 default : false
            let contentLevelClearCheck = [];
            let contentMoreCheck = [];
            
            content.reward.map(level => {
                contentLevelClearCheck = contentLevelClearCheck.concat(level.clear_check);
                contentMoreCheck = contentMoreCheck.concat(level.more_check);
            });

            levelClearCheckList[check_count] = contentLevelClearCheck;
            moreCheckList[check_count] = contentMoreCheck;
            check_count = check_count+1;
        });

        this.setState({resultList: result, summaryList: summary, contentClearCheckList : conetneClearCheck, levelClearCheckList : levelClearCheckList, moreCheckList : moreCheckList});
    }

    render() {
        return (
            <>
            <Search clickSearch={this.clickSearch}/>
            <Result resultList={this.state.resultList} summaryList={this.state.summaryList} setCheckList={this.setCheckList} 
                    contentClearCheckList={this.state.contentClearCheckList} levelClearCheckList={this.state.levelClearCheckList} moreCheckList={this.state.moreCheckList}
            />
            </>
        );
    }
}

export default App;