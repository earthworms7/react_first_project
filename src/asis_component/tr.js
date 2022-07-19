import React from 'react';
import Td from './td.js';

const Tr = ({list}) => {
    let count = 0;
    return (
          list.map(item =>{
            count = count + 1;
            return (
              <Td key={item.id} item={item} count={count}/>
            )
          })
    );
}

export default Tr;
