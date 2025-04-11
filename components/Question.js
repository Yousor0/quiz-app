import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ButtonGroup, Button } from "react-native-elements";

export default function Question({ navigation, route }) {
  const { data, index = 0, userAnswers = [] } = route.params;
  const question = data[index];
  const [selected, setSelected] = useState(
    question.type === "multiple-answer" ? [] : null
  );

  const toggleSelect = (i) => {
    if (question.type === "multiple-answer") {
      setSelected((prev) =>
        prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
      );
    } else {
      setSelected(i);
    }
  };

  const checkCorrect = () => {
    const correct = question.correct;
    if (question.type === "multiple-answer") {
      return (
        Array.isArray(selected) &&
        correct.length === selected.length &&
        correct.every((val) => selected.includes(val))
      );
    } else {
      return selected === correct;
    }
  };

  const handleNext = () => {
    const correct = checkCorrect();
    const updatedAnswers = [
      ...userAnswers,
      { selected, correct: question.correct, userCorrect: correct },
    ];

    if (index + 1 < data.length) {
      navigation.push("Question", {
        data,
        index: index + 1,
        userAnswers: updatedAnswers,
      });
    } else {
      navigation.replace("Summary", {
        data,
        userAnswers: updatedAnswers,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{question.prompt}</Text>

      {question.type === "multiple-answer" ? (
        <View style={styles.multiButtonGroup} testID="choices">
          {question.choices.map((choice, i) => (
            <Button
              key={i}
              title={choice}
              onPress={() => toggleSelect(i)}
              buttonStyle={{
                backgroundColor: selected.includes(i) ? "#2089dc" : "#fff",
                borderWidth: 1,
                borderColor: "#5e6977",
              }}
              titleStyle={{
                color: selected.includes(i) ? "#fff" : "#5e6977",
              }}
            />
          ))}
        </View>
      ) : (
        <ButtonGroup
          testID="choices"
          buttons={question.choices}
          onPress={toggleSelect}
          selectedIndexes={selected !== null ? [selected] : []}
          selectMultiple={false}
          vertical
          containerStyle={styles.buttonGroup}
        />
      )}

      <Button
        testID="next-question"
        title="Next"
        onPress={handleNext}
        disabled={
          question.type === "multiple-answer"
            ? selected.length === 0
            : selected === null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignSelf: "center",
    maxWidth: 300,
  },
  prompt: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonGroup: {
    marginBottom: 20,
    width: 300,
    alignSelf: "center",
  },
  multiButtonGroup: {
    marginBottom: 20,
    width: 300,
    alignSelf: "center",
  },
});
