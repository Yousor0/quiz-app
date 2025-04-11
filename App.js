// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Question from "./components/Question";
import Summary from "./components/Summary";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{
            data: [
              {
                prompt: "What is 2 + 2?",
                type: "multiple-choice",
                choices: ["3", "4", "5", "6"],
                correct: 1,
              },
              {
                prompt: "Select all prime numbers.",
                type: "multiple-answer",
                choices: ["2", "3", "4", "5"],
                correct: [0, 1, 3],
              },
              {
                prompt: "The earth is flat.",
                type: "true-false",
                choices: ["True", "False"],
                correct: 1,
              },
            ],
          }}
        />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Question, Summary };
