export async function CreateGiftcardPrefix()
{
    try {
        let prefixData = await prisma.giftcardPrefix.create({
            data: {
                id: categoryName,
                prefix: prefixData,
                codeLength
            }
        });
        
        return { success: true, prefix: prefixData};
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }    
}