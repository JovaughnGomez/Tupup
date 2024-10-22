export function ConvertDateToString(timestamp, excludeTime) 
{ 
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    if(excludeTime)
        return `${year}-${month}-${day}`
    else 
        return formattedDate;
}   

export function AddNewLines(notes)
{
    return notes.replace(/\n/g, '<br>');
}

export function CalculateFullPrice(product, quantity)
{
    return (parseFloat(product.price) * quantity).toFixed(2);
}

export function CalculateFinalPrice(product, quantity)
{
    let finalPrice = 0;
    
    if(product.onSale && product.salePrice > 0)
        finalPrice = parseFloat(product.salePrice);
      else  
        finalPrice = parseFloat(product.price);

    return (finalPrice * quantity).toFixed(2);
}

export function CapitalizeWord(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }