class ItensCar {
  listItems = [];
  totalQtdEstq = 0;
  totalPrice = 0;

  AddItemsToCart(item) {
    let idProd = item.id;
    if (this.listItems.find((item) => item.id === idProd)) {
      item.updatedQtdEstq += 1;
    } else {
      item.updatedQtdEstq += 1;
      this.listItems.push(item);
    }

    alert('Adicionado ao carrinho');
    this.totalPrice += item.preco
    global.totalQtdEstq += item.updatedQtdEstq;
  }
}

const cart = new ItensCar();
export default cart;
