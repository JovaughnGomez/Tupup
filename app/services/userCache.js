import prisma from "@/server/prisma";
import User from "../models/user";

const userMap = new Map();

async function FetchUsers()
{
  const allUsers = await prisma.user.findMany();
  allUsers.map((user) => {
    user = new User(user);
    userMap.set(user.id, user)
  });
}
FetchUsers();

export function AddUserToMap(userData) {
  const user = new User(userData);
  if(!userMap.has(user.id))
    userMap.set(user.id, user);
}

export function GetUserFromMap(userId) {
  return userMap.get(userId);
}

export function RemoveUserFromMap(user) {
  userMap.delete(user.id);
}

export function ListAll() {
  console.log(userMap);
}

export function UpdateWallet(userId, newBalance)
{
  const user = GetUserFromMap(userId);
  if(user)
    user.wallet = newBalance;
}