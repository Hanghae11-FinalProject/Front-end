import React,{useState, useEffect} from 'react';
import { icons } from "../shared/util";
import { Image, Grid } from "../elements/index";
import styled from 'styled-components';

const Test = () => {

    const [iconList, setIconList] = useState([]);


    useEffect(()=>{
      const newList = icons.map((icon, i) => {
        const object = {icons:icon, active:false};
        return object
      })
      setIconList(newList);
    },[])


    // 클릭했을때 해당 요소 -> if
    // 의 active 반대로 바꾸고 -> !ic.active
    //  배열을 리턴 받아야한다. -> {}

//원본배열 작업 후 원본배열을 다시 받기
    const handleClick = (i) =>{
     
      const newList = iconList.map((ic,idx)=> {
        if(i === idx){//만약 인자로 받아온 i가 newList의 idx번째와 같다면
          // return {icons:ic.icons, active:!ic.active} //액티브를 반대값으로 리턴
          return {
            ...ic,
            active: !ic.active
          }
        }else{//인덱스가 같지 않다면
          // return {icons:ic.icons, active:false} //원래 액티브값을 리턴
          return {
            ...ic,
            active: false
          }
        }
      })
     
     
      setIconList(newList)
  
    }
    console.log(iconList)

    return (
        <Testwrap>
        <div className='wrap'>
            {iconList && iconList.map((item, i) => {
            return (
              <Grid>
                <Image
                  size="50"
                  shape="circle"
                  src={item.icons}
                  key={i}
                  _className={item.active ? 'icon' : ''}
                  _onClick={()=>{
                    handleClick(i)
                  }}       
                  
                />
              </Grid>
            );
          })}
        </div>
        </Testwrap>
    );
};

export default Test;

const Testwrap = styled.div`
    .wrap{
        width: 50px;
        height: 50px;
        .icon{
          cursor: pointer;
          border: 1px solid var(--main-color);
        }
    }
`