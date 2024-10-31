import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import path, { join } from "path";
import { promises as fs } from 'fs';

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

export async function IsUsernameValid(username)
{
    if(!username)
        return false;
    
    const regex = /[^a-zA-Z0-9_]/;
    const hasUnwantedSymbols = regex.test(username);
    return !hasUnwantedSymbols;
}

export async function GetRandomNumber (min, max)
{
    return parseInt(Math.random() * (max - min) + min);
}

export async function ExtractPriceFromString(priceText)
{
    let price = priceText.match(/\d+\.\d{2}/)[0];
    return parseFloat(price);
}

export async function GetAllFilesInDirectory(path)
{
    const fileNames = await fs.readdir(path);
    const actualFileNames = [];
    for (let index = 0; index < fileNames.length; index++) {
        const filename = fileNames[index];
        const fullPath = join(path, filename);
        const stats = await fs.stat(fullPath);
        if(stats.isFile())
            actualFileNames.push(filename);
    }
    return actualFileNames;
}

export async function SaveProfileToPath(name, hero)
{
    const profile = await hero.exportUserProfile();
    const profilePath = await GetPathToUlixeeProfiles();
    const finalPath = join(profilePath, name);
    await fs.writeFile(`${finalPath}.json`, JSON.stringify(profile, null, 2));
    console.log("Successfully Logged In And Cache");
}

export async function ReadProfileFromPath(name)
{
    const profileDir = await GetPathToUlixeeProfiles();
    const finalPath = join(profileDir, name);
    const profile = await fs.readFile(`${finalPath}.json`, 'utf-8');
    if(!profile)
        return null;

    return JSON.parse(profile);
}

export async function DeleteFileAtPath(path)
{
    if(existsSync(path))
        await fs.unlink(path);
} 

export async function GetPathToUlixeeProfiles()
{
    const ulixeeDir = await GetPathToUlixeeDir();
    return path.join(ulixeeDir, "ulixeeProfiles");
}

async function GetPathToUlixeeDir()
{
    return path.join(process.cwd(), "ulixeeData");
}

export async function CreateDirectoryForOrder(orderId)
{
    const ordersDir = await GetPathToOrderData();
    let pathname = join(ordersDir, orderId);
    pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
    await fs.mkdir(pathname, { recursive: true });
}

async function GetPathToOrderData()
{
    return path.join(process.cwd(), "ordersData");
}

export async function TakeAndSaveOrderScreenshot(hero, order, screenshotName)
{
    const screenshot = await hero.takeScreenshot({fullPage: true });
    const orderDir = await GetPathToOrderData();
    const finalPath = join(orderDir, order.id, `${screenshotName}.jpg`);
    await fs.writeFile(finalPath, screenshot, 'binary');
}

export async function ConvertJsonToObject(jsonText)
{
    try {
        return JSON.parse(jsonText);
    } catch (error) {
        return null;
    }
}