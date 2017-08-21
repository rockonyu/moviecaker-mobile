import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "app/auth/auth.service";
import { UserService } from "app/user/user.service";

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: [],
  providers: [UserService]
})
export class UserAvatarComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;
  @Input() userId: number; // 若登入情況下綁定 userId 會出現交友狀況

  relationship;
  FriendStatus = {
    ACCEPT: 'Accpet',
    INVITE: 'Inviting',
    BEINVITED: 'BeingInvited',
    NONE: 'None'
  };

  constructor(
    public auth: AuthService, 
    private userService: UserService
  ) { }

  checkRelationship(userId: number) {
    this.userService.check(userId)
      .subscribe(res => this.relationship = res || { UserId: userId, Status: this.FriendStatus.NONE });
  }

  invite() {
    const vm = this;
    if(vm.auth.isAuthenticated()) {
      vm.userService.invite(vm.userId)
        .subscribe(res => vm.relationship.Status = vm.FriendStatus.INVITE);
    }
  }

  cancel() {
    const vm = this;
    if(vm.auth.isAuthenticated()) {
      vm.userService.cancel(vm.userId)
        .subscribe(res => this.relationship.Status = vm.FriendStatus.NONE);
    }
  }

  reject() {
    const vm = this;
    if(vm.auth.isAuthenticated()) {
      vm.userService.reject(vm.userId)
        .subscribe(res => this.relationship.Status = vm.FriendStatus.NONE);
    }
  }

  accept() {
    const vm = this;
    if(vm.auth.isAuthenticated()) {
      vm.userService.accept(vm.userId)
        .subscribe(res => this.relationship.Status = vm.FriendStatus.ACCEPT);
    }
  }

  ngOnInit() {
    const vm = this;
    if(vm.auth.isAuthenticated() && vm.userId) {
        vm.checkRelationship(vm.userId);
    }
  }
}
