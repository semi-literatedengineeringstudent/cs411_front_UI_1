import './App.css';
import React, {useState, useEffect}from 'react';
import Axios from "axios"

function App() {
  const [userName, setUserName] = useState("")
  const [userpassWord, setPassword] = useState("")
  const [userList, setUserList] = useState([])

  const [newPassword, setNewPassword] = useState("");
  const [schoolList, setschoolList] = useState([])
  const [reqVal, setreqVal] = useState("")

  const submitRecord = ()=>{
    Axios.post("http://localhost:3001/api/insert", {
      UserName: userName, 
      UserPassword:userpassWord,
    })

    setUserList([
      ...userList,
      {UserName: userName, UserPassword:userpassWord}
    ])
    //.then(()=>{
      //alert("Inserted!")
    //})
  }

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setUserList(response.data)
    })
  })

  const deleteUser = (User) => {
    Axios.delete(`http://localhost:3001/api/delete/${User}`);
  }

 const updataPassword = (User) => {
    Axios.put("http://localhost:3001/api/update", {
      UserName: User, 
      UserPassword:newPassword,
    });
    setNewPassword("")
  }

  const submitQuery = ()=>{
    Axios.get("http://localhost:3001/api/getSchoolList",
      {params: {
        passedVal : reqVal
      }}).then((response)=>{
      setschoolList(response.data)
    })
    }

  return (


    <div class="row">

      <div className="App2" >
      <form class="test">
                <table>
                  <tr>
                    <td>
                      <div className="App"  >

              
                        <h1>Login</h1>
                        <div className = "Form">
                        <label>UserName</label>
                        <input type="text" name = "username" onChange={(e)=>setUserName(e.target.value)}></input>
                        <label>Password</label>
                        <input type="text" name = "userpassword" onChange={(e)=>setPassword(e.target.value)}></input>
                        <button onClick = {submitRecord}>Submit</button>



                  {userList.map((val)=>{
                    return (
                      <div className = 'userCard'>
                        <h1>UserName: {val.UserName}</h1> 
                        <p> UserPassword:{val.UserPassword}</p>
                        <button onClick = {() => {deleteUser(val.UserName)}}>Delete</button>

                        <input type ="text" id = "updateInput" onChange={(e)=>{
                          setNewPassword(e.target.value)
                        }}/>
                        <button onClick = {() => {updataPassword(val.UserName)}}>Update</button>

                      </div>
                    );
                  })}


                  </div>
                      </div>
                    </td>
                    <td>
                     <div className="App2" > 

                        
                        
                        <h1>Query</h1>
                        <div className = "Form">
                        <label>Country input</label>
                        <input type="text" name = "country" onChange={(e)=>setreqVal(e.target.value)}></input>
                        <button onClick = {submitQuery}>Submit</button>

                    {schoolList.map((val)=>{
                      return (
                        <div className = 'schoolList'>
                          <p>department rank: {val.deptRank} </p> 
                          <p> deptGloabalrank:{val.deptGlobalRank}</p>
                          <p> college_name :{val.college_name}</p>
                          <p> country_name :{val.country}</p>
                          <p> year :{val.Year_ranked}</p>

                        </div>
                      );
                    })}


                  </div>
                      </div>
                    </td>
                  </tr>
                </table>
           </form>
      </div>
    </div>
  );
}

export default App;
