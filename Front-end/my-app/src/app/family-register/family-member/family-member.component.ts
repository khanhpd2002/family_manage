import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { People } from 'src/app/models/people.model';
import { RelationshipEnums } from 'src/app/models/relationship.enums';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.css']
})
export class FamilyMemberComponent implements OnInit {
  memberList: People[];
  mat_member: any;
  number: any;
  searchForm: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['stt', 'name', 'birthday', 'province', 'district', 'ward',
  'address', 'placeOfBirth', 'ethnic', 'placeOfJob', 'identityCard', 'relationshipWithOwner', 'status', 'note'];

  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    protected formBuilder: FormBuilder
  ) {
      this.searchForm = this.formBuilder.group({
        stt: [''],
        name: [''],
        otherName: [''],
        birthday: [''],
        province: [''],
        district: [''],
        ward: [''],
        address: [''],
        placeOfBirth: [''],
        ethnic: [''],
        placeOfJob: [''],
        identityCard: [''],
        family_number: [''],
        relationshipWithOwner: [''],
        note: [''],
      });
    }

  ngOnInit(): void {
    this.number = this.route.snapshot.paramMap.get('number');
    var url = 'http://localhost:8080/people/family/' + String(this.number);
    this.http.get<any[]>(url).subscribe(
      {
        next: (members) => {
          let i = 0, j= 0;
          members.forEach(member => {
            member.relationshipWithOwner = this.translateEnumToString(member.relationshipWithOwner);
            member.status = this.translateEnumToString(member.status);
            if (member.relationshipWithOwner == 'Chủ hộ'){
              if (i != 0){
                let temp: People;
                temp = member;
                members[i] = members[0];
                members[0] = temp;
              }
            }
            if (member.relationshipWithOwner == 'Vợ'){
              if (j != 1){
                let temp: People;
                temp = member;
                members[j] = members[1];
                members[1] = temp;
              }
            }
            j++;
          })
          this.memberList = members;
      }
    });
    console.log(JSON.stringify(this.memberList))
  }

  translateEnumToString (relation: string) {
    if (relation === 'OWNER')
      return RelationshipEnums.OWNER;
    else if (relation === 'WIFE')
      return RelationshipEnums.WIFE;
    else if (relation === 'SON')
      return RelationshipEnums.SON;
    else if (relation === 'DAUGHTER')
      return RelationshipEnums.DAUGHTER;
    else if (relation === 'PERMANENT')
      return 'Thường trú';
    else if (relation === 'TEMPORARY')
      return 'Tạm trú';
    else if (relation === 'ABSENT')
      return 'Tạm vắng';
    else if (relation === 'DIED')
      return 'Đã mất';
    else
      return '';
  }
}
