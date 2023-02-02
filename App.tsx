/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type NestedViewProps = PropsWithChildren<{
  depth?: number;
  maxDepth: number;
  onPress: () => void;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function NestedView({
  depth = 0,
  maxDepth,
  onPress,
}: NestedViewProps): JSX.Element {
  if (depth >= maxDepth) {
    return (
      <Button
        onPress={onPress}
        title="Increment touches"
        accessibilityLabel="increment touches button"
      />
    );
  }

  const bgColor = depth % 2 === 0 ? 'blue' : 'red';
  return (
    <View style={{backgroundColor: bgColor}}>
      <NestedView depth={depth + 1} maxDepth={maxDepth} onPress={onPress} />
      <Text>L{depth}</Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [touches, setTouches] = useState(0);
  return (
    <SafeAreaView style={backgroundStyle}>
      <Section title="App info">
        Appium issue MetaMask/mobile-planning#452 test app
      </Section>
      <Text style={{color: 'red'}}>Touches {touches}</Text>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <NestedView
            maxDepth={10}
            onPress={() => {
              setTouches(touches + 1);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
