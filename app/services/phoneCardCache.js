const cardMap = new Map();

cardMap.set("15", 13.12);
cardMap.set("25", 22.00);
cardMap.set("50", 43.7);
cardMap.set("100", 87.5);
cardMap.set("200", 175);

export function GetExclusiveValueOfPhoneCard(inclusiveValue)
{
    return cardMap.get(inclusiveValue);
}

export function DoesDenominationExist(inclusiveValue)
{   
    return cardMap.has(inclusiveValue);
}