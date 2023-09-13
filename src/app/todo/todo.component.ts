import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ITask } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
  todoForm !:FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask [] = [];
  done : ITask [] = [];
  updateIndex!:any;
  isEditEnable : boolean = false;
  constructor(private fb : FormBuilder){}
  ngOnInit(): void {
    this.todoForm=this.fb.group({
      item:['',Validators.required]
    })
  }
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset();
  }
  deleteTask(i:number){
    this.tasks.splice(i,1)
  }
  deleteinprogress(i:number){
    this.inprogress.splice(i,1)
  }
  deletedone(i:number){
    this.done.splice(i,1)
  }
  onEdit(item:ITask,i:number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex=i;
    this.isEditEnable=true;
  }
  updateTask(){
    this.tasks[this.updateIndex].description=this.todoForm.value.item;
    this.tasks[this.updateIndex].done=false;
    this.todoForm.reset();
    this.updateIndex=undefined;
    this.isEditEnable=false;
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
