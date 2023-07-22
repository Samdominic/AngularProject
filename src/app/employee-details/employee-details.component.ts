import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDataService } from '../employee-data.service';
declare var window :any;

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  getData: any[] = [];
  employeeId: any;
  findData: any;
  emailId: any;
  editData: any;
  canEdit = false;
  genders = ["Male", "Female", "Others"];
  editEmpForm: FormGroup;
  changePassForm:FormGroup;
  confirm = true;
  submited =false;
  submited1 =false;
  changePassEmpId :any ;
  message :any;
  message1 :any;
  // emps :any[]=[
  //   {sno:"1",fname: "sam" , lname:'dominic',gender :'male' ,mailid:'abc@gmail.com',mobileno:'12345'},
  //   {sno:"2",fname: "" , lname:'',gender :'male' ,mailid:'def@gmail.com',mobileno:'6789'},
  //   {sno:"3",fname: "" , lname:'',gender :'' ,mailid:'',mobileno:''},
  //   {sno:"4",fname: "" , lname:'',gender :'' ,mailid:'',mobileno:''},
  //   { sno:"5",fname: "" , lname:'',gender :'' ,mailid:'',mobileno:''},
  // ]
  constructor(public eds: EmployeeDataService, private router: Router) {
    this.editEmpForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      dob: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required)
    })
    
    this.changePassForm = new FormGroup({
      oldPass :new FormControl('',Validators.required),
      newPass :new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
    const datas = this.eds.getEmployeeData();
    if (datas) {
      const parseData = JSON.parse(datas);
      this.getData = this.getData.concat(parseData);
    }
  }
//delete button function
  getId(id: number) {
    this.employeeId = id;

  }
  //edit button function
  onEdit(i: any) {
    // this.canEdit = !this.canEdit;
    this.findData = i;
    console.log(i,this.getData[i].firstName)
   //Set value for Editform
     this.editEmpForm.setValue({
     firstName : this.getData[i].firstName,
     lastName :  this.getData[i].lastName,
      email : this.getData[i].email,
      gender : this.getData[i].gender,
       dob :this.getData[i].dob
     })                              
  }
  //Editemp confirm button function
  onSubmit() {
    this.submited = true;
    if (this.editEmpForm.valid) {
      this.getData[this.findData].firstName = this.editEmpForm.value.firstName;
      this.getData[this.findData].lastName = this.editEmpForm.value.lastName;
      this.getData[this.findData].email = this.editEmpForm.value.email;
      this.getData[this.findData].dob = this.editEmpForm.value.dob;
      this.getData[this.findData].gender = this.editEmpForm.value.gender;
      const data = JSON.stringify(this.getData);
      this.eds.setEmployeeData(data);
    
    }
  }
  //Deleteemp confirm button function
  onDelete() {
    this.getData = this.getData.filter(item => item.id != this.employeeId);
    let data = JSON.stringify(this.getData);
    this.eds.setEmployeeData(data);
    
  }
  changePass(eId:any){
  this.changePassEmpId =eId;
  }
  confirmChangePass(){
    this.submited = true;
    if(this.changePassForm.valid){
      const findData =this.getData.findIndex((eid:any)=> eid.id == this.changePassEmpId);
     if(this.changePassForm.value.oldPass == this.getData[findData].password){
      this.getData[findData].password = this.changePassForm.value.newPass;
      const data =JSON.stringify(this.getData) ;
      this.eds.setEmployeeData(data);
      this.message = '';
      this.message1 = 'Password changed succesfully!!';
  }
  else{
    this.message ='Your Password Is Wrong!!';
  }
  }

}


}
