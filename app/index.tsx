// App.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Choice = 'Rock' | 'Paper' | 'Scissors' | '';

const App: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>('');
  const [computerChoice, setComputerChoice] = useState<Choice>('');
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const resultOpacity = useRef(new Animated.Value(0)).current;

  const choices: Choice[] = ['Rock', 'Paper', 'Scissors'];

  const determineWinner = (player: Choice, computer: Choice): string => {
    if (player === computer) return "It's a tie!";
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Scissors' && computer === 'Paper') ||
      (player === 'Paper' && computer === 'Rock')
    ) {
      setScore((prevScore) => ({ ...prevScore, player: prevScore.player + 1 }));
      return 'You win!';
    } else {
      setScore((prevScore) => ({ ...prevScore, computer: prevScore.computer + 1 }));
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

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    resultOpacity.setValue(0); // Reset the animation
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
    <ImageBackground source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/people-playing-paper-rock-scissors-royalty-free-illustration-1583269312.jpg' }} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Rock, Paper, Scissors</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Player: {score.player}</Text>
            <Text style={styles.scoreText}>Computer: {score.computer}</Text>
          </View>
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
          <View style={styles.resetContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
              <Text style={styles.resetButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glassmorphism effect
    borderRadius: 20,
    margin: 10,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
  },
  title: {
    fontSize: 32,
    color: '#61dafb',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreText: {
    fontSize: 18,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultText: {
    fontSize: 24,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  resetContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 18,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default App;
