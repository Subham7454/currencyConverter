import React, {useState} from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

//constants
import {currencyByRupee} from './constants';
//component
import CurrencyButton from './components/CurrencyButton';
//snackbar
import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {
  const [inputVlaue, setInputValue] = useState('');
  const [resultVlaue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttoPresss = (targetVlaue: Currency) => {
    if (!inputVlaue) {
      return Snackbar.show({
        text: 'enter a value to convert',
        backgroundColor: 'green',
        textColor: 'black',
      });
    }
    const inputAmount = parseFloat(inputVlaue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetVlaue.value;
      const result = `${targetVlaue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetVlaue.name);
    } else {
      return Snackbar.show({
        text: 'not a valid number',
        backgroundColor: 'green',
        textColor: 'black',
      });
    }
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              style={styles.inputAmountField}
              maxLength={14}
              value={inputVlaue}
              clearButtonMode="always"
              onChangeText={setInputValue}
              keyboardType="number-pad"
              placeholder="enter amount in rupees"
            />
          </View>
          {resultVlaue && <Text style={styles.resultTxt}> {resultVlaue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => {
              return (
                <Pressable
                  style={[
                    styles.button,
                    targetCurrency === item.name && styles.selected,
                  ]}
                  onPress={() => buttoPresss(item)}>
                  <CurrencyButton {...item} />
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    backgroundColor: 'black',
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 12,
    height: 67,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
