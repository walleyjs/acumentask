import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList,IonRow ,IonCol, IonItemDivider, IonTextarea, IonButton } from '@ionic/react';

import React,{Component} from 'react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

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
       populatedTodos:[]
  
  };

  }
  handleChange = (data : any) => {
    this.setState({[data.target.todo]: data.target.value});
  }


  handleSubmit = (e: any) => {
    // alert('A form was submitted: ' + this.state.todo);
    let databody = {
      'subject':'your subject',
      'todo': this.state.todo,
      
      
  }

    fetch('http://localhost:8000/newtodo', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(databody)
      }).then((response)=> {
        this.setState({todo:''})
      console.log("response")
        console.log(response);
      
        return response.json();
       
      }).catch((err)=>{
        console.log(err)
      });
  console.log('helllo')
    e.preventDefault();
  
}

myTodo= async()=> {
  
   return this.state.populatedTodos.map((todo:any,index:any)=> {
    <IonItem key={index}>
      {todo.subject} {todo.tdo}
    </IonItem>
    console.log(todo.subject)
  })
  
  
 
}

componentDidMount(){
console.log('here')
  fetch('http://localhost:8000/newtodo', {
    method: 'Get',
    // We convert the React state to JSON and send it as the POST body
  
  }).then((response)=> {
  // console.log(d)
    console.log(response);
    // this.setState({populatedTodos:response})
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

}

  render(){
    return (
      <IonApp>
         <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>IonInput Examples</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent>
        <form >
        <IonList>
        <IonItem>
            <IonInput value={this.state.todo} placeholder="Enter Input" onIonChange={e => this.setState({todo:e.detail.value!})}></IonInput>
          </IonItem>
        
          <IonItem>
          <IonButton color="dark" onClick={this.handleSubmit.bind(this)}>Dark</IonButton>
          </IonItem>
          <IonItem>
         ghfhf
          </IonItem>
        
        </IonList>
      
       
     
     
        </form> 
          {/* {this.myTodo} */}
          <IonList>
          { 
          this.state.populatedTodos.map((todo:any,index:any)=> (
            <IonItem key={index}>
             
            <p>{todo.subject}</p> 
            <p>{todo.todo}</p> 
            </IonItem >
            // console.log(todo.subject)
          ))
          
           }
          </IonList>
          {/* <>
           { 
          this.state.populatedTodos.map((todo:any,index:any)=> (
            <IonRow key={index}>
              <IonCol size="9">
            <p> {todo.subject} </p> 
            </IonCol>
            </IonRow>
            // console.log(todo.subject)
    ))
          
           }
           </> */}
        </IonContent>
        </IonPage>
   
      </IonApp>
    );
  }
 
};

export default App;
