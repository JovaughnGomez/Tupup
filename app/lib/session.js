import { v4 as uuidv4 } from 'uuid';

export default function SessionData(sessionId, user)
{
    this.sessionId = sessionId ? sessionId : uuidv4();
    this.userId = user.id;
    this.username = user.username;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
} 

