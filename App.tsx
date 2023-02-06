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
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const nestingDepth = 36; // 36 is the limit

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
        title={'Increment touches'}
        accessibilityLabel={'Increment touches'}
        testID={`increment-touches`}
      />
    );
  }

  const bgColor = depth % 2 === 0 ? 'blue' : 'red';
  return (
    <View
      style={{backgroundColor: bgColor}}
      accessibilityLabel={`L${depth}`}
      testID={`L${depth}`}>
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
      <Section title={'App info'}>
        <Text
          style={{color: 'blue'}}
          onPress={() =>
            Linking.openURL(
              'https://github.com/MetaMask/mobile-planning/issues/452',
            )
          }>
          Appium issue MetaMask/mobile-planning#452 test app
        </Text>
      </Section>
      <Section title={`Nesting ${nestingDepth}`}>
        <Text
          accessibilityLabel={`touches-${touches}`}
          testID={`touches-${touches}`}>
          Touches {touches}
        </Text>
      </Section>
      <ScrollView
        contentInsetAdjustmentBehavior={'automatic'}
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <NestedView
            maxDepth={nestingDepth}
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
  }
});

export default App;
