import React, { Component } from "react";

class App extends Component {
  state = {
    value: "",
    task: []
  };
  componentDidMount(){
    if(localStorage.getItem('data')){
      this.setState({
        task: [...localStorage.getItem('data').split(",")]
      })
    }
  };
  componentDidUpdate(){
    localStorage.setItem('data',this.state.task)
  }
  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(v);
    this.setState({
      task: [...this.state.task, this.state.value],
      value: ""
    });
  };
  handleDelete = index => {
    let task = this.state.task;
    task.splice(index, 1);
    this.setState({
      task: task
    });
  };

  handleUpDown = (index ,a) =>{
    let g = index + a;
    let s = [...this.state.task]
    let z = s.splice(index,1)[0]
    s.splice(g,0,z)
    this.setState({
      task : s
    })
  };

  handleEdit = (e,i) =>{
    let elem  = e.target.parentElement.previousElementSibling
    elem.contentEditable = true;
    let stateVal = this.state.task.slice(0,this.state.task.length)
    elem.addEventListener("input",()=>{
     let val = String(elem.innerText)
     stateVal.splice(i,1,val)
    });
    elem.addEventListener('blur',()=>{
      elem.contentEditable = false;
      this.setState({
        task : stateVal
      })
    })
    elem.focus()
  }
  render() {
    let response = this.state.task.map((task, index) => {
      if(index === 0){
        return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{task}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => this.handleDelete(index)}
              >
                DELETE
              </button>
              <button className="btn btn-warning " onDoubleClick={(e)=>this.handleEdit(e,index)} onClick = {(e)=>this.handleEdit(e,index)}>EDIT</button>
              <button className="btn btn-success" disabled onClick={() => this.handleUpDown(index, -1)}>MOVE-UP</button>
              <button className="btn btn-success" onClick={() => this.handleUpDown(index, 1)}>MOVE-DOWN</button>
            </td>
          </tr>
        )
      }
      if(index === this.state.task.length-1){
        return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{task}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => this.handleDelete(index)}
              >
                DELETE
              </button>
              <button className="btn btn-warning " onClick = {(e)=>this.handleEdit(e,index)}>EDIT</button>
              <button className="btn btn-success" onClick={() => this.handleUpDown(index, -1)}>MOVE-UP</button>
              <button className="btn btn-success" disabled onClick={() => this.handleUpDown(index, 1)}>MOVE-DOWN</button>
            </td>
          </tr>
        )
      }else{
        return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{task}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => this.handleDelete(index)}
              >
                DELETE
              </button>
              <button className="btn btn-warning " onClick = {(e)=>this.handleEdit(e,index)}>EDIT</button>
              <button className="btn btn-success " onClick={() => this.handleUpDown(index, -1)}>MOVE-UP</button>
              <button className="btn btn-success " onClick={() => this.handleUpDown(index, 1)}>MOVE-DOWN</button>
            </td>
          </tr>
        )
      }
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          TASK:{" "}
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button>ADD TASK</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{response}</tbody>
        </table>
      </div>
    );
  }
}
export default App;
