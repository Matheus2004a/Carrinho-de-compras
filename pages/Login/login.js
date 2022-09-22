import React, { useState, useEffect } from 'react';
import {
  Image,
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Products from '../Products/products';
import ButtonStyle from '../../components/buttons';

const Login = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);

  async function onLogin() {
    setStatus(true);
    const url = 'https://demo1400981.mockable.io/loginUser';
    const response = await fetch(url, {
      method: 'POST',
    })
    const data = await response.json().catch(error => {
      alert(`Erro: ${error}`)
      setStatus(false);
    })
    if (username == data.nome && password == data.senha) {
      setStatus(false);
      navigation.navigate('Products');
    } else {
      alert('Acesso negado');
      setStatus(false);
    }
    setStatus(false);
  }

  return (
    <View style={styles.container}>
      {!status && (
        <>
          <Text style={styles.text}>Bem vindo ao APP Fragrances</Text>
          <View style={{ marginBottom: 16 }}>
            <Image
              style={styles.imgLogin}
              source={require('../../assets/img/logo-fragances.png')}
            />
          </View>
          <Text style={{ marginBottom: 10 }}>Faça seu login logo abaixo:</Text>
          
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder={'Digite seu usuário'}
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={'Digite sua senha'}
            secureTextEntry={true}
            style={styles.input}
          />
          <TouchableOpacity
            style={[
              ButtonStyle.buttonProd,
              { width: '100%', padding: 0 },
            ]}
            onPress={() => onLogin()}>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </>
      )}
      {status && <ActivityIndicator size={'large'} color={"#184C78"} />}
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 50,
  },
  input: {
    width: '100%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#184C78',
    marginBottom: 10,
    borderRadius: 3,
    outline: 'none',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: '#184C78',
    marginBottom: 16,
    fontWeight: 600,
  },
  textLogin: {
    color: 'white',
    padding: 10,
    fontWeight: 600,
  },
  imgLogin: {
    width: 140,
    height: 130,
  },
});
