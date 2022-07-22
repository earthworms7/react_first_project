import { Component } from "react";
import Tr from './tr.js';
import TrSummary from './trSummary.js';
import styles from '../css/table.css';

class Result extends Component{
    /* 테이블 그리기 */
    render() {
        return (
            <div className="result_div">
                <table className="result_table">
                    <colgroup>
                        <col style={{width:11+'%'}} />
                        <col style={{width:35+'%'}} />
                        <col style={{width:13+'%'}} />
                        <col style={{width:13+'%'}} />
                        <col style={{width:13+'%'}} />
                        <col style={{width:15+'%'}} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="result_th"></th>
                            <th className="result_th">컨텐츠 명</th>
                            <th colSpan="3"  className="result_th">난이도/관문 별 보상</th>
                            <th className="result_th">골드</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <Tr list={this.props.resultList} setCheckList={this.props.setCheckList} 
                            contentClearCheckList={this.props.contentClearCheckList} levelClearCheckList={this.props.levelClearCheckList} moreCheckList={this.props.moreCheckList}/>
                        <TrSummary list={this.props.summaryList} />
                    </tbody>
                </table>

            </div>
        );
    }
}

class Table extends Component {
    render() {
        return (
            <Result resultList={this.props.resultList} summaryList={this.props.summaryList} setCheckList={this.props.setCheckList} 
                    contentClearCheckList={this.props.contentClearCheckList} levelClearCheckList={this.props.levelClearCheckList} moreCheckList={this.props.moreCheckList}/>
        );
    }
}

export default Table;
