export default class Product {
    constructor(product)
    {
        this.id = product.id,
        this.name = product.name,
        this.name = product.name,
        this.icon = product.icon,
        this.usdValue = product.usdValue.toString(),
        this.price = product.price.toString(),
        this.salePrice = product.salePrice.toString(),
        this.isActive = product.isActive
    }
}