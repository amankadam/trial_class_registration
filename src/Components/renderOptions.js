import React from 'react';
const Options=(props)=>{
  return props.data.map((v)=>{
    return (
      <option key={v}>{v}</option>
    )
  });
}
export default Options;
