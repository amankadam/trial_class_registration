import React from 'react';
import DataAPI from '../api';
import Form from './Form';
import Loader from './Loader';
class App extends React.Component{
  state={data:''};
  componentDidMount(){
    this.getData();
  }
  getData=async()=>{
    const res=await DataAPI.get();
    console.log(res);
    this.setState({data:res.data});
  }
  render(){
    return(
      <div className='bg'>
      <nav style={{backgroundColor:'black'}}>
            <h1 style={{color:'white',fontFamily:'Georgia',padding:'7px',marginLeft:'25px'}}>
            <b>NotchUp</b>
            </h1>
      </nav>
      {this.state.data.length>0?
      <Form data={this.state.data}/>:
       <Loader/>
    }
      </div>
    )
  }
}
export default App;
