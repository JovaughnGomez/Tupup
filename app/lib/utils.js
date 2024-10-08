import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export function GenerateCSRFToken()
{
    return randomBytes(32).toString('hex');;
}

export async function GenerateUUID()
{   
    return uuidv4();
}

export async function GenerateHash(password)
{
    return await bcrypt.hash(password, 12);
}

export async function ComparePassword(password, hashedPassword)
{
    return await bcrypt.compare(password, hashedPassword);
}

export async function GeneratePasswordHash(password)
{
  return await bcrypt.hash(password, 12);
}


export async function ConvertDateToString(timestamp) 
{ 
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}   
