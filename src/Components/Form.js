import React from 'react';
import DataAPI from '../api';
import {
  DateInput,
  TimeInput,
  DateTimeInput
} from 'semantic-ui-calendar-react';
import Options from './renderOptions';
import CircularProgress from '@material-ui/core/CircularProgress';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';
import qs from 'qs';

class Form extends React.Component{
state={date:'',course:'',timeSlots:'',slots:[],
enableTime:true,loading:false,SuccessfulRegister:false,messageHeader:'',messageBody:'',buttonDisable:false};

onFormSubmit=async e=>{
  e.preventDefault();
  this.setState({buttonDisable:true});
var pfName=e.target[0].value;
var psName=e.target[1].value;
var pEmail=e.target[2].value;
var cfName=e.target[3].value;
var csName=e.target[4].value;
var cAge=e.target[5].value;
var selectedSlot=e.target[8].value;
this.setState({loading:true});
var res=await axios.post('https://mysterious-scrubland-17366.herokuapp.com/api/notchup/register',qs.stringify({
  pfName:pfName,
  psName:psName,
  slot:selectedSlot,
  cfName:cfName,
  date:this.state.date,
  email:pEmail
}),
{headers:{
  'Content-Type': "application/x-www-form-urlencoded"
}});
if(res.data.status=='success'){

  for(var i=0;i<=6;i++) e.target[i].value='';

  this.setState({loading:false,timeSlots:'',SuccessfulRegister:true,messageHeader:'Trial Class Successfully Registered',buttonDisable:false,
  messageBody:`Your Trial Class is scheduled on ${this.state.date} at ${selectedSlot}`})
}else{
  this.setState({loading:false,SuccessfulRegister:true,messageHeader:'Oops..! Some Error Occured',buttonDisable:false,
  messageBody:`Please Try Again after Sometime.`})
}
}

onDateChange=(e,{name,value})=>{

this.setState({date:value});
if(this.state.course!='')
this.setState({enableTime:false});

if(this.state.slots){
var time=value.replaceAll('-','/');
var ms=new Date(time);
var timeSlot=[];
var today=new Date();
this.state.slots.map((v)=>{
  var temp=new Date(parseInt(v.slot));
  if(today.getDate()==ms.getDate() && today.getMonth()==ms.getMonth()){
    if(today.getDate()==temp.getDate() && today.getMonth()==temp.getMonth()){
    var add4=today.getTime()+(4*60*60*1000);
      if(temp.getTime() > add4){
      timeSlot.push(new Date(parseInt(v.slot)).toTimeString().substring(0,5));
    }
  }

    }else  if(temp.getDate()===ms.getDate() && temp.getMonth()===ms.getMonth()){
    timeSlot.push(new Date(parseInt(v.slot)).toTimeString().substring(0,5));
  }
});
this.setState({timeSlots:timeSlot});
}
}

onCourseSelection=(e)=>{
  var allslots=[];
  if(e.target.value){
  this.props.data.map((v)=>{
    if(v.course_name.toLowerCase()==e.target.value.toLowerCase()) allslots=v.slots;
  });
  this.setState({slots:allslots,course:e.target.value});
}
  if(this.state.date!='')
  {
  this.setState({enableTime:false});
  var time=this.state.date.replaceAll('-','/');
  var ms=new Date(time);
  var today=new Date();

  var timeSlot=[];
   allslots.map((v)=>{
    var temp=new Date(parseInt(v.slot));

    if(today.getDate()==ms.getDate() && today.getMonth()==ms.getMonth()){
      if(today.getDate()==temp.getDate() && today.getMonth()==temp.getMonth()){
      var add4=today.getTime()+(4*60*60*1000);
        if(temp.getTime() > add4){
        timeSlot.push(new Date(parseInt(v.slot)).toTimeString().substring(0,5));
      }
    }

    }else if(temp.getDate()==ms.getDate() && temp.getMonth()==ms.getMonth()){
      timeSlot.push(new Date(parseInt(v.slot)).toTimeString().substring(0,5));
    }

  });

  this.setState({timeSlots:timeSlot});
  }
}



  render(){
    return(
      <div class="container" >
        <div class='formBody'>
      <form onSubmit={this.onFormSubmit} class="ui form" style={{marginTop:'15px'}}>
      <h2 class="ui dividing header">Trial class Registration</h2>
      {this.state.loading ?
        <div>
          <CircularProgress style={{marginLeft:'45%'}} color='black'/>
           <p style={{marginLeft:'30%'}}>Registering Your Trial Class...</p>
</div>
        : this.state.SuccessfulRegister ?
      <div class="ui success message" style={{display:'block'}}>
         <div class="header">{this.state.messageHeader}</div>
         <p>{this.state.messageBody}</p>
       </div>:''
     }

      <div className="field">
        <label>Parent's Name</label>

        <div className="two fields">
          <div className="field">
            <input type="text" name="parent-first-name" placeholder="First Name" required/>
          </div>
          <div className="field">
            <input type="text" name="parent-last-name" placeholder="Last Name" required/>
          </div>
        </div>
      </div>
          <div className="field">
           <label>Parent's E-mail</label>
           <input type="email" placeholder="Parent Email" name='parent-email' required/>
          </div>

          <div className="field">
            <label>Child's Name</label>
                 <div className="two fields">
              <div className="field">
                <input type="text" name="child-first-name" placeholder="First Name" required/>
              </div>
              <div className="field">
                <input type="text" name="child-last-name" placeholder="Last Name" required/>
              </div>
            </div>
          </div>
          <div className="field">
          <div className='fields'>
          <div className="four wide field">
          <label>Child's Age</label>
            <input type="number" min="5" max="17" name="child-age" placeholder="5" required/>
        </div>

          <div className=" twelve wide field">
      <label>Select Course</label>
      <select name="courseSelection" onChange={this.onCourseSelection} className="ui fluid dropdown" required>
      <option selected="true" disabled>Select Course</option>
         <option>Scratch Junior</option>
         <option>Game Development</option>
         <option>Web Development</option>
         <option>App Development</option>
         <option>Python</option>
      </select>
      </div>
      </div>
      </div>


      <div>
      <div class='field'>
      <label>Select Date For Trial Class</label>
      <DateInput
           name="date"
           dateFormat="MM-DD-YYYY"
           minDate='20-11-2020'
           placeholder="Date"
           closable={true}
           value={this.state.date}
           iconPosition="left"
           onChange={this.onDateChange}
         />
         </div>
         <div class='field'>
         <label>Select Time for Trial Class</label>
         <select name="timeSelection" onChange={this.onTimeSelection} className="ui fluid dropdown" required disabled={this.state.enableTime} >
         <option selected="true" disabled>Select Slot </option>

      {this.state.timeSlots.length>0 ? <Options data={this.state.timeSlots}/>:''}
         </select>
         </div>
     </div>


  <button type='submit' style={{marginTop:'30px',marginLeft:'40%',marginBottom:'100px'}} disabled={this.state.buttonDisable} className='ui secondary button'>Register</button>

    </form>
    </div>
    </div>
    )
  }
}
export default Form;
