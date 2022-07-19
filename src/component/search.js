import { Component } from "react";
import styles from '../css/search.css';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        }
    }

    onChangeInput = (e) => {
        this.state.searchText = e.target.value;
    }

    searchClick = () => {
        this.props.clickSearch(this.state.searchText);
    }

    render() {
        return (
            <div className="mainBody">
                <div>
                      <h3>로아 레벨별 골드 계산기</h3>
                </div>
                <div>  
                      {/* 타이틀 이미지 */}
                      <img className="tit_img" alt="tit" src="img/tit.jpg"/>
                      {/* 입력창 */}
                      <input className="search_input" type="text" onChange={this.onChangeInput} placeholder="레벨 입력 ex) 1370"></input>
                      {/* 조회 버튼 */}
                      <button className="search_btn" onClick={this.searchClick}>조회</button>
                </div>
            </div>
        );
    }
}

export default Search;
