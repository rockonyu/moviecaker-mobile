import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [CommentService]
})
export class CommentComponent implements OnChanges {

  @Input() type: string;
  @Input() id: number;
  comments: any[] = []
  comment: string;

  constructor(
    public auth: AuthService, 
    private commentService: CommentService
  ) { }

  send() {
    // TODO: 使用 angular form 改寫
    const vm = this;
    if(!vm.comment) {
      alert('回应讯息不得为空');
    } else if(!vm.auth.isAuthenticated()) {
      vm.auth.login();
    } else {
      vm.commentService.sendById(vm.type, vm.id, vm.comment, null)
        .subscribe(res => {
          vm.comment = '';
          vm.getById(vm.type, vm.id);
        });
    }
  }

  toggleLiked(comment) {
    const vm = this;
    if (vm.auth.isAuthenticated()) {
      vm.commentService.toggleLikedById(vm.type, comment.Id)
        .subscribe(res => {
          comment.IsLiked = !comment.IsLiked;
          comment.LikedAmount += res;
        });
    } else {
      vm.auth.login();
    }
  }

  getById(type, id){
    const vm = this;
    vm.commentService.getById(type, id)
      .subscribe(comments => vm.comments = comments);
  }

  ngOnChanges(changes: SimpleChanges) {
    const vm = this;
    [vm.type, vm.id] = [
      (changes.type && changes.type.currentValue) || vm.type, 
      (changes.id && changes.id.currentValue) || vm.id
    ];
    vm.getById(vm.type, vm.id);
  }
}
