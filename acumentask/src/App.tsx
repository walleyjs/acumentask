import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList,IonRow ,IonCol, IonItemDivider, IonTextarea, IonButton} from '@ionic/react';

import React,{Component} from 'react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './App.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
// import './theme/variables.css';
interface AppState {
  value: any
}


class App extends React.Component <any, any>{
  constructor(props: any,state:any) {
    super(props);
    this.state = {
       todo: '',
       populatedTodos:[],
       isVisible:false,
       index:"",
       editTodo:'',
      
  
  };

  }
 
  handleChange = (data : any) => {
    this.setState({[data.target.todo]: data.target.value});
  }


  handleSubmit = (e: any) => {
    // alert('A form was submitted: ' + this.state.todo);
    let databody = {
     
      'todo': this.state.todo,
      
      
  }

    fetch('http://localhost:8000/newtodo', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(databody)
      }).then((response)=> {
        this.setState({todo:''})
      console.log("response", "thsi response")
        // console.log(response);

        // return response.json();
        fetch('http://localhost:8000/newtodo', {
          method: 'Get',
       
        }).then((response)=> {
      
          console.log(response);
         
          return response.json();
         
        }).then((data) => {
          var newData=[]
          newData.push(data)
        
          // data.push(newData)
          this.setState({populatedTodos:data})
          
          // console.log('This is your data',newData)
          // this.myTodo()
        })
        .catch((err)=>{
          console.log(err)
        });
       
      }).catch((err)=>{
        console.log(err)
      });
  console.log('helllo')
    e.preventDefault();
 
  
}
    editForm=(todo:any)=>{
      console.log(todo)
      
      if(this.state.isVisible==true && this.state.index==todo._id){
      
        return ( 

        <IonList className="ioList">
        <IonItem  className="ioInput">
            <IonInput value={this.state.editTodo} placeholder="Enter todo" onIonChange={e=> this.setState({editTodo:e.detail.value} )}></IonInput>
          </IonItem>
        
          <IonItem>
          <IonButton color="dark" onClick={this.handleEdit.bind(this)} >save</IonButton>
          </IonItem>
        </IonList>)
      }else{
        return <div>{todo.todo}</div>
      }
    }
   
  handleEdit=()=>{
    let databody = {
      'todo': this.state.editTodo,
      'tId':this.state.index
  }
    fetch('http://localhost:8000/newtodoedit', {
      method: 'PUT',
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(databody)
    }).then((response)=>{
      console.log(response)
    })
  }


componentDidMount(){
  
// console.log('here')
  fetch('http://localhost:8000/newtodo', {
    method: 'Get',
 
  }).then((response)=> {

    console.log(response);
   
    return response.json();
   
  }).then((data) => {
   
  
  
    this.setState({populatedTodos:data})
    
    console.log(data[0])
    // this.myTodo()
  })
  .catch((err)=>{
    console.log(err)
  });

}


  render(){
    return (
      <IonApp>
         <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Todos</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonList className="ioList">
          { 
          this.state.populatedTodos.map((todo:any,index:any)=> (
            
            <IonItem key={index} >
             
            <div className="ioItem">
           
              <div> 

              {this.editForm(todo)}
             
                <IonButton color="dark" onClick={()=>{this.setState({isVisible:true,index:todo._id,editTodo:todo.todo})
                }} >Edit</IonButton>
                </div> 
              
              </div> 
         
            </IonItem >
            // console.log(todo.subject)
          ))
          
           }
          </IonList>
        <form >
        <IonList className="ioList">
        <IonItem  className="ioInput">
            <IonInput value={this.state.todo} placeholder="Enter todo" onIonChange={e => this.setState({todo:e.detail.value!})}></IonInput>
          </IonItem>
        
          <IonItem>
          <IonButton color="dark" onClick={this.handleSubmit.bind(this)} >Add Todo</IonButton>
          </IonItem>
        </IonList>
     
        </form> 
          {/* {this.myTodo} */}
        
       
        </IonContent>
        </IonPage>
   
      </IonApp>
    );
  }
 
};

export default App;
