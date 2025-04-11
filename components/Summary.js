import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Summary({ route }) {
  const { data, userAnswers } = route.params;
  const total = userAnswers.filter((ans) => ans.userCorrect).length;

  const renderChoices = (choices, correct, selected) => {
    return choices.map((choice, index) => {
      const isCorrect = Array.isArray(correct)
        ? correct.includes(index)
        : correct === index;
      const isSelected = Array.isArray(selected)
        ? selected.includes(index)
        : selected === index;

      if (isSelected && isCorrect) {
        return (
          <Text key={index} style={styles.correct}>
            ✔ {choice}
          </Text>
        );
      } else if (isSelected && !isCorrect) {
        return (
          <Text key={index} style={styles.incorrect}>
            ✘ <Text style={styles.strike}>{choice}</Text>
          </Text>
        );
      } else if (!isSelected && isCorrect) {
        return (
          <Text key={index} style={styles.correct}>
            ✔ {choice}
          </Text>
        );
      } else {
        return <Text key={index}>○ {choice}</Text>;
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text testID="total" style={styles.total}>
        Score: {total}/{data.length}
      </Text>
      {data.map((q, i) => (
        <View key={i} style={styles.questionBlock}>
          <Text style={styles.questionText}>{q.prompt}</Text>
          {renderChoices(
            q.choices,
            userAnswers[i].correct,
            userAnswers[i].selected
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignSelf: "center",
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  questionBlock: { marginBottom: 24 },
  questionText: { fontSize: 16, marginBottom: 8 },
  correct: { color: "green", fontWeight: "bold" },
  incorrect: { color: "red" },
  strike: { textDecorationLine: "line-through" },
});
