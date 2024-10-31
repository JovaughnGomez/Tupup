const cardMap = new Map();

cardMap.set("15", 13);
cardMap.set("25", 22);
cardMap.set("30", 26);
cardMap.set("50", 44);
cardMap.set("60", 53);
cardMap.set("65", 57);
cardMap.set("100", 88);
cardMap.set("120", 106);
cardMap.set("300", 266);

export function GetExclusiveValueOfPhoneCard(inclusiveValue)
{
    return cardMap.get(inclusiveValue.toString());
}

export function DoesDenominationExist(inclusiveValue)
{   
    return cardMap.has(inclusiveValue.toString());
}
