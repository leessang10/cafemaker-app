import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EstimateStepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  currentStep: number;
  stepNumber: number;
}

export default function EstimateStep({ title, description, children, currentStep, stepNumber }: EstimateStepProps) {
  const isActive = currentStep === stepNumber;
  const isCompleted = currentStep > stepNumber;

  return (
    <View style={[styles.container, !isActive && styles.inactiveContainer, isCompleted && styles.completedContainer]}>
      <View style={styles.header}>
        <View style={[styles.stepIndicator, isActive && styles.activeStepIndicator, isCompleted && styles.completedStepIndicator]}>
          <Text style={[styles.stepNumber, (isActive || isCompleted) && styles.activeStepNumber]}>{stepNumber}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, isActive && styles.activeTitle]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      {isActive && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inactiveContainer: {
    opacity: 0.7,
  },
  completedContainer: {
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activeStepIndicator: {
    backgroundColor: '#1976d2',
  },
  completedStepIndicator: {
    backgroundColor: '#4caf50',
  },
  stepNumber: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  activeStepNumber: {
    color: '#fff',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activeTitle: {
    color: '#1976d2',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    marginTop: 20,
  },
});
