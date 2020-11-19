import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
const Loader = props => (
<div>
  <div style={{alignContent:'center',marginLeft:'50%',marginTop:'20%',paddingBottom:'50%'}}>
   <CircularProgress color='black'/>
   <p style={{left:'-20px'}}>Loading Form Details for you..</p>
</div>
</div>
)

export default Loader;
