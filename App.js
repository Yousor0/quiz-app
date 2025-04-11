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
                prompt: "What is connected to a vegetable?",
                type: "multiple-choice",
                choices: ["banana", "brocolli", "grapes", "apple"],
                correct: 1,
              },
              {
                prompt: "Select all that is a fruit.",
                type: "multiple-answer",
                choices: ["banana", "grapes", "truck", "apple"],
                correct: [0, 1, 3],
              },
              {
                prompt: "A banana is a vegetable.",
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
