import React, { Component, useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Buttons from '../../components/buttons';
import cart from '../../services/cart';
import Lists from '../../components/lists';

const Produtos = ({ route, navigation }) => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const url = 'https://demo9120960.mockable.io/listProducts';
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json().catch((error) => {
      alert(`Erro: ${error}`);
    });
    setDados(data);
  }

  function addToCar(item) {
    if (item.quantEsq > 0) {
      cart.AddItemsToCart(item);
    } else {
      alert('Quantidade em estoque indisponível');
    }
  }

  function finalizePurchases() {
    navigation.navigate('Carrinho');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginBottom: 16,
          }}>
          Lista de produtos
        </Text>

        <FlatList
          data={dados.perfumes}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={Lists.lists}>
                <View>
                  <Image
                    style={{
                      height: 80,
                      width: 70,
                      borderRadius: 3,
                    }}
                    source={item.foto}
                  />
                </View>

                <View
                  style={{
                    flex: 2,
                    flexDirection: 'column',
                    marginLeft: 16,
                  }}>
                  <Text style={styles.fontTexto}>Nome: {item.nome} </Text>
                  <Text style={styles.fontTexto}>Valor: R$ {item.preco}</Text>
                  <Text style={styles.fontTexto}>
                    Quantidade: {item.quantidade}
                  </Text>
                  <Text style={styles.fontTexto}>
                    Quantidade em estoque: {item.quantEsq}
                  </Text>

                  <TouchableOpacity
                    style={Buttons.buttonProd}
                    onPress={() => addToCar(item)}>
                    <Text style={{ color: '#FFF' }}>Adicionar ao carrinho</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={[
            Buttons.buttonProd,
            { width: '100%', position: 'fixed', bottom: 0, left: 0 },
          ]}
          onPress={() => finalizePurchases()}>
          <Text style={{ color: '#FFF', fontWeight: 600 }}>
            Confirmar itens
          </Text>
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

export default Produtos;
