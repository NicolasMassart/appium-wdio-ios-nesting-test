/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React, {useState} from 'react';
import {Button, Linking, StyleSheet, Text, View} from 'react-native';

const nestingDepth = 41; // 41 is the limit

console.log('Nesting depth', nestingDepth);

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type NestedViewProps = PropsWithChildren<{
  depth?: number;
  maxDepth: number;
  onPress: () => void;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
      <Text style={[styles.sectionDescription]}>{children}</Text>
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
        testID={'increment-touches'}
      />
    );
  }

  return (
    <View accessible={false}>
      <NestedView depth={depth + 1} maxDepth={maxDepth} onPress={onPress} />
      <Text>L{depth}</Text>
    </View>
  );
}

function App(): JSX.Element {
  const [touches, setTouches] = useState(0);
  return (
    <>
      <Section title={'App info'}>
        <Text
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
      <NestedView
        maxDepth={nestingDepth}
        onPress={() => {
          setTouches(touches + 1);
        }}
      />
    </>
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
});

export default App;
