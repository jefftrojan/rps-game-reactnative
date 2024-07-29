// App.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Choice = 'Rock' | 'Paper' | 'Scissors' | '';

const App: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>('');
  const [computerChoice, setComputerChoice] = useState<Choice>('');
  const [result, setResult] = useState<string>('');
  const resultOpacity = useRef(new Animated.Value(0)).current;

  const choices: Choice[] = ['Rock', 'Paper', 'Scissors'];

  const determineWinner = (player: Choice, computer: Choice): string => {
    if (player === computer) return "It's a tie!";
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Scissors' && computer === 'Paper') ||
      (player === 'Paper' && computer === 'Rock')
    ) {
      return 'You win!';
    } else {
      return 'You lose!';
    }
  };

  const play = (playerChoice: Choice) => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];

    setPlayerChoice(playerChoice);
    setComputerChoice(computerChoice);
    setResult(determineWinner(playerChoice, computerChoice));
    animateResult();
  };

  const animateResult = () => {
    resultOpacity.setValue(0);
    Animated.timing(resultOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock, Paper, Scissors</Text>
      <View style={styles.choiceContainer}>
        <Text style={styles.choiceText}>Player: {playerChoice}</Text>
        <Text style={styles.choiceText}>Computer: {computerChoice}</Text>
      </View>
      <Animated.View style={[styles.resultContainer, { opacity: resultOpacity }]}>
        <Text style={styles.resultText}>{result}</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => play('Rock')}>
          <Icon name="hand-rock-o" size={50} color="#fff" />
          <Text style={styles.buttonText}>Rock</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => play('Paper')}>
          <Icon name="hand-paper-o" size={50} color="#fff" />
          <Text style={styles.buttonText}>Paper</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => play('Scissors')}>
          <Icon name="hand-scissors-o" size={50} color="#fff" />
          <Text style={styles.buttonText}>Scissors</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#61dafb',
    marginBottom: 20,
  },
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  choiceText: {
    fontSize: 20,
    color: '#fff',
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#61dafb',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
});

export default App;
