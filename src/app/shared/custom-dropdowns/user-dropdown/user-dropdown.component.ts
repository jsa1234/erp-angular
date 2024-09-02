import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '@core/domain-classes/user';
import { CommonService } from '@core/services/common.service';
import { BaseComponent } from 'src/app/base.component';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent extends BaseComponent implements OnInit,OnChanges,OnDestroy {
  @Input() group:FormGroup
  @Input() controlName:FormControl
  @Input() label?:string
  @Input() isAddAll:boolean = true
  @Input() isDefault:boolean = true
  @Input() isMandatory:boolean = false
  @Output() user:EventEmitter<User> = new EventEmitter<User>()
  users:User[]
  controlNameLabel:string

  constructor(private commonService:CommonService,private userService:UserService) {
    super();
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers()
    this.controlNameLabel = this.controlName.toString();
  }
getUsers(){
this.sub$.sink = this.commonService.getAllUsers().subscribe((res:User[])=>{
  this.users = [...res]
  this.getSelectedUser()
},
()=>console.log('User get failed'))
}

ngOnDestroy(): void {
  this.sub$.unsubscribe();
}
ngOnChanges(changes: SimpleChanges): void {
  if (changes['controlName']) {
    this.controlNameLabel = this.controlName.toString();
  }
}


getUserId(id:string){
  const user = this.users.find((x:User)=>x.id == id)
  this.user.emit(user)
}

getSelectedUser():void{
  this.sub$.sink = this.userService.getUserProfile().subscribe((res:User)=>{
    this.isDefault? this.group.get(this.controlNameLabel).patchValue(res.id):''
    this.group.get(this.controlNameLabel).disable()
    this.getUserId(res.id)
  })
}


}
