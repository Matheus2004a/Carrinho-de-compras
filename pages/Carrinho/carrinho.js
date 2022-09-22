import React, { Component, useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Buttons from '../../components/buttons';
import cart from '../../services/cart';
import Lists from '../../components/lists';

const Carrinho = ({ route, navigation }) => {
  const [listProducts, setListProducts] = useState([]);
  const [statusPayment, setStatusPayment] = useState(false);
  let totalItemsList = cart.listItems;
  let purchase = cart.totalPrice;

  useEffect(() => {
    getProductsAdded();
  }, []);

  function getProductsAdded() {
    setListProducts(totalItemsList);
  }

  function didPayment() {
    if (totalItemsList.length > 0) {
      setStatusPayment(true);
      setTimeout(() => {
        alert('Pagamento realizado com sucesso');
        totalItemsList.length = 0;
        setListProducts(totalItemsList);
        navigation.navigate('Products');
      }, 5000);
    } else {
      alert('Adicione itens ao seu carrinho');
      setStatusPayment(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          data={listProducts}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={Lists.lists}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <Image
                    style={{
                      height: 80,
                      width: 70,
                      borderRadius: 3,
                    }}
                    source={item.foto}
                  />
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'column',
                      marginLeft: 16,
                    }}>
                    <Text style={styles.fontTexto}>{item.nome}</Text>
                    <Text style={styles.fontTexto}>Preço: {item.preco} </Text>
                    <Text style={styles.fontTexto}>
                      Quantidade: {item.updatedQtdEstq}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 16,
          }}>
          Detalhes da compra
        </Text>
        <Text>Total à pagar: R$ {purchase.toFixed(2)} </Text>

        <TouchableOpacity
          style={[
            Buttons.buttonProd,
            {
              width: '100%',
              padding: 10,
              borderRadius: 5,
            },
          ]}
          onPress={() => didPayment()}>
          {!statusPayment && (
            <Text style={{ color: '#FFF', fontWeight: 600 }}>
              Concluir pagamento
            </Text>
          )}
          {statusPayment && <ActivityIndicator size={'small'} color={'#fff'} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            Buttons.buttonProd,
            {
              width: '100%',
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#DCDCDC',
            },
          ]}
          onPress={() => navigation.navigate('Products')}>
          <Text style={{ color: '#000', fontWeight: 600 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fontTexto: {
    margin: 4,
    fontSize: 13,
  },
});

export default Carrinho;
