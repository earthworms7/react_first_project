import React from 'react';
import { Component } from "react";
import Td from './td.js';

class Tr extends Component {
    render(){
      let count = 0;
      return (
            this.props.list.map(item =>{
              count = count + 1;
              return (
                <Td key={item.id} item={item} count={count} setCheckList={this.props.setCheckList}
                    contentClearCheckList={this.props.contentClearCheckList} levelClearCheckList={this.props.levelClearCheckList} moreCheckList={this.props.moreCheckList}/>
              )
            })
      );
    }
}

export default Tr;
