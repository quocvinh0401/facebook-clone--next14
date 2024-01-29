import { Subject } from 'rxjs';
import { Payload } from 'security/payload';

export interface OnlineUser extends Payload {
  subject: Subject<any>;
  sessionId: string;
}
